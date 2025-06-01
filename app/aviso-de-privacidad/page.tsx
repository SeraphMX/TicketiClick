export default function PrivacyPolicyPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Política de Privacidad</h1>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Información que Recopilamos</h2>
          <p className='text-gray-600 mb-4'>Recopilamos información que nos proporcionas directamente cuando:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Creas una cuenta</li>
            <li>Compras boletos</li>
            <li>Te comunicas con nosotros</li>
            <li>Te suscribes a nuestro boletín</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Uso de la Información</h2>
          <p className='text-gray-600 mb-4'>Utilizamos la información recopilada para:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Procesar tus compras</li>
            <li>Enviarte confirmaciones y actualizaciones</li>
            <li>Mejorar nuestros servicios</li>
            <li>Prevenir fraudes</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Compartir Información</h2>
          <p className='text-gray-600 mb-4'>Compartimos tu información con:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Organizadores de eventos (solo la información necesaria)</li>
            <li>Proveedores de servicios de pago</li>
            <li>Autoridades cuando sea requerido por ley</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Tus Derechos</h2>
          <p className='text-gray-600 mb-4'>Tienes derecho a:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Acceder a tu información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de tu información</li>
            <li>Oponerte al procesamiento de tu información</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Contacto</h2>
          <p className='text-gray-600'>
            Si tienes preguntas sobre nuestra política de privacidad, contáctanos en:
            <br />
            Email: privacy@ticketi.click
            <br />
            Teléfono: +34 912 345 678
          </p>
        </section>
      </div>
    </div>
  )
}
