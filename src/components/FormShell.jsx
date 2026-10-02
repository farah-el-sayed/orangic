import Card from './Card.jsx'
import Container from './Container.jsx'
import SectionTitle from './SectionTitle.jsx'

export default function FormShell({ children, description, eyebrow, title, wide = false }) {
  return (
    <Container className="py-12 sm:py-16" size={wide ? 'wide' : 'narrow'}>
      <SectionTitle as="h1" description={description} eyebrow={eyebrow} title={title} />
      <Card className="mt-8 p-5 sm:p-8">{children}</Card>
    </Container>
  )
}