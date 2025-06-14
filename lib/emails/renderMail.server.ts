// lib/emails/renderMail.server.ts
'use server'

import CreateAccountMail from '@/emails/CreateAccountMail'
import WelcomeMail from '@/emails/WelcomeMail'
import { EmailTemplate } from '@/types/email'
import { render } from '@react-email/render'
import React from 'react'
import { PurchaseConfirmation } from './templates/PurchaseConfirmation'

export const renderMail = async (template: EmailTemplate, props: any) => {
  switch (template) {
    case 'register':
      return render(React.createElement(CreateAccountMail, props))
    case 'welcome':
      return render(React.createElement(WelcomeMail, props))
    case 'purchaseConfirmation':
      return render(React.createElement(PurchaseConfirmation, props))
    default:
      throw new Error(`Template ${template} no existe`)
  }
}
