import { Event } from '@/types/events'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { CSSProperties } from 'react'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}` : 'https://dev-ticketi.netlify.app'

const PurchaseConfirmationMail = ({ downloadLink, event }: { downloadLink: string; event: Event }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Haz hecho una compra en ticketi</Preview>
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
            <Heading style={h1}>Haz hecho una compra en ticketi</Heading>
            <Text style={mainText}>
              Haz comprado {event.quantity} boletos para {event.title}, que se llevara a cabo el {event.date} a las {event.time} en{' '}
              {event.location}.
            </Text>
            <Text style={mainText}>Si aún no has descargado tus boletos, puedes descargarlos dando click en el siguiente enlace</Text>
            <Section style={verificationSection}>
              <Button style={button} href={downloadLink}>
                Descargar boletos
              </Button>
            </Section>
          </Section>
        </Section>
        <Text style={footerText}>
          Este enlace es válido hasta el dia del evento, despues del evento no funcionará. Este mensaje fue enviado por{' '}
          <Link href='https://ticketi.click'>Ticketi.click</Link>, conoce nuestro{' '}
          <Link href={`${baseUrl}/privacidad`}>aviso de privacidad</Link>.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PurchaseConfirmationMail

PurchaseConfirmationMail.PreviewProps = {
  downloadLink: 'https://boletos.ejemplo.com/descargar/abc123',
  event: {
    id: 'ec9d7e88-a2f9-44c0-b275-cf888ba5044f',
    title: 'Chapul Big Banda Test',
    slug: 'chapul-big-band',
    description:
      '<p>Prep&aacute;rate para una noche inolvidable con la <strong>Chapul Big Band</strong>, una orquesta que rinde homenaje a la &eacute;poca dorada del jazz, fusionando ese esp&iacute;ritu cl&aacute;sico con la energ&iacute;a vibrante de los ritmos actuales. <br/>D&eacute;jate llevar por una explosiva mezcla de <strong >jazz, swing, funk, bossa nova y salsa</strong>, en un espect&aacute;culo que te har&aacute; vibrar desde la primera nota.</p>',
    date: '2025-07-17',
    time: '20:00:00',
    location: 'El Foro 1869, Ciudad de México, CDMX',
    price: 400,
    currency: 'MXN',
    image: '/events/1745434434PQzWhASDd4.webp',
    category: 'musica',
    organizerId: '76150554-65c0-480d-b492-d94df5a231dd',
    availableTickets: 200,
    featured: true,
    stripe_id: 'acct_1RPSugGu19pvykad',
    quantity: 4
  }
}

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
