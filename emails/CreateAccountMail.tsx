import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { CSSProperties } from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'https://dev-ticketi.netlify.app'

const CreateAccountMail = ({ link }: { link: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Completa tu registro en ticketi</Preview>
      <Container style={container}>
        <Section style={coverSection}>
          <Section style={imageSection}>
            <Img src={`https://dev-ticketi.netlify.app/branding/logo-ticketi-full.png`} width='191' height='62' alt='Logo ticketi' />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>Crea tu cuenta en Ticketi</Heading>
            <Text style={mainText}>
              Para completar el proceso de creación de cuenta, haz clic en el siguiente enlace para completar tu registro:
            </Text>
            <Section style={verificationSection}>
              <Button style={button} href={link} target='_blank'>
                Crear cuenta
              </Button>
            </Section>
          </Section>
          <Hr />
          <Section style={lowerSection}>
            <Text style={cautionText}>
              Al crear una cuenta en Ticketi, podrás gestionar tus eventos, comprar entradas y recibir notificaciones importantes.
            </Text>
          </Section>
        </Section>
        <Text style={footerText}>
          Este enlace es válido por 24 horas. Si no completas el registro dentro de este tiempo, deberás solicitar un nuevo enlace. Si no
          has solicitado la creación de una cuenta, puedes ignorar este correo electrónico. Este mensaje fue enviado por{' '}
          <Link href='https://ticketi.click' target='_blank'>
            Ticketi.click
          </Link>
          , conoce nuestro{' '}
          <Link href='https://ticketi.click/privacidad' target='_blank'>
            aviso de privacidad
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
)

export default CreateAccountMail

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

const lowerSection = { padding: '25px 35px' }

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

const cautionText = { ...text, margin: '0px' }
