export default function PrivacyPolicyPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-700'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Aviso de privacidad</h1>
      <p className=' mb-6'>
        En <strong>Ticketi</strong>, operado por <strong>Ambitious Growth Leaders Alliance S.A. de C.V.</strong>, nos comprometemos a
        proteger tu privacidad y a manejar tus datos personales con responsabilidad y conforme a la ley aplicable.
      </p>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Responsable del tratamiento</h2>
          <p>
            Ambitious Growth Leaders Alliance S.A. de C.V., con domicilio en Dr. Mariano Azuela 80, Colonia Santa María la Rivera, Alcaldía
            Cuauhtémoc, Ciudad de México, C.P. 06400, en su carácter de responsable de los datos personales recabados a través de la
            plataforma Ticketi.Click, reconoce la importancia de proteger tu privacidad y tus datos personales. Esta política tiene por
            objeto informarte sobre el tratamiento que se dará a tus datos personales en cumplimiento de lo establecido por la LFPDPPP.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Datos personales que recopilamos</h2>
          <p className=' mb-4'>Recopilamos los siguientes datos al registrarte o usar nuestros servicios:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Teléfono</li>
            <li>Datos de pago (procesados de forma segura por Stripe)</li>
            <li>Historial de compras y eventos asistidos </li>
            <li>Información de navegación (cookies, IP, dispositivo)</li>
          </ul>
          <p className='mb-4'>Adicionalmente, para organizadores de eventos:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Nombre comercial o razón social</li>
            <li>Tipo de entidad (persona física o moral)</li>
            <li>Dirección fiscal</li>
            <li>Datos de la cuenta para realizar transferencias</li>
            <li>Enlaces a redes sociales (si aplica)</li>
          </ul>
          <p className=' mb-4'>La información se obtiene a través de:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Formularios de registro en la plataforma</li>
            <li>Procesos de compra</li>
            <li>Micrositios de organizadores alojados en Ticketi.Click</li>
            <li>Cookies y tecnologías de seguimiento</li>
            <li>Comunicación directa por correo o formulario</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Finalidad del tratamiento de datos</h2>
          <p className=' mb-4'>Utilizamos la información recopilada para:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Crear y gestionar tu cuenta en Ticketi </li>
            <li>Procesar la compra de boletos </li>
            <li>Ofrecer soporte técnico y servicio al cliente </li>
            <li>Monitorear el uso de la plataforma y mejorar su funcionamiento </li>
            <li>Personalizar la experiencia del usuario </li>
            <li>Cumplir con obligaciones legales y fiscales</li>
            <li>Enviar notificaciones importantes sobre eventos, cancelaciones o reembolsos </li>
            <li>Implementar estrategias de marketing y remarketing con herramientas como Google Analytics y Meta Pixel</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Compartir Información</h2>
          <p className=' mb-4'>Compartimos tu información con:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Organizadores de eventos (solo la información necesaria)</li>
            <li>Proveedores de servicios de pago</li>
            <li>Autoridades cuando sea requerido por ley</li>
          </ul>
          <p>En Ticketi tus datos nunca son vendidos o compartidos a terceros sin tu permiso explícito</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Micrositios y dominios personalizados</h2>
          <p className=' mb-4'>
            Los organizadores pueden solicitar un micrositio personalizado bajo el dominio <code>organizador.ticketi.click</code> o vincular
            su propio dominio a nuestra infraestructura. Todos los datos recabados en estos entornos están sujetos a esta misma política de
            privacidad.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Uso de cookies y tecnologías de seguimiento</h2>
          <p className=' mb-4'>Ticketi.Click utiliza cookies y píxeles de seguimiento para:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Analizar patrones de uso y navegación</li>
            <li>Analizar el tráfico y uso de la plataforma</li>
            <li>Ofrecer contenido personalizado</li>
            <li>
              Medir el rendimiento de campañas publicitarias Puedes desactivar las cookies desde la configuración de tu navegador, aunque
              algunas funciones podrían verse limitadas.
            </li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Herramientas de procesamiento de pago</h2>
          <p className=' mb-4'>
            Utilizamos <strong>Stripe</strong> como procesador de pagos seguros. Ticketi.Click no almacena información bancaria o de
            tarjetas de crédito directamente. Estos datos son manejados exclusivamente por dichos proveedores conforme a sus políticas y
            estándares de seguridad.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Boletos electrónicos y físicos</h2>
          <p className=' mb-4'>
            Por defecto, todos los boletos adquiridos a través de Ticketi.Click se entregan electrónicamente al correo del comprador. Sin
            embargo, los organizadores pueden ofrecer de manera adicional boletos físicos en taquilla, cuya emisión y entrega son su
            responsabilidad.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            9. Tus derechos como usuario (<strong>ARCO</strong>)
          </h2>
          <p className=' mb-4'>Tienes derecho a:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              <strong>Acceder</strong> a tus datos personales
            </li>
            <li>
              <strong>Rectificarlos</strong> si son incorrectos o desactualizados
            </li>
            <li>
              <strong>Cancelarlos</strong> cuando consideres que no son necesarios para los fines mencionados
            </li>
            <li>
              <strong>Oponerte</strong> al tratamiento de tus datos para fines específicos
            </li>
          </ul>
          <p className=' mb-4'>
            Para ejercer cualquiera de estos derechos, envía una solicitud a nuestro correo:{' '}
            <a href='mailto:privacidad@ticketi.click' className='text-blue-600 hover:underline'>
              privacidad@ticketi.click
            </a>
            . Deberás proporcionar tu nombre completo, una copia de tu identificación oficial y la descripción clara del derecho que deseas
            ejercer
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>10. Cambios en esta política</h2>
          <p className=' mb-4'>
            Ticketi.Click podrá realizar modificaciones a esta política de privacidad en cualquier momento. Los cambios sustanciales serán
            comunicados en el sitio web o por correo electrónico a los usuarios registrados. La fecha de actualización aparecerá siempre al
            final del documento.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>11. Contacto</h2>
          <p className='mb-4'>Para cualquier duda relacionada con esta política, puedes escribirnos a:</p>
          <p>
            Email:{' '}
            <a href='mailto:privacidad@ticketi.click' className='text-blue-600 hover:underline'>
              privacidad@ticketi.click
            </a>
          </p>
        </section>

        <p>
          <strong>Última actualización:</strong> 7 de junio de 2025
        </p>
      </div>
    </div>
  )
}
