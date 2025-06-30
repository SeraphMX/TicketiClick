// lib/emails/renderMail.server.ts
'use server'

import CreateAccountMail from '@/emails/CreateAccountMail'
import PasswordChangedConfirmationMail from '@/emails/PasswordChangedConfirmationMail'
import PasswordResetMail from '@/emails/PasswordResetMail'
import PurchaseConfirmationMail from '@/emails/PurchaseConfirmationMail'
import WelcomeMail from '@/emails/WelcomeMail'
import { EmailTemplate } from '@/types/email'
import { render } from '@react-email/render'
import React from 'react'

export const renderMail = async (template: EmailTemplate, props: any) => {
  switch (template) {
    case 'register':
      return render(React.createElement(CreateAccountMail, props))
    case 'welcome':
      return render(React.createElement(WelcomeMail, props))
    case 'purchaseConfirmation':
      return render(React.createElement(PurchaseConfirmationMail, props))
    case 'passwordReset':
      return render(React.createElement(PasswordResetMail, props))
    case 'passwordChangedConfirmation':
      return render(React.createElement(PasswordChangedConfirmationMail, props))
    default:
      throw new Error(`Template ${template} no existe`)
  }
}
