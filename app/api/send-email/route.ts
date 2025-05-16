// app/api/send/route.ts
import { RenderMail } from '@/lib/emails/RenderMail'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { to, template, templateProps } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'mail.ticketi.click',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  try {
    const html = RenderMail(template, templateProps)

    await transporter.sendMail({
      from: '"Ticketi" <no-reply@ticketi.click>',
      to,
      subject: getSubjectByTemplate(template), // Ej: "Bienvenido a Ticketi"
      html
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}

// Helper para subjects
function getSubjectByTemplate(template: keyof typeof subjects): string {
  const subjects = {
    welcome: 'Activa tu cuenta en Ticketi',
    ticket: 'Descarga tu ticket',
    notification: 'Tienes una notificación'
  }
  return subjects[template] || 'Mensaje de Ticketi'
}
