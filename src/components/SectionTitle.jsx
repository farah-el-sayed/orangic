export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className = '',
  light = false,
}) {
  return (
    <div
      className={`grid max-w-2xl gap-3 ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay-700">
          {eyebrow}
        </p>
      )}
      <Heading
        className={`text-3xl leading-tight sm:text-4xl ${light ? 'text-cream-50' : 'text-forest-950'}`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`max-w-xl text-base leading-7 ${light ? 'text-sage-200' : 'text-ink-700'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
