export default function TermsPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Términos y condiciones</h1>
      <p className='text mb-6 text-gray-700'>
        Bienvenido a <strong>Ticketi</strong>. Estos términos y condiciones rigen el uso de nuestra plataforma para la compra y venta de
        boletos para eventos. Al utilizar nuestro servicio, aceptas cumplir con estos términos. Por favor, léelos detenidamente antes de
        continuar.
      </p>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Aceptación de los términos</h2>
          <p className='text-gray-600 mb-4'>
            Al acceder y utilizar Ticketi, aceptas estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no
            estás de acuerdo con alguno de estos términos, no debes utilizar nuestro servicio.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Uso del servicio</h2>
          <p className='text-gray-600 mb-4'>Nuestro servicio está diseñado para:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Permitir la compra y venta de boletos para eventos</li>
            <li>Facilitar la gestión de eventos para organizadores</li>
            <li>Proporcionar información sobre eventos</li>
            <li>Alquiler de espacios</li>
            <li>Organización de eventos</li>
            <li>Transmisiones en línea de eventos en colaboracion con nuestros socios comerciales </li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Registro y uso de la plataforma</h2>
          <p className='text-gray-600 mb-4'>
            Para acceder a ciertas funciones, deberás crear una cuenta como asistente o como organizador. Ticketi asigna distintos roles con
            permisos específicos según el tipo de usuario.
          </p>

          <h3 className='font-semibold'>Requisitos</h3>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>
              Ser <strong>mayor de 18 años</strong> para comprar boletos.
            </li>
            <li>Proporcionar información verídica y actualizada.</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Compra de boletos</h2>
          <p className='text-gray-600 mb-4'>Al comprar boletos a través de nuestra plataforma:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Garantizas que la información proporcionada es precisa</li>
            <li>Aceptas pagar el precio total indicado</li>
            <li>Entiendes que las ventas son finales salvo especificación contraria</li>
            <li>Aceptas las políticas específicas del evento</li>
          </ul>
        </section>

        <section className='mb-8 text-gray-600'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Política de cancelacion y reembolsos</h2>
          <p className=' mb-4'>Los reembolsos están sujetos a:</p>
          <ul className='list-disc pl-6 mb-4'>
            <li>Las políticas específicas del evento</li>
            <li>El tiempo restante hasta el evento</li>
            <li>La aprobación del organizador</li>
          </ul>
          <p className=''>
            En caso de cancelación del evento, se procesará un reembolso completo. Para eventos reprogramados, los boletos seguirán siendo
            válidos para la nueva fecha.
          </p>
          <p className='my-4'>
            Los asistentes podrán <strong>solicitar reembolsos*</strong> en los siguientes casos:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Cancelación del evento</li>
            <li>Reprogramación no aceptada por el asistente</li>
            <li>Otros motivos justificados evaluados por el organizador</li>
          </ul>
          <p className='text-sm text-balance'>
            *Ticketi actúa como intermediario, pero las devoluciones son responsabilidad directa del organizador, salvo que se indique lo
            contrario.
          </p>
        </section>

        <section className='mb-8 text-gray-600'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Uso adecuado de la plataforma</h2>
          <p>Está estrictamente prohibido: </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Publicar o vender eventos falsos</li>
            <li>Generar o distribuir boletos duplicados</li>
            <li>Usar lenguaje ofensivo o inapropiado</li>
            <li>Cualquier conducta que atente contra el buen uso de la plataforma</li>
          </ul>
          <small>*Ticketi se reserva el derecho de suspender cuentas que incurran en estas prácticas sin previo aviso.</small>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Limitación de responsabilidad</h2>
          <p className='text-gray-600 mb-4'>
            Ticketi <strong>no se hace responsable</strong> de:
          </p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Cancelaciones o cambios en los eventos</li>
            <li>Disputas entre usuarios y organizadores</li>
            <li>Problemas técnicos fuera de su control </li>
            <li>Incidentes ocurridos durante los eventos </li>
            <li>Contenidos proporcionados por terceros (organizadores o asistentes)</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Jurisdicción legal</h2>
          <p className='text-gray-600'>
            Para cualquier controversia derivada del uso de Ticketi, las partes se someten a las leyes y tribunales del{' '}
            <strong>Estado de México</strong>, renunciando a cualquier otro fuero.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>9. Modificaciones</h2>
          <p className='text-gray-600'>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después
            de su publicación en el sitio web. El uso continuado de nuestros servicios después de dichos cambios constituye tu aceptación de
            los nuevos términos.
          </p>

          <p className='mt-6'>Última actualización: abril de 2025</p>
        </section>
      </div>
    </div>
  )
}
