export default function ErrorMessage({ children = 'Something went wrong.' }) {
  return (
    <p className="flex items-start gap-2.5 rounded-xl border border-danger-100 bg-danger-100/40 px-4 py-3 text-sm leading-6 text-danger-700" role="alert">
      <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-danger-700/10 text-xs font-bold">!</span>
      <span>{children}</span>
    </p>
  )
}