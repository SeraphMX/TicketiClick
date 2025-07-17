import { clsx, type ClassValue } from 'clsx'
import { decode } from 'he'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Función para formatear fechas a formato español y evitar desfase por zona horaria
export const formatDate = (dateString: string) => {
  // Tomamos solo la parte de fecha (ignora la hora si existe)

  if (!dateString) return 'Próximamente'

  const [year, month, day] = dateString.slice(0, 10).split('-').map(Number)

  // Creamos la fecha manualmente para evitar desfase por zona horaria
  const date = new Date(year, month - 1, day)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return date.toLocaleDateString('es-MX', options)
}

// Función para formatear hora a formato local de 12 horas o 24 según la configuración del usuario
export const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

//Funcion para cpmvertitr html a textp plano

export const convertHtmlToText = (html: string) => {
  const withoutTags = html
    .replace(/<br\s*\/?>/gi, ' ') // o '\n' si quieres saltos de línea
    .replace(/<[^>]+>/g, '')
  const decoded = decode(withoutTags)
  return decoded.replace(/\s+/g, ' ').trim()
}
