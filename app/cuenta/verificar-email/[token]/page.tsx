import VerifyEmailClient from '@/components/register/VerifyEmailClient'
import { verifyEmailVerifyToken } from '@/lib/tokens'

type Props = Promise<{ token: string }>
export default async function VerifyEmail(props: { params: Props }) {
  const { token } = await props.params
  const payload = verifyEmailVerifyToken(token)
  return (
    <div className='min-h-screen flex items-center p-6'>
      <VerifyEmailClient email={payload?.email || null} />
    </div>
  )
}
