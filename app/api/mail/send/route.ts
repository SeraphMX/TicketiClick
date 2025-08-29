// app/api/send-email/route.ts

import { renderMail } from '@/lib/emails/renderMail.server'
import { EmailTemplate } from '@/types/email'
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
    let mailSubject = subject || 'Notificación de Ticketi'

    switch (template as EmailTemplate) {
      case 'register':
        mailSubject = 'Crea tu cuenta en Ticketi'
        break
      case 'welcome':
        mailSubject = '¡Bienvenido a Ticketi!'
        break
      case 'purchaseConfirmation':
        mailSubject = 'Confirmación de compra en Ticketi'
        break
      case 'passwordReset':
        mailSubject = 'Restablecimiento de contraseña'
        break
      case 'passwordChangedConfirmation':
        mailSubject = 'Confirmación de cambio de contraseña'
        break
    }

    await transporter.sendMail({
      from: '"Ticketi" <notificaciones@ticketi.click>',
      to,
      subject: mailSubject,
      html
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
