import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes.js'
import Button from './Button.jsx'
import Card from './Card.jsx'
import Container from './Container.jsx'

export default function EmptyState({
    actionLabel,
    actionTo = ROUTES.products,
    description,
    title,
}) {
    return (
        <Container className="py-12 sm:py-20">
            <Card className="mx-auto grid max-w-xl place-items-center gap-4 bg-sage-50/70 px-6 py-12 text-center sm:px-10 sm:py-16">
                <div className="grid size-16 place-items-center rounded-full border border-line bg-cream-50 text-2xl text-forest-700 shadow-soft">
                    <span aria-hidden="true">✦</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay-700">
                    Nothing here yet
                </p>
                <h1 className="font-display text-2xl leading-tight text-forest-950 sm:text-3xl">{title}</h1>
                <p className="max-w-md text-sm leading-7 text-ink-700 sm:text-base">{description}</p>
                {actionLabel && (
                    <Button as={Link} className="mt-2" to={actionTo}>
                        {actionLabel}
                    </Button>
                )}
            </Card>
        </Container>
    )
}