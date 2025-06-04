export default function PrivacyPolicyPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Aviso de privacidad</h1>
      <p className='text-gray-700 mb-6'>
        En <strong>Ticketi</strong>, operado por <strong>Ambitious Growth Leaders Alliance S.A. de C.V.</strong>, nos comprometemos a
        proteger tu privacidad y a manejar tus datos personales con responsabilidad y conforme a la ley aplicable.
      </p>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Responsable del tratamiento</h2>
          <div className='text-gray-600 mb-4'>
            <p>Razón social: Ambitious Growth Leaders Alliance S.A. de C.V. </p>
            <p>Domicilio: Ocampo 29b 20, San Mateo, Metepec, Estado de México, C.P. 52140 </p>
            <p>Correo electrónico de contacto: hola@ticketi.click</p>
          </div>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Datos personales que recopilamos</h2>
          <p className='text-gray-600 mb-4'>Recopilamos los siguientes datos al registrarte o usar nuestros servicios:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Teléfono</li>
            <li>Datos de pago (procesados de forma segura por Stripe)</li>
            <li>Historial de compras y eventos asistidos </li>
            <li>Información de navegación (cookies, IP, dispositivo)</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Finalidad del tratamiento</h2>
          <p className='text-gray-600 mb-4'>Utilizamos la información recopilada para:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Crear y gestionar tu cuenta en Ticketi </li>
            <li>Procesar la compra de boletos </li>
            <li>Comunicarte información relevante sobre eventos </li>
            <li>Ofrecer soporte técnico y servicio al cliente </li>
            <li>Enviar promociones, noticias y recomendaciones (si así lo autorizas) </li>
            <li>Cumplir con obligaciones legales y fiscales</li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Bases legales del tratamiento</h2>
          <p className='text-gray-600 mb-4'>El tratamiento de tus datos se basa en:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Tu consentimiento al registrarte y usar nuestros servicios</li>
            <li>La necesidad de cumplir con un contrato (compra de boletos)</li>
            <li>El cumplimiento de obligaciones legales</li>
            <li>Intereses legítimos de Ticketi para mejorar nuestros servicios</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Compartir Información</h2>
          <p className='text-gray-600 mb-4'>Compartimos tu información con:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Organizadores de eventos (solo la información necesaria)</li>
            <li>Proveedores de servicios de pago</li>
            <li>Autoridades cuando sea requerido por ley</li>
          </ul>
          <p>En Ticketi tus datos nunca son vendidos o compartidos a terceros sin tu permiso explícito</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Transferencias internacionales</h2>
          <p className='text-gray-600 mb-4'>
            Al usar plataformas como Stripe, PayPal y servicios de transmisión como Expresa.com, tus datos pueden ser transferidos a
            servidores fuera de México, siempre bajo cláusulas contractuales que garanticen su protección.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Tus Derechos como usuario</h2>
          <p className='text-gray-600 mb-4'>Tienes derecho a:</p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Acceder a tu información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de tu información</li>
            <li>Oponerte al procesamiento de tu información</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
          <p className='text-gray-600 mb-4'>
            Para ejercer estos derechos, envía un correo a
            <a href='mailto:hola@ticketi.click' className='text-blue-600 hover:underline'>
              hola@ticketi.click
            </a>
            con tu solicitud y una copia de tu identificación oficial.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Seguridad de los datos</h2>
          <p className='text-gray-600 mb-4'>
            Implementamos medidas de seguridad físicas, administrativas y técnicas para proteger tus datos, incluyendo:
          </p>
          <ul className='list-disc pl-6 text-gray-600 mb-4'>
            <li>Accesos restringidos</li>
            <li>Encriptación</li>
            <li>Copias de seguridad</li>
            <li>Autenticación de usuarios</li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>9. Uso de cookies</h2>
          <p className='text-gray-600 mb-4'>
            Utilizamos cookies para mejorar tu experiencia. Puedes configurar tu navegador para rechazar algunas o todas las cookies, aunque
            eso podría afectar el funcionamiento del sitio.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>10. Cambios en esta política</h2>
          <p className='text-gray-600 mb-4'>
            Nos reservamos el derecho de actualizar esta Política de Privacidad. Notificaremos los cambios relevantes a través del sitio web
            o por correo electrónico.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>11. Jurisdicción</h2>
          <p className='text-gray-600 mb-4'>Cualquier disputa será resuelta bajo las leyes del Estado de México, México.</p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>12. Contacto</h2>
          <p className='text-gray-600'>
            Si tienes preguntas sobre nuestra política de privacidad, contáctanos en:
            <br />
            Email: privacy@ticketi.click
            <br />
            Teléfono: +34 912 345 678
          </p>
        </section>

        <p>
          <strong>Última actualización:</strong> abril de 2025
        </p>
      </div>
    </div>
  )
}
