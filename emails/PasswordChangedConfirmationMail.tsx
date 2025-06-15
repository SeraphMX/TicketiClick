import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { CSSProperties } from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'https://dev-ticketi.netlify.app'

const PasswordChangedConfirmationMail = ({ link }: { link: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Acabas de cambiar tu contraseña</Preview>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img
              src={`https://dev-ticketi.netlify.app/branding/logo-ticketi-full.png`}
              width='191'
              height='62'
              alt='Logo ticketi'
              style={{
                display: 'inline-block',
                margin: '0 auto'
              }}
            />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>Contraseña cambiada</Heading>
            <Text style={mainText}>
              Haz cambiado tu contraseña exitosamente. Si no has realizado este cambio, tu cuenta podría estar en riesgo. Puedes volver a
              solicitar un enlace para cambiar tu contraseña si es necesario.
            </Text>
            <Section style={verificationSection}>
              <Button style={button} href={link}>
                Cambiar contraseña
              </Button>
            </Section>
          </Section>
        </Section>
        <Text style={footerText}>
          El enlace para volver a cambiar tu contraseña es válido por 24 horas. Si no cambias tu contraseña, conservaras la anterior. Si
          quieres cambiar la contraseña deberás solicitar un nuevo <Link href={`${baseUrl}/cuenta/reset-password`}>enlace aqui</Link>. Este
          mensaje fue enviado por <Link href='https://ticketi.click'>Ticketi.click</Link>, conoce nuestro{' '}
          <Link href={`${baseUrl}/privacidad`}>aviso de privacidad</Link>.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PasswordChangedConfirmationMail

const main = {
  backgroundColor: '#fff',
  color: '#212121'
}

const button: CSSProperties = {
  padding: '12px 24px',
  backgroundColor: '#1d47be',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  color: '#fff',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: '600',
  textAlign: 'center',
  display: 'inline-block'
}

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee'
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px'
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0'
}

const imageSection: CSSProperties = {
  backgroundColor: '#1d47be',
  padding: '20px 0',
  textAlign: 'center'
}

const coverSection = { backgroundColor: '#fff' }

const upperSection = { padding: '25px 35px' }

const footerText = {
  ...text,
  fontSize: '11px',
  padding: '0 20px',
  lineHeight: '14px'
}

const verificationSection: CSSProperties = {
  textAlign: 'center'
}

const mainText = { ...text, marginBottom: '14px' }
