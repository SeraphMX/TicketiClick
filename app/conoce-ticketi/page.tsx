export default function AboutPage() {
  return (
    //hero section
    <>
      <section className='relative bg-black text-white h-[60vh] sm:h-[60vh]  flex items-end'>
        <div className='absolute inset-0 sm:bg-cover bg-bottom bg-[url("/about-us/bg-hero.webp")]'></div>
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 to-transparent'></div>
        <div className='relative container mx-auto p-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-bold mb-4 text-balance'>Conoce más sobre nuestra plataforma</h1>
          <p className='text-lg my-4 text-balance font-semibold'>
            En <strong>Ticketi</strong> creemos que asistir a un evento debería ser tan fácil como hacer un click.
          </p>
        </div>
      </section>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='prose prose-blue max-w-none'>
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Nuestra Historia</h2>
            <p className='text-gray-600 mb-6'>
              Ticketi nació de la pasión por conectar a las personas con experiencias inolvidables. Desde nuestro inicio, nos hemos dedicado
              a hacer que la compra de boletos sea más fácil, segura y accesible para todos.
            </p>
            <p className='text-gray-600'>
              Con años de experiencia en la industria del entretenimiento, hemos desarrollado una plataforma que satisface las necesidades
              tanto de los organizadores de eventos como de los asistentes.
            </p>

            <p className='text-gray-600 mt-4'>
              Somos una plataforma dedicada a conectar organizadores con sus públicos, ofreciendo una solución completa para la venta de
              boletos, gestión de eventos, alquiler de espacios y transmisiones en línea.
            </p>
            <p className='text-gray-600 mt-4'>
              Operamos bajo el respaldo de <strong>Ambitious Growth Leaders Alliance S.A. de C.V.</strong>, una empresa enfocada en la
              innovación, la experiencia del usuario y la tecnología accesible.
            </p>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Nuestra Misión</h2>
            <p className='text-gray-600'>
              En Ticketi, nuestra misión es democratizar el acceso a eventos y experiencias memorables. Trabajamos para crear una plataforma
              donde:
            </p>
            <ul className='list-disc pl-6 text-gray-600 mt-4 space-y-2'>
              <li>Los organizadores pueden gestionar sus eventos de manera eficiente</li>
              <li>Los usuarios pueden descubrir y comprar boletos de forma segura</li>
              <li>La tecnología se une con la simplicidad para crear experiencias excepcionales</li>
            </ul>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>¿Por qué Elegirnos?</h2>
            <div className='grid md:grid-cols-2 gap-6 mt-6'>
              <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>Seguridad Garantizada</h3>
                <p className='text-gray-600'>Utilizamos la última tecnología en seguridad para proteger tus datos y transacciones.</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>Facilidad de Uso</h3>
                <p className='text-gray-600'>Interfaz intuitiva diseñada para hacer la compra de boletos rápida y sencilla.</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>Soporte 24/7</h3>
                <p className='text-gray-600'>Equipo de atención al cliente disponible para ayudarte en cualquier momento.</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>Precios Transparentes</h3>
                <p className='text-gray-600'>Sin cargos ocultos, todos los costos se muestran claramente antes de la compra.</p>
              </div>
            </div>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>¿Cómo funciona?</h2>
            <p className='text-gray-600 mb-6'>
              Ticketi simplifica el proceso de compra de boletos y gestión de eventos. Aquí te explicamos cómo funciona:
            </p>

            <h3 className='font-semibold'>Para usuarios</h3>
            <ol className='list-decimal pl-6 text-gray-600 mt-4 space-y-2'>
              <li>Explora eventos disponibles en nuestra plataforma</li>
              <li>Selecciona el evento y elige tus boletos</li>
              <li>Realiza el pago de forma segura con tarjeta de crédito o débito</li>
              <li>Recibe tus boletos por correo electrónico o en la app</li>
              <li>Asiste al evento y disfruta de una experiencia inolvidable</li>
            </ol>
            <h3 className='mt-6 font-semibold'>Para organizadores</h3>
            <ol className='list-decimal pl-6 text-gray-600 mt-4 space-y-2'>
              <li>Registra tu evento en nuestra plataforma</li>
              <li>Configura los detalles del evento y los precios de los boletos</li>
              <li>Gestiona las ventas y el acceso a través de nuestro panel de control</li>
              <li>Recibe informes detallados sobre las ventas y la asistencia</li>
              <li>Ofrece una experiencia fluida a tus asistentes con nuestra tecnología</li>
            </ol>
          </section>

          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Socios estratégicos</h2>
            <p className='text-gray-600 mb-6'>
              Colaboramos con Expresa.com para ofrecer transmisiones online de alta calidad, expandiendo el alcance de cada evento más allá
              de lo presencial.
            </p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contacto</h2>
            <p className='text-gray-600'>¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte:</p>
            <ul className='mt-4 space-y-2 text-gray-600'>
              <li>
                Email: <a href='mailto:hola@ticketi.click'>hola@ticketi.click</a>
              </li>
              <li>
                Teléfono: <a href='#'>+34 912 345 678</a>
              </li>
              <li>Dirección: Donceles 22, CDMX</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
