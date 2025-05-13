import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Función para formatear fechas a formato español
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

//Funcion para formatear hora a formato español de 12 horas
export const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12 // Convertir a formato de 12 horas
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
}
