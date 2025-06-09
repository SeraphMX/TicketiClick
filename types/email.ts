export type EmailTemplate = 'register' | 'welcome' | 'purchaseConfirmation'

export type EmailProps = {
  to: string
  subject: string
  template: EmailTemplate
  props: any
}
