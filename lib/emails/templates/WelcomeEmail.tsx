// lib/emails/templates/WelcomeEmail.tsx
import { Body, Head, Html, Link, Preview, Text } from '@react-email/components'

interface WelcomeEmailProps {
  username: string
  verificationLink: string
}

export const WelcomeEmail = ({ username, verificationLink }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido a nuestra plataforma</Preview>
      <Body style={main}>
        <Text style={paragraph}>Hola {username},</Text>
        <Text style={paragraph}>¡Gracias por registrarte!</Text>
        <Text style={paragraph}>Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:</Text>
        <Link href={verificationLink} style={link}>
          Verificar cuenta
        </Link>
      </Body>
    </Html>
  )
}

// Estilos (opcional, pero recomendado para emails)
const main = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px'
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5'
}

const link = {
  color: '#0070f3',
  textDecoration: 'underline'
}
