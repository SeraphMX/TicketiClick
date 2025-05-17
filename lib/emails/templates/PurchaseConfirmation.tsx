'use server'
interface Props {
  downloadLink: string
}

export const PurchaseConfirmation = async ({ downloadLink }: Props) => {
  return (
    <html>
      <body>
        <h1>Has realizado una compra en Ticketi</h1>
        <p>Si aún no has descargado tus boletos, puedes hacerlo dando click en el siguiente enlace:</p>
        <a href={downloadLink}>Descargar ticket</a>
      </body>
    </html>
  )
}
