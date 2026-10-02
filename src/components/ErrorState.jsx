import Button from './Button.jsx'
import Card from './Card.jsx'
import Container from './Container.jsx'
import RetryButton from './RetryButton.jsx'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'

export default function ErrorState({
    description = 'Please try again. If the problem continues, come back in a moment.',
    onRetry,
    title = 'Something went wrong.',
}) {
    return (
        <Container className="py-12 sm:py-20">
            <Card className="mx-auto grid max-w-xl place-items-center gap-4 border-danger-100 bg-danger-100/30 px-6 py-12 text-center sm:px-10 sm:py-16" role="alert">
                <div className="grid size-14 place-items-center rounded-full border border-danger-100 bg-cream-50 text-xl text-danger-700 shadow-soft">
                    <span aria-hidden="true">!</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger-700">
                    Something went wrong
                </p>
                <h1 className="font-display text-2xl leading-tight text-forest-950 sm:text-3xl">{title}</h1>
                <p className="max-w-md text-sm leading-7 text-ink-700 sm:text-base">{description}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    {onRetry && <RetryButton onRetry={onRetry} />}
                    <Button as={Link} to={ROUTES.home} variant="quiet">
                        Go home
                    </Button>
                </div>
            </Card>
        </Container>
    )
}