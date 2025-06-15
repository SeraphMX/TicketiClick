export type EmailTemplate = 'register' | 'welcome' | 'purchaseConfirmation' | 'passwordReset' | 'passwordChangedConfirmation'
export type EmailActions = 'create-account' | 'verify-account' | 'password-reset' | 'password-changed' | 'purchase-confirmation'

export type EmailProps = {
  to: string
  subject: string
  template: EmailTemplate
  props: any
}
