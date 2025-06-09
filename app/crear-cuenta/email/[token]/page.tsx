import ConfirmAccountMailClient from '@/components/register/ConfirmAccountMailClient'
import { verifyAccountToken } from '@/lib/tokens'

type Props = Promise<{ token: string }>
export default async function CreateAccountMail(props: { params: Props }) {
  const { token } = await props.params

  try {
    const payload = verifyAccountToken(token)

    if (!payload || !payload.email) {
      return (
        <div>
          <h1>Token inválido o expirado</h1>
          <p>Por favor solicita un nuevo enlace de verificación.</p>
        </div>
      )
    }

    const { email, phone } = payload

    return (
      <div className='min-h-screen flex items-center  p-6 '>
        <ConfirmAccountMailClient email={email} phone={phone} />
      </div>
    )
  } catch (err) {
    console.error('Token inválido o expirado', err)
  }
}
