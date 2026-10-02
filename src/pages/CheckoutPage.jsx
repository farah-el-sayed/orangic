import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import EmptyState from '../components/EmptyState.jsx'
import FormShell from '../components/FormShell.jsx'
import FormStatus from '../components/FormStatus.jsx'
import Input from '../components/Input.jsx'
import SafeImage from '../components/SafeImage.jsx'
import { ROUTES } from '../constants/routes.js'
import { useCart } from '../hooks/useCart.js'
import { useToast } from '../hooks/useToast.js'
import { mockService } from '../services/mockService.js'
import {
  validateCardNumber,
  validateCvc,
  validateEmail,
  validateExpiry,
  validatePhone,
  validatePostalCode,
  validateRequired,
} from '../utils/validation.js'

const CHECKOUT_STEPS = [
  { id: 'customer', label: 'Customer information' },
  { id: 'shipping', label: 'Shipping information' },
  { id: 'payment', label: 'Payment method' },
  { id: 'review', label: 'Order review' },
]

const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`
}

function maskCard(value) {
  const digits = value.replace(/\D/g, '')
  return digits.length > 0 ? `•••• ${digits.slice(-4)}` : 'Card'
}

function paymentLabel(values) {
  return values.paymentMethod === 'card'
    ? `${maskCard(values.cardNumber)} · ${values.cardExpiry}`
    : 'Cash on delivery'
}

function validateStep(step, values) {
  if (step === 0) {
    return {
      name: validateRequired(values.name, 'Full name'),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
    }
  }
  if (step === 1) {
    return {
      address: validateRequired(values.address, 'Address'),
      city: validateRequired(values.city, 'City'),
      postalCode: validatePostalCode(values.postalCode),
    }
  }
  if (step === 2 && values.paymentMethod === 'card') {
    return {
      cardName: validateRequired(values.cardName, 'Name on card'),
      cardNumber: validateCardNumber(values.cardNumber),
      cardExpiry: validateExpiry(values.cardExpiry),
      cardCvc: validateCvc(values.cardCvc),
    }
  }
  return {}
}

function SummaryCard({ cart, discount, grandTotal, shipping, subtotal }) {
  return (
    <Card className="h-fit bg-sage-50 p-5">
      <h2 className="font-display text-2xl text-forest-950">Order summary</h2>
      <ul className="mt-4 grid gap-3">
        {cart.map((item) => (
          <li className="flex items-center gap-3" key={item.id}>
            <span className="size-11 shrink-0 overflow-hidden rounded-md bg-cream-50">
              <SafeImage
                alt={item.name}
                className="size-full object-cover"
                loading="lazy"
                src={item.images[0]}
              />
            </span>
            <span className="min-w-0 flex-1 text-sm">
              <span className="block truncate font-semibold text-forest-900">
                {item.name}
              </span>
              <span className="text-xs text-ink-500">Qty {item.quantity}</span>
            </span>
            <span className="text-sm font-semibold text-forest-900">
              {formatMoney(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-3 text-ink-700">
          <dt>Subtotal</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3 text-ink-700">
          <dt>Shipping</dt>
          <dd>{shipping ? formatMoney(shipping) : 'Free'}</dd>
        </div>
        <div className="flex justify-between gap-3 text-clay-700">
          <dt>Discount</dt>
          <dd>-{formatMoney(discount)}</dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-line pt-3 text-base font-semibold text-forest-950">
          <dt>Grand total</dt>
          <dd>{formatMoney(grandTotal)}</dd>
        </div>
      </dl>
    </Card>
  )
}
function StepIndicator({ current, onGoTo }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {CHECKOUT_STEPS.map((step, index) => {
        const isPast = index < current
        const isCurrent = index === current
        return (
          <li key={step.id}>
            <button
              className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                isPast
                  ? 'border-forest-100 text-forest-700 hover:bg-forest-50'
                  : isCurrent
                    ? 'border-forest-800 bg-forest-50 text-forest-900'
                    : 'border-line text-ink-500'
              }`}
              disabled={!isPast}
              onClick={() => onGoTo(index)}
              type="button"
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${
                  isPast
                    ? 'bg-forest-700 text-cream-50'
                    : isCurrent
                      ? 'bg-forest-800 text-cream-50'
                      : 'bg-cream-200 text-ink-700'
                }`}
              >
                {isPast ? '✓' : index + 1}
              </span>
              <span className="hidden min-[26rem]:inline">{step.label}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

function ReviewBlock({ children, onEdit, title }) {
  return (
    <section className="rounded-md border border-line bg-cream-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-ink-900">
          {title}
        </h3>
        <button
          className="text-sm font-semibold text-forest-700 hover:text-clay-700"
          onClick={onEdit}
          type="button"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 grid gap-1 text-sm text-ink-700">{children}</div>
    </section>
  )
}

export default function CheckoutPage() {
  const { cart, clearCart, discount, grandTotal, shipping, subtotal } = useCart()
  const { showToast } = useToast()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ error: '', loading: false })
  const [placedOrder, setPlacedOrder] = useState(null)
  const [orderSnapshot, setOrderSnapshot] = useState(null)

  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus({ error: '', loading: false })
  }

  const goNext = () => {
    const nextErrors = validateStep(step, values)
    setErrors(nextErrors)
    setStatus({ error: '', loading: false })
    if (Object.values(nextErrors).some(Boolean)) return
    setStep((current) => Math.min(CHECKOUT_STEPS.length - 1, current + 1))
  }

  const goBack = () => {
    setErrors({})
    setStatus({ error: '', loading: false })
    setStep((current) => Math.max(0, current - 1))
  }

  const jumpTo = (index) => {
    setErrors({})
    setStatus({ error: '', loading: false })
    setStep(index)
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return
    const snapshot = { items: cart, subtotal, shipping, discount, grandTotal }
    setStatus({ error: '', loading: true })
    try {
      const result = await mockService.checkout({
        items: cart,
        total: grandTotal,
        ...values,
      })
      clearCart()
      setPlacedOrder(result)
      setOrderSnapshot(snapshot)
      setStatus({ error: '', loading: false })
      showToast('Your order has been placed')
    } catch {
      setStatus({
        error: 'We could not place your order. Please try again.',
        loading: false,
      })
    }
  }
if (placedOrder && orderSnapshot) {
    return (
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto grid size-14 place-items-center rounded-full bg-sage-100 text-2xl text-forest-800"
            >
              ✓
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-clay-700">
              Order confirmed
            </p>
            <h1 className="mt-2 font-display text-4xl text-forest-950">
              Thank you{values.name ? `, ${values.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="mt-4 text-ink-700">
              Your order has been placed. A confirmation email is on its way to{' '}
              <strong className="text-forest-900">{values.email}</strong>.
            </p>
            <p className="mt-2 text-sm text-ink-700">
              Order number:{' '}
              <strong className="text-forest-900">{placedOrder.orderId}</strong>
            </p>
          </div>

          <Card className="mt-8 p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-forest-950">
                Order details
              </h2>
              <p className="text-sm text-ink-500">
                {orderSnapshot.items.length} item
                {orderSnapshot.items.length === 1 ? '' : 's'}
              </p>
            </div>
            <ul className="mt-5 grid gap-3 border-b border-line pb-5">
              {orderSnapshot.items.map((item) => (
                <li className="flex items-center gap-3" key={item.id}>
                  <span className="size-12 shrink-0 overflow-hidden rounded-md bg-sage-50">
                    <SafeImage
                      alt={item.name}
                      className="size-full object-cover"
                      loading="lazy"
                      src={item.images[0]}
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block truncate font-semibold text-forest-900">
                      {item.name}
                    </span>
                    <span className="text-xs text-ink-500">
                      Qty {item.quantity}
                    </span>
                  </span>
                  <span className="font-semibold text-forest-900">
                    {formatMoney(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between gap-3 text-ink-700">
                <dt>Subtotal</dt>
                <dd>{formatMoney(orderSnapshot.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-3 text-ink-700">
                <dt>Shipping</dt>
                <dd>
                  {orderSnapshot.shipping
                    ? formatMoney(orderSnapshot.shipping)
                    : 'Free'}
                </dd>
              </div>
              <div className="flex justify-between gap-3 text-clay-700">
                <dt>Discount</dt>
                <dd>-{formatMoney(orderSnapshot.discount)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-line pt-3 text-base font-semibold text-forest-950">
                <dt>Grand total</dt>
                <dd>{formatMoney(orderSnapshot.grandTotal)}</dd>
              </div>
            </dl>
          </Card>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
                Shipping to
              </p>
              <p className="mt-2 text-sm font-medium text-ink-900">
                {values.name}
              </p>
              <p className="text-sm text-ink-700">
                {values.address}, {values.city} {values.postalCode}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
                Contact
              </p>
              <p className="mt-2 text-sm text-ink-900">{values.email}</p>
              <p className="text-sm text-ink-700">{values.phone}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500">
                Payment
              </p>
              <p className="mt-2 text-sm font-medium text-ink-900">
                {paymentLabel(values)}
              </p>
              <p className="text-sm text-ink-500">
                Mock payment — no real charge.
              </p>
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <Button as={Link} size="lg" to={ROUTES.products}>
              Continue shopping
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  if (cart.length === 0) {
    return (
      <EmptyState
        actionLabel="Return to cart"
        actionTo={ROUTES.cart}
        description="Add something to your cart before starting checkout."
        title="Your checkout is empty"
      />
    )
  }

  return (
    <FormShell
      description="A mock, risk-free checkout. No real payment is processed."
      eyebrow="Secure checkout"
      title="A thoughtful finish"
      wide
    >
      <StepIndicator current={step} onGoTo={jumpTo} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-lg border border-line bg-cream-50 p-4 sm:p-6">
{step === 0 && (
            <form
              className="grid gap-5"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                goNext()
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  autoComplete="name"
                  error={errors.name}
                  label="Full name"
                  onChange={(event) => updateField('name', event.target.value)}
                  required
                  value={values.name}
                />
                <Input
                  autoComplete="email"
                  error={errors.email}
                  label="Email"
                  onChange={(event) => updateField('email', event.target.value)}
                  required
                  type="email"
                  value={values.email}
                />
              </div>
              <Input
                autoComplete="tel"
                error={errors.phone}
                label="Phone"
                onChange={(event) => updateField('phone', event.target.value)}
                required
                type="tel"
                value={values.phone}
              />
              <div className="flex justify-end">
                <Button type="submit">Continue →</Button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form
              className="grid gap-5"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                goNext()
              }}
            >
              <Input
                autoComplete="street-address"
                error={errors.address}
                label="Address"
                onChange={(event) => updateField('address', event.target.value)}
                required
                value={values.address}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  autoComplete="address-level2"
                  error={errors.city}
                  label="City"
                  onChange={(event) => updateField('city', event.target.value)}
                  required
                  value={values.city}
                />
                <Input
                  autoComplete="postal-code"
                  error={errors.postalCode}
                  label="Postal code"
                  onChange={(event) =>
                    updateField('postalCode', event.target.value)
                  }
                  required
                  value={values.postalCode}
                />
              </div>
              <div className="flex justify-between gap-3">
                <Button onClick={goBack} variant="secondary">
                  Back
                </Button>
                <Button type="submit">Continue →</Button>
              </div>
            </form>
          )}
{step === 2 && (
            <form
              className="grid gap-5"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                goNext()
              }}
            >
              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium text-ink-900">
                  Payment method
                </legend>
                <p className="text-xs text-ink-500">
                  This is a mock checkout — no real payment is processed.
                </p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {[
                    { id: 'card', label: 'Card' },
                    { id: 'cash', label: 'Cash on delivery' },
                  ].map((method) => (
                    <label key={method.id}>
                      <input
                        checked={values.paymentMethod === method.id}
                        className="peer sr-only"
                        name="paymentMethod"
                        onChange={() => updateField('paymentMethod', method.id)}
                        type="radio"
                        value={method.id}
                      />
                      <span className="grid w-full place-items-center rounded-md border border-line bg-cream-50 px-4 py-3 text-sm font-medium text-ink-900 transition hover:border-forest-100 peer-checked:border-forest-800 peer-checked:bg-forest-50 peer-focus-visible:ring-4 peer-focus-visible:ring-sage-200">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {values.paymentMethod === 'card' && (
                <div className="grid gap-5">
                  <Input
                    autoComplete="cc-name"
                    error={errors.cardName}
                    label="Name on card"
                    onChange={(event) =>
                      updateField('cardName', event.target.value)
                    }
                    placeholder="Name as printed on card"
                    required
                    value={values.cardName}
                  />
                  <Input
                    autoComplete="cc-number"
                    error={errors.cardNumber}
                    inputMode="numeric"
                    label="Card number"
                    onChange={(event) =>
                      updateField('cardNumber', event.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    required
                    value={values.cardNumber}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      autoComplete="cc-exp"
                      error={errors.cardExpiry}
                      label="Expiry (MM/YY)"
                      onChange={(event) =>
                        updateField('cardExpiry', event.target.value)
                      }
                      placeholder="MM/YY"
                      required
                      value={values.cardExpiry}
                    />
                    <Input
                      autoComplete="cc-csc"
                      error={errors.cardCvc}
                      inputMode="numeric"
                      label="CVC"
                      onChange={(event) =>
                        updateField('cardCvc', event.target.value)
                      }
                      placeholder="123"
                      required
                      value={values.cardCvc}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between gap-3">
                <Button onClick={goBack} variant="secondary">
                  Back
                </Button>
                <Button type="submit">Continue →</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="grid gap-5">
              <div className="grid gap-4 lg:grid-cols-3">
                <ReviewBlock onEdit={() => jumpTo(0)} title="Customer">
                  <p>{values.name}</p>
                  <p>{values.email}</p>
                  <p>{values.phone}</p>
                </ReviewBlock>
                <ReviewBlock onEdit={() => jumpTo(1)} title="Shipping to">
                  <p>{values.address}</p>
                  <p>
                    {values.city}, {values.postalCode}
                  </p>
                </ReviewBlock>
                <ReviewBlock onEdit={() => jumpTo(2)} title="Payment">
                  <p>{paymentLabel(values)}</p>
                  {values.paymentMethod === 'card' && <p>{values.cardName}</p>}
                </ReviewBlock>
              </div>
              <FormStatus error={status.error} />
              <div className="flex justify-between gap-3">
                <Button onClick={goBack} variant="secondary">
                  Back
                </Button>
                <Button loading={status.loading} onClick={handlePlaceOrder}>
                  Place mock order
                </Button>
              </div>
            </div>
          )}
        </div>
        <SummaryCard
          cart={cart}
          discount={discount}
          grandTotal={grandTotal}
          shipping={shipping}
          subtotal={subtotal}
        />
      </div>
    </FormShell>
  )
}