export default function TermsPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Términos y Condiciones</h1>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Aceptación de los Términos</h2>
          <p className='text-gray-600 mb-4'>
            Al acceder y utilizar Ticketi, aceptas estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no
            estás de acuerdo con alguno de estos términos, no debes utilizar nuestro servicio.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Uso del Servicio</h2>
          <p className='text-gray-600 mb-4'>Nuestro servicio está diseñado para:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Permitir la compra y venta de boletos para eventos</li>
            <li>Facilitar la gestión de eventos para organizadores</li>
            <li>Proporcionar información sobre eventos</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Compra de Boletos</h2>
          <p className='text-gray-600 mb-4'>Al comprar boletos a través de nuestra plataforma:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Garantizas que la información proporcionada es precisa</li>
            <li>Aceptas pagar el precio total indicado</li>
            <li>Entiendes que las ventas son finales salvo especificación contraria</li>
            <li>Aceptas las políticas específicas del evento</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Política de Reembolsos</h2>
          <p className='text-gray-600 mb-4'>Los reembolsos están sujetos a:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Las políticas específicas del evento</li>
            <li>El tiempo restante hasta el evento</li>
            <li>La aprobación del organizador</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Responsabilidades</h2>
          <p className='text-gray-600 mb-4'>Ticketi no se hace responsable de:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Cancelaciones o cambios en los eventos</li>
            <li>Contenido proporcionado por organizadores</li>
            <li>Disputas entre usuarios y organizadores</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Modificaciones</h2>
          <p className='text-gray-600'>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después
            de su publicación en el sitio web. El uso continuado de nuestros servicios después de dichos cambios constituye tu aceptación de
            los nuevos términos.
          </p>
        </section>
      </div>
    </div>
  )
}
