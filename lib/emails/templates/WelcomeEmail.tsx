// lib/emails/templates/WelcomeEmail.tsx

interface WelcomeEmailProps {
  userName: string
  activationLink: string
}

export const WelcomeEmail = ({ userName, activationLink }: WelcomeEmailProps) => {
  return (
    <html>
      <body>
        <h1>¡Bienvenido, {userName}!</h1>
        <p>Gracias por registrarte en Ticketi. Para activar tu cuenta:</p>
        <a href={activationLink}>Establece tu contraseña aquí</a>
      </body>
    </html>
  )
}
