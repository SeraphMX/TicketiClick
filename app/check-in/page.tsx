'use client'
import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
export default function Page() {
  const [qrData, setQrData] = useState<string | null>(null)
  return (
    <div>
      <Scanner
        onScan={(result: IDetectedBarcode[]) => {
          console.log(result)
          if (result) {
            setQrData(result[0].rawValue)
          }
        }}
        sound={true}
        components={{
          torch: true,
          finder: true,
          tracker: outline
        }}
      />
      <p>Scan a QR code</p>
      {qrData && (
        <div>
          <p>QR Code Data:</p>
          <pre>{qrData}</pre>
        </div>
      )}
    </div>
  )
}
