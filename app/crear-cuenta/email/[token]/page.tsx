import ConfirmAccountMailClient from '@/components/register/ConfirmAccountMailClient'
import { verifyAccountToken } from '@/lib/tokens'

type Props = Promise<{ token: string }>
export default async function CreateAccountMail(props: { params: Props }) {
  const { token } = await props.params

  const payload = verifyAccountToken(token)

  console.log(payload)

  return (
    <div className='min-h-screen flex items-center p-6'>
      {!payload || !payload.email ? (
        <div>
          <h1>Token inválido o expirado</h1>
          <p>Si quieres crear una cuenta en ticketi </p>
        </div>
      ) : (
        <ConfirmAccountMailClient email={payload.email} phone={payload.phone} />
      )}
    </div>
  )
}
