// lib/emails/renderEmail.tsx
import ReactDOMServer from 'react-dom/server'
import { WelcomeEmail } from './templates/WelcomeEmail'

type EmailTemplate = 'welcome' | 'ticket' | 'notification'

export const RenderMail = (template: EmailTemplate, props: any) => {
  switch (template) {
    case 'welcome':
      return ReactDOMServer.renderToStaticMarkup(<WelcomeEmail {...props} />)
    // Agrega más casos según tus plantillas
    default:
      throw new Error(`Template ${template} no existe`)
  }
}
