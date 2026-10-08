export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!open) return null

  return (
    <div className="modal modal-open">
      <div className={`modal-box glass-strong rounded-2xl ${maxWidth} animate-scale-in`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-white">{title}</h3>
            <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">✕</button>
          </div>
        )}
        {children}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}
