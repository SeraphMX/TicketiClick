'use client'
import { ticketService } from '@/services/ticketService'
import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
export default function Page() {
  const [qrData, setQrData] = useState<string | null>(null)
  const [ticketData, setTicketData] = useState<any>(null)

  const handleScan = async (result: IDetectedBarcode[]) => {
    console.log(result)
    if (result && result.length > 0) {
      setQrData(result[0].rawValue)

      const ticket = await ticketService.getTicketbyCode(result[0].rawValue)

      if (ticket) {
        console.log('Ticket data:', ticket)
        setTicketData(ticket)
        // Aquí puedes manejar los datos del ticket escaneado, por ejemplo, mostrarlo en la UI
      } else {
        console.error('No se encontró el ticket con el código escaneado.')
      }
    }
  }

  return (
    <div>
      <Scanner
        onScan={handleScan}
        sound={true}
        components={{
          torch: true,
          finder: true,
          tracker: outline
        }}
      />

      {qrData && (
        <div>
          <p>QR Code Data:</p>
          <pre>{qrData}</pre>
        </div>
      )}

      <section>Datos del ticket escaneado:</section>
      {ticketData ? (
        <div>
          <pre>{JSON.stringify(ticketData, null, 2)}</pre>
        </div>
      ) : (
        <p>No se ha escaneado ningún ticket aún.</p>
      )}
    </div>
  )
}
