import { motion, useReducedMotion } from 'motion/react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  ...props
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      {...props}
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
