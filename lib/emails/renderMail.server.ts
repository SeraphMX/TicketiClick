// lib/emails/renderMail.server.ts
'use server'

import { render } from '@react-email/render'
import React from 'react'
import { PurchaseConfirmation } from './templates/PurchaseConfirmation'
import { WelcomeEmail } from './templates/WelcomeEmail'

type EmailTemplate = 'welcome' | 'purchaseConfirmation'

export const renderMail = async (template: EmailTemplate, props: any) => {
  switch (template) {
    case 'welcome':
      return render(React.createElement(WelcomeEmail, props))
    case 'purchaseConfirmation':
      return render(React.createElement(PurchaseConfirmation, props))
    default:
      throw new Error(`Template ${template} no existe`)
  }
}
