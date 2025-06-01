export default function AboutPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Conoce Ticketi</h1>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Nuestra Historia</h2>
          <p className='text-gray-600 mb-6'>
            Ticketi nació de la pasión por conectar a las personas con experiencias inolvidables. Desde nuestro inicio, nos hemos dedicado a
            hacer que la compra de boletos sea más fácil, segura y accesible para todos.
          </p>
          <p className='text-gray-600'>
            Con años de experiencia en la industria del entretenimiento, hemos desarrollado una plataforma que satisface las necesidades
            tanto de los organizadores de eventos como de los asistentes.
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
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Nuestro Equipo</h2>
          <p className='text-gray-600 mb-6'>
            Somos un equipo diverso de profesionales apasionados por la tecnología y los eventos. Cada miembro aporta su experiencia única
            para crear la mejor plataforma de venta de boletos.
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Contacto</h2>
          <p className='text-gray-600'>¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte:</p>
          <ul className='mt-4 space-y-2 text-gray-600'>
            <li>Email: hola@ticketi.click</li>
            <li>Teléfono: +34 912 345 678</li>
            <li>Dirección: Donceles 22, CDMX</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
