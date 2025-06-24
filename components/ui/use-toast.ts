import { create } from 'zustand'

type Toast = {
  id: string
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
}

type ToastStore = {
  toasts: Toast[]
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))

export function useToast() {
  const addToast = useToastStore((state) => state.addToast)

  function toast({ title, description }: { title: string; description?: string }) {
    const id = crypto.randomUUID()
    addToast({ id, title, description })
  }

  return { toast }
}
