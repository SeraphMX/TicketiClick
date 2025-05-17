// lib/emails/templates/CreateAccount.tsx

'use server'
interface CreateAccountProps {
  registerLink: string
}

export const CreateAccount = ({ registerLink }: CreateAccountProps) => {
  return (
    <html>
      <body>
        <h1>¡Bienvenido a ticketi!</h1>
        <p>Para crear una cuenta en nuestro sitio haz click en el siguiente enlace</p>
        <a href={registerLink}>Establece tu contraseña aquí</a>
      </body>
    </html>
  )
}
