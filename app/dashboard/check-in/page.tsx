'use client'
import { Scanner } from '@yudiel/react-qr-scanner'
export default function Page() {
  return (
    <div>
      <Scanner onScan={(result) => console.log(result)} />
    </div>
  )
}
