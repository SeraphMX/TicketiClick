// app/api/send-email/route.ts

import { renderMail } from '@/lib/emails/renderMail.server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { to, subject, template, templateProps } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'mail.ticketi.click',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  try {
    const html = await renderMail(template, templateProps)

    await transporter.sendMail({
      from: '"Ticketi" <notificaciones@ticketi.click>',
      to,
      subject: subject, // Ej: "Bienvenido a Ticketi"
      html
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
