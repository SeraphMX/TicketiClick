import PasswordResetMailClient from '@/components/auth/PasswordResetMailClient'
import { verifyEmailVerifyToken } from '@/lib/tokens'

type Props = Promise<{ token: string }>
export default async function VerifyEmail(props: { params: Props }) {
  const { token } = await props.params
  const payload = verifyEmailVerifyToken(token)
  return (
    <div className='min-h-screen flex items-center justify-center p-5'>
      <PasswordResetMailClient email={payload?.email || null} />
    </div>
  )
}
