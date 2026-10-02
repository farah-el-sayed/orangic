import { useState } from 'react'
import Button from '../components/Button.jsx'
import FormShell from '../components/FormShell.jsx'
import FormStatus from '../components/FormStatus.jsx'
import Input from '../components/Input.jsx'
import Textarea from '../components/Textarea.jsx'
import { mockService } from '../services/mockService.js'
import { validateEmail, validatePhone, validateRequired } from '../utils/validation.js'

const initialValues = { email: '', message: '', name: '', phone: '' }

export default function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ error: '', loading: false, success: '' })

  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus({ error: '', loading: false, success: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = {
      name: validateRequired(values.name, 'Name'),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      message: validateRequired(values.message, 'Message'),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus({ error: '', loading: true, success: '' })
    try {
      await mockService.contact(values)
      setStatus({ error: '', loading: false, success: 'Your message has been sent.' })
      setValues(initialValues)
    } catch {
      setStatus({ error: 'We could not send your message. Please try again.', loading: false, success: '' })
    }
  }

  return (
    <FormShell
      description="Questions, ideas, or just want to say hello? We would love to hear from you."
      eyebrow="Get in touch"
      title="Contact Orangic"
    >
      <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input error={errors.name} label="Name" onChange={(event) => updateField('name', event.target.value)} required value={values.name} />
          <Input autoComplete="email" error={errors.email} label="Email" onChange={(event) => updateField('email', event.target.value)} required type="email" value={values.email} />
        </div>
        <Input autoComplete="tel" error={errors.phone} label="Phone" onChange={(event) => updateField('phone', event.target.value)} required type="tel" value={values.phone} />
        <Textarea error={errors.message} label="Message" onChange={(event) => updateField('message', event.target.value)} required value={values.message} />
        <FormStatus error={status.error} success={status.success} />
        <Button disabled={status.loading || Boolean(status.success)} loading={status.loading} type="submit">
          {status.success ? 'Message sent' : 'Send message'}
        </Button>
      </form>
    </FormShell>
  )
}