'use client'

import { useToastStore } from './use-toast'

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div key={toast.id} className="bg-black text-white p-4 rounded shadow">
          <div className="font-bold">{toast.title}</div>
          {toast.description && <div>{toast.description}</div>}
        </div>
      ))}
    </div>
  )
}
