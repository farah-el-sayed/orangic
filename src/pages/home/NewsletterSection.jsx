import { useState } from 'react'
import Button from '../../components/Button.jsx'
import Container from '../../components/Container.jsx'
import FormStatus from '../../components/FormStatus.jsx'
import Input from '../../components/Input.jsx'
import Reveal from '../../components/Reveal.jsx'
import { mockService } from '../../services/mockService.js'
import { validateEmail } from '../../utils/validation.js'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ error: '', loading: false, success: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const emailError = validateEmail(email)
    if (emailError) {
      setStatus({ error: emailError, loading: false, success: '' })
      return
    }

    setStatus({ error: '', loading: true, success: '' })
    try {
      await mockService.newsletter(email)
      setStatus({ error: '', loading: false, success: 'You are on the list.' })
    } catch {
      setStatus({ error: 'We could not subscribe you. Please try again.', loading: false, success: '' })
    }
  }

  return (
    <section className="border-y border-line bg-sage-50 py-16 sm:py-20">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <p className="ds-caption font-bold uppercase tracking-[0.18em] text-clay-700">
              The good note
            </p>
            <h2 className="ds-heading mt-3 text-forest-950">
              A little goodness, now and then.
            </h2>
            <p className="ds-body mx-auto mt-4 max-w-lg">
              Join our quiet corner of the internet for new arrivals, thoughtful
              stories, and occasional treats.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3 text-left sm:flex-row sm:items-start"
              noValidate
              onSubmit={handleSubmit}
            >
              <Input
                className="min-w-0 flex-1"
                disabled={status.loading || Boolean(status.success)}
                error={status.error}
                label="Email address"
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status.error) setStatus({ error: '', loading: false, success: '' })
                }}
                placeholder="Your email address"
                required
                type="email"
              />
              <Button
                className="min-h-12 min-w-36 shrink-0 self-stretch rounded-full bg-clay-700 px-6 font-semibold text-cream-50 shadow-soft hover:bg-clay-700 hover:shadow-lifted sm:self-end"
                disabled={status.loading || Boolean(status.success)}
                loading={status.loading}
                type="submit"
              >
                {status.success ? 'You’re on the list' : 'Subscribe'}
              </Button>
            </form>
            <FormStatus error={status.error} success={status.success} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
