import { motion, useReducedMotion } from 'motion/react'
import Container from '../components/Container.jsx'
import Reveal from '../components/Reveal.jsx'

const storeLinks = [
    {
        eyebrow: 'Available on',
        name: 'Google Play',
        description: 'For Android phones and tablets',
        href: 'https://play.google.com/store/apps',
        mark: '▶',
    },
    {
        eyebrow: 'Download on the',
        name: 'App Store',
        description: 'For iPhone and iPad',
        href: 'https://www.apple.com/app-store/',
        mark: '●',
    },
]

function PhonePreview() {
    return (
        <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-8 rounded-[3rem] border border-sage-200/70" />
            <div className="relative mx-auto aspect-[0.52] w-[min(17rem,72vw)] rotate-3 rounded-[2.3rem] border-[0.65rem] border-forest-950 bg-cream-50 p-2 shadow-lifted sm:w-72">
                <div className="flex h-full flex-col overflow-hidden rounded-[1.65rem] bg-sage-50">
                    <div className="flex items-center justify-between px-4 pb-3 pt-5 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-forest-800">
                        <span>Orangic</span>
                        <span className="size-2 rounded-full bg-clay-700" />
                    </div>
                    <div className="mx-3 overflow-hidden rounded-xl bg-forest-800 p-4 text-cream-50">
                        <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-sage-200">Today&apos;s ritual</p>
                        <p className="mt-2 font-display text-xl leading-tight">A little more intention.</p>
                    </div>
                    <div className="grid flex-1 content-start gap-2 p-3">
                        <div className="h-24 rounded-xl bg-clay-100" />
                        <div className="grid grid-cols-2 gap-2">
                            <div className="h-28 rounded-xl bg-sage-200/70" />
                            <div className="h-28 rounded-xl bg-cream-200" />
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-line px-2 pb-2 pt-4 text-[0.55rem] font-bold uppercase tracking-[0.12em] text-forest-700">
                            <span>Browse</span>
                            <span>Saved</span>
                            <span>Bag</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-4 -left-2 rounded-md bg-cream-50 px-4 py-3 shadow-soft sm:-left-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-clay-700">In your pocket</p>
                <p className="mt-1 font-display text-lg text-forest-950">Goodness, closer.</p>
            </div>
        </div>
    )
}

export default function DownloadAppPage() {
    const reducedMotion = useReducedMotion()

    return (
        <>
            <section className="overflow-hidden border-b border-line bg-sage-50">
                <Container className="grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-24 lg:py-28">
                    <motion.div
                        className="max-w-xl"
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <p className="ds-caption font-bold uppercase tracking-[0.2em] text-clay-700">Orangic, wherever you are</p>
                        <h1 className="ds-display mt-5 text-forest-950">Good things, now in your pocket.</h1>
                        <p className="ds-body mt-6 max-w-lg text-lg">Keep your considered shopping list, saved finds, and everyday rituals close at hand with the Orangic app.</p>
                        <div className="mt-9 grid max-w-md gap-3 sm:grid-cols-2">
                            {storeLinks.map((store) => (
                                <a
                                    className="group flex min-h-16 items-center gap-3 rounded-md bg-forest-950 px-4 py-3 text-cream-50 transition hover:-translate-y-1 hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-200"
                                    href={store.href}
                                    key={store.name}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border border-cream-50/30 text-sm">{store.mark}</span>
                                    <span>
                                        <span className="block text-[0.65rem] leading-tight text-sage-200">{store.eyebrow}</span>
                                        <span className="mt-0.5 block font-display text-xl leading-none">{store.name}</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-ink-500">Free to download. Your everyday essentials, thoughtfully gathered.</p>
                    </motion.div>
                    <Reveal delay={0.12}>
                        <PhonePreview />
                    </Reveal>
                </Container>
            </section>
            <section className="bg-cream-50 py-14 sm:py-20">
                <Container>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            ['01', 'Save what speaks to you', 'Keep a personal shortlist of pieces that fit your daily rhythm.'],
                            ['02', 'Shop at your own pace', 'Pick up where you left off, whether you are home or out and about.'],
                            ['03', 'Stay close to the good stuff', 'Follow fresh edits and thoughtful finds as they arrive.'],
                        ].map(([number, title, description]) => (
                            <article className="border-t border-line pt-5" key={number}>
                                <span className="text-sm font-semibold text-clay-700">{number}</span>
                                <h2 className="mt-8 font-display text-2xl text-forest-950">{title}</h2>
                                <p className="mt-3 text-sm leading-6 text-ink-700">{description}</p>
                            </article>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    )
}