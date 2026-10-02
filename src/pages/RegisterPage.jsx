import { useState } from 'react'
import Button from '../components/Button.jsx'
import FormShell from '../components/FormShell.jsx'
import FormStatus from '../components/FormStatus.jsx'
import Input from '../components/Input.jsx'
import { mockService } from '../services/mockService.js'
import { validateConfirmPassword, validateEmail, validatePassword } from '../utils/validation.js'

const initialValues = { email: '', password: '', confirmPassword: '' }

export default function RegisterPage() {
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
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmPassword(values.password, values.confirmPassword),
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus({ error: '', loading: true, success: '' })
    try {
      await mockService.register(values)
      setStatus({ error: '', loading: false, success: 'Your account is ready.' })
      setValues(initialValues)
    } catch {
      setStatus({ error: 'We could not create your account. Please try again.', loading: false, success: '' })
    }
  }

  return (
    <FormShell
      description="Create an account for a smoother, more considered checkout."
      eyebrow="Join Orangic"
      title="Create your account"
    >
      <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
        <Input autoComplete="email" error={errors.email} label="Email" onChange={(event) => updateField('email', event.target.value)} required type="email" value={values.email} />
        <Input autoComplete="new-password" error={errors.password} hint="Use at least 8 characters." label="Password" onChange={(event) => updateField('password', event.target.value)} required type="password" value={values.password} />
        <Input autoComplete="new-password" error={errors.confirmPassword} label="Confirm password" onChange={(event) => updateField('confirmPassword', event.target.value)} required type="password" value={values.confirmPassword} />
        <FormStatus error={status.error} success={status.success} />
        <Button disabled={status.loading || Boolean(status.success)} loading={status.loading} type="submit">
          {status.success ? 'Account created' : 'Create account'}
        </Button>
      </form>
    </FormShell>
  )
}