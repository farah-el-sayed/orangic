import { useState } from 'react'
import Button from '../components/Button.jsx'
import FormShell from '../components/FormShell.jsx'
import FormStatus from '../components/FormStatus.jsx'
import Input from '../components/Input.jsx'
import { mockService } from '../services/mockService.js'
import { validateEmail, validatePassword } from '../utils/validation.js'

const initialValues = { email: '', password: '' }

export default function LoginPage() {
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
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus({ error: '', loading: true, success: '' })
    try {
      await mockService.login(values)
      setStatus({ error: '', loading: false, success: 'You are signed in.' })
    } catch {
      setStatus({ error: 'We could not sign you in. Please try again.', loading: false, success: '' })
    }
  }

  return (
    <FormShell
      description="Sign in to keep your orders and saved goods close at hand."
      eyebrow="Welcome back"
      title="Sign in"
    >
      <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
        <Input
          autoComplete="email"
          error={errors.email}
          label="Email"
          onChange={(event) => updateField('email', event.target.value)}
          required
          type="email"
          value={values.email}
        />
        <Input
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          onChange={(event) => updateField('password', event.target.value)}
          required
          type="password"
          value={values.password}
        />
        <FormStatus error={status.error} success={status.success} />
        <Button disabled={status.loading || Boolean(status.success)} loading={status.loading} type="submit">
          {status.success ? 'Signed in' : 'Sign in'}
        </Button>
      </form>
    </FormShell>
  )
}