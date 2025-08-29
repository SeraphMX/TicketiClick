export default function TermsPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24   text-gray-700'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Términos y condiciones</h1>
      <p className='mb-6'>
        Bienvenido a <strong>Ticketi</strong>. Estos términos y condiciones rigen el uso de nuestra plataforma para la compra y venta de
        boletos para eventos. Al utilizar nuestro servicio, aceptas cumplir con estos términos. Por favor, léelos detenidamente antes de
        continuar.
      </p>
      <p className='mb-6 '>
        Los presentes Términos y Condiciones (en adelante “TyC”) regulan el uso y acceso a la plataforma digital{' '}
        <strong>Ticketi.Click</strong>, propiedad de
        <strong>Ambitious Growth Leaders Alliance S.A. de C.V.</strong>, con domicilio fiscal en Dr. Mariano Azuela 80, Santa María la
        Rivera, Cuauhtémoc, Ciudad de México, C.P. 06400.
      </p>
      <p className='mb-6 '>
        Estos TyC son aplicables a todas las personas que accedan, naveguen, se registren o utilicen los servicios ofrecidos a través de
        Ticketi.Click, ya sea como <strong>usuarios compradores</strong> o como <strong>organizadores de eventos</strong> (también
        denominados “Productores”).
      </p>

      <div className='prose prose-blue max-w-none'>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. Aceptación de los términos y consentimiento contractual</h2>
          <p className='mb-6 '>
            El uso de Ticketi.Click implica la aceptación expresa y sin reservas de estos Términos y Condiciones, así como de las políticas
            complementarias que se publiquen en el sitio (Aviso de Privacidad, Política de Reembolsos, Política de Cookies, entre otras).
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              Para los <strong>usuarios compradores</strong>, el consentimiento se considera otorgado mediante cualquier acto de navegación,
              registro o compra realizada dentro de la plataforma.
            </li>
            <li>
              Para los <strong>organizadores</strong>, el consentimiento se establece desde el momento en que completan su registro, crean
              un evento o reciben ingresos a través de la plataforma.
            </li>
          </ul>
          <p className='mb-6 '>
            En caso de no aceptar total o parcialmente los presentes términos, deberá abstenerse de usar los servicios de Ticketi.Click.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. Registro y documentación</h2>
          <h3 className='text-xl font-semibold'>Para usuarios compradores:</h3>
          <p className='mb-6 '>
            No se requiere documentación adicional para adquirir boletos, salvo en casos de verificación por sospecha de fraude, donde se
            podrá solicitar identificación oficial y comprobante de titularidad de pago.
          </p>
          <h3 className='text-xl font-semibold'>Para organizadores de eventos:</h3>
          <ul className='list-disc pl-6  mb-4'>
            <li>Identificación oficial vigente del representante</li>
            <li>Constancia de situación fiscal (RFC)</li>
            <li>Comprobante de domicilio</li>
            <li>Cuenta bancaria CLABE para liquidaciones</li>
            <li>Teléfono y correo electrónico de atención al cliente</li>
            <li>Redes sociales o sitio web verificable del evento o marca</li>
          </ul>
          <p className='mb-6 '>Ticketi se reserva el derecho de solicitar documentación adicional si lo considera necesario.</p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. Definiciones</h2>
          <p className='mb-6 '>
            <strong>Plataforma</strong>: Conjunto de herramientas digitales ofrecidas por Ticketi.Click para publicar, vender y distribuir
            boletos para eventos.
          </p>
          <p className='mb-6 '>
            <strong>Organizador (Productor)</strong>: Persona física o moral que utiliza la plataforma para vender boletos de sus eventos.
            Responsable legal y fiscal del evento ante los compradores.
          </p>
          <p className='mb-6 '>
            <strong>Usuario comprador</strong>: Persona que adquiere boletos para eventos publicados en Ticketi.Click.
          </p>
          <p className='mb-6 '>
            <strong>Comisión</strong>: Cargo aplicado por el uso de la plataforma. Para el año 2025, la comisión estándar es del{' '}
            <strong>10% + $10 MXN</strong> por boleto vendido, más IVA. Dicha comisión puede ajustarse mediante convenio directo.
          </p>
          <p className='mb-6 '>
            <strong>Contracargo</strong>: Reversión de pago solicitada por el comprador ante su banco. Es responsabilidad total del
            organizador absorber cualquier contracargo.
          </p>
          <p className='mb-6 '>
            <strong>Micrositio</strong>: Sitio web personalizado gestionado por Ticketi.Click con dominio propio del organizador o
            subdominio de Ticketi.Click.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. Naturaleza de la relación</h2>
          <p className='mb-6 '>
            Ticketi actúa exclusivamente como <strong>intermediario tecnológico</strong> entre el Organizador del evento y el Usuario
            Comprador. No es parte del contrato de compraventa del boleto ni garantiza la realización del evento.
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>El contrato de prestación de servicios (el evento) se da entre el Organizador y el Comprador.</li>
            <li>Ticketi no es responsable por el cumplimiento de horarios, calidad, cambios o cancelaciones del evento.</li>
            <li>
              Los fondos generados por la venta de boletos son enviados directamente a la cuenta del organizador mediante Stripe Connect,
              descontando automáticamente la comisión de Ticketi.
            </li>
          </ul>
        </section>

        <section className='mb-8 '>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. Restricción de Edad y Capacidad Legal</h2>

          <ul className='list-disc pl-6  mb-4'>
            <li>
              El uso de Ticketi está restringido a personas <strong>mayores de 18 años</strong> con plena capacidad legal.
            </li>
            <li>Al registrarse, el usuario declara bajo protesta de decir verdad que cumple con estos requisitos.</li>
            <li>Ticketi se reserva el derecho de cancelar cualquier cuenta registrada por menores de edad o mediante información falsa.</li>
          </ul>
        </section>

        <section className='mb-8 '>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. Uso de la plataforma y publicación de eventos</h2>
          <p className='mb-6 '>Los organizadores se comprometen a: </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              Publicar únicamente eventos <strong>reales, verificados y confirmados</strong>.
            </li>
            <li>
              Ingresar información precisa sobre: título del evento, fecha, hora, lugar, aforo, precios, imagen promocional y condiciones
              generales.
            </li>
            <li>No exceder la capacidad del recinto al emitir boletos.</li>
            <li>Garantizar la validez de cualquier contenido multimedia o promocional utilizado, respetando los derechos de autor.</li>
          </ul>
          <small>
            *Ticketi se reserva el derecho de suspender cualquier evento publicado si detecta indicios de fraude, suplantación, uso indebido
            o contenido inapropiado. Esta suspensión no implica la cancelación del contrato, pero impedirá la visibilidad y venta de boletos
            hasta que se regularice.
          </small>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Validación de boletos y control de acceso</h2>
          <p className='mb-6 '>
            Todos los boletos emitidos por Ticketi incluyen un código QR único, escaneable desde cualquier lector habilitado o software
            compatible.
          </p>
          <h3 className='text-xl font-semibold'>Opciones disponibles:</h3>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              El <strong>organizador es responsable</strong> de validar el acceso al evento.
            </li>
            <li>
              Ticketi puede ofrecer <strong>servicios de control de acceso</strong> con personal y equipo físico como servicio adicional,
              previa cotización.
            </li>
          </ul>
          <p className='mb-6 '>
            En caso de que el organizador contrate este servicio, Ticketi proporcionará un presupuesto y lo descontará directamente de las
            ventas del evento.
          </p>
          <p className='mb-6 '>
            Es responsabilidad exclusiva del organizador garantizar que únicamente ingresen personas con boletos válidos y evitar el uso
            duplicado de accesos.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. Políticas de reembolso</h2>
          <p className='mb-6 '>
            Los reembolsos solo aplican si <strong>el evento es cancelado oficialmente por el organizador</strong>. En este caso:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>El organizador debe notificar a Ticketi por escrito en un plazo máximo de 24 horas posteriores a la cancelación.</li>
            <li>
              El organizador es el <strong>único responsable de realizar los reembolsos</strong> a los compradores finales. Ticketi no puede
              reembolsar directamente ya que no retiene los fondos.
            </li>
            <li>Ticketi descontará el costo de su comisión y gastos operativos del saldo que quede por liquidar al organizador.</li>
            <li>
              El productor debe publicar de forma visible la <strong>dinámica de reembolsos</strong>, incluyendo fechas, canal de contacto y
              condiciones.
            </li>
          </ul>
          <p className='mb-6 '>
            Si el evento es <strong>reprogramado</strong>, los boletos seguirán siendo válidos para la nueva fecha, salvo que el comprador
            solicite la cancelación.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>9. Contracargos</h2>
          <p className='mb-6 '>
            En caso de contracargos iniciados por compradores a través de sus instituciones bancarias, se establece lo siguiente:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Los fondos ya transferidos al organizador pueden ser reclamados por el banco correspondiente.</li>
            <li>
              El <strong>organizador será responsable de cubrir el monto del contracargo</strong>, incluyendo comisiones y gastos
              administrativos asociados.
            </li>
            <li>
              Ticketi se reserva el derecho de <strong>descontar automáticamente</strong> los montos reclamados de cualquier saldo futuro
              por liquidar, o de facturar dichos montos directamente al organizador.
            </li>
            <li>
              En caso de reincidencia o múltiples contracargos, Ticketi podrá suspender la cuenta del organizador, y en casos graves,
              iniciar acciones legales.
            </li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>10. Exclusividad y uso de marca</h2>
          <p className='mb-6 '>Al publicar un evento en Ticketi.Click, el organizador acepta las siguientes condiciones de exclusividad:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              No podrá ofrecer el mismo evento en otras plataformas de boletaje en línea de forma simultánea sin consentimiento escrito de
              Ticketi.
            </li>
            <li>
              El organizador puede vender boletos físicos por su cuenta si lo desea, pero debe{' '}
              <strong>respetar el mismo precio y condiciones</strong> que en Ticketi.
            </li>
          </ul>
          <p className='mb-6 '>Respecto al uso de marca:</p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              El organizador está autorizado a utilizar el logotipo y nombre de <strong>Ticketi.Click</strong> en todo material promocional
              relacionado con el evento publicado.
            </li>
            <li>
              El uso debe ajustarse a los lineamientos de identidad de marca y no debe desprestigiar o alterar el propósito comercial de
              Ticketi.
            </li>
            <li>
              El organizador se compromete a otorgar a Ticketi al menos <strong>diez (10) cortesías</strong> por evento, las cuales podrán
              ser utilizadas con fines promocionales, corporativos o de verificación.
            </li>
          </ul>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>11. Comisiones </h2>
          <p className='mb-6 '>
            El uso de Ticketi.Click implica el cobro de una comisión por cada boleto vendido a través de la plataforma. Las condiciones
            estándar son:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              <strong>Comisión por boleto vendido</strong>: 10% del valor del boleto + $10.00 MXN (más IVA)
            </li>
            <li>
              Esta comisión será <strong>descontada automáticamente</strong> del monto total pagado por el comprador, previo a la
              transferencia al organizador.
            </li>
            <li>La comisión se cobra independientemente de si el evento se realiza o no, salvo causas imputables a Ticketi.</li>
          </ul>
          <p className='mb-6 '>
            Se recomienda a los usuarios revisar periódicamente los TyC para estar al tanto de cualquier cambio. El uso continuado de la
            plataforma después de la modificación implica la aceptación de los nuevos términos.
          </p>
          <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Facturación</h3>
          <p className='mb-6 '>
            El uso de Ticketi.Click implica el cobro de una comisión por cada boleto vendido a través de la plataforma. Las condiciones
            estándar son:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>
              <strong>Ticketi</strong> emitirá una factura al comprador únicamente por el monto correspondiente a la comisión.
            </li>
            <li>
              El <strong>organizador</strong> es responsable de emitir la factura fiscal por el precio total del boleto al comprador final.
            </li>
            <li>Ambas partes deberán proporcionar su información fiscal completa para este proceso.</li>
          </ul>
          <p className='mb-6 '>
            El uso de Ticketi implica que el organizador<strong> acepta el modelo de comisiones</strong>, sin derecho a reintegro posterior
            salvo acuerdo expreso.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>12. Penalidades por Incumplimiento</h2>
          <p className='mb-6 '>
            Ticketi se reserva el derecho de aplicar <strong>sanciones contractuales</strong> en caso de que el organizador:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Publique eventos falsos o no confirmados</li>
            <li>Cancele eventos sin previo aviso</li>
            <li>Oculte información esencial del evento</li>
            <li>Viole las condiciones de exclusividad o uso de marca</li>
            <li>
              Use técnicas como <strong>ingeniería inversa</strong>, scraping, bots o intente clonar funcionalidades de Ticketi
            </li>
            <li>Utilice la plataforma para fines distintos a la venta legal de boletos</li>
          </ul>
          <h3>Penalidades aplicables:</h3>
          <ul className='list-disc pl-6  mb-4'>
            <li>Suspensión inmediata del evento y del acceso a la cuenta</li>
            <li>
              Penalización de hasta <strong>$100,000.00 MXN</strong> por incumplimiento grave
            </li>
            <li>Responsabilidad legal directa por daños y perjuicios</li>
            <li>Publicación del evento como “cancelado por incumplimiento” si afecta a compradores</li>
          </ul>
          <p className='mb-6 '>
            Estas medidas tienen el objetivo de proteger la integridad de la plataforma y la experiencia de los usuarios.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>13. Exención de Responsabilidades</h2>
          <p className='mb-6 '>
            Ticketi actúa exclusivamente como una plataforma de gestión y venta de boletos, y{' '}
            <strong>no tiene responsabilidad alguna</strong> sobre:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>La calidad, duración, contenido o experiencia del evento</li>
            <li>Cambios en horarios, artistas, sedes o condiciones no informadas</li>
            <li>La cancelación total o parcial del evento por causas externas</li>
            <li>Disputas entre el organizador y el comprador</li>
            <li>Fallas de conexión a internet o interrupciones de terceros</li>
          </ul>

          <p className='mb-6 '>
            Ticketi no será responsable por lucro cesante, daño moral o perjuicio económico directo o indirecto derivado de eventos que no
            se lleven a cabo por causas imputables al organizador o a terceros.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>14. Modificaciones al Contrato y Actualizaciones</h2>
          <p className='mb-6 '>
            Estos Términos y Condiciones <strong>pueden ser modificados en cualquier momento</strong> por Ticketi.Click. Las modificaciones
            serán notificadas mediante:
          </p>
          <ul className='list-disc pl-6  mb-4'>
            <li>Publicación directa en la plataforma</li>
            <li>Correo electrónico al organizador registrado (si aplica)</li>
          </ul>

          <p className='mb-6 '>
            Los cambios surtirán efecto desde su publicación. El uso continuo de la plataforma después de los cambios implica aceptación
            tácita.
          </p>
          <p className='mb-6 '>
            En caso de que Ticketi y un organizador firmen un contrato específico, este prevalecerá sobre los TyC generales, en todo lo que
            no los contradiga.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>15. Jurisdicción y Legislación Aplicable</h2>
          <p className='mb-6 '>
            Para la interpretación y cumplimiento de los presentes Términos y Condiciones, ambas partes se someten expresamente a las leyes
            federales de los Estados Unidos Mexicanos y a los <strong>tribunales competentes en la Ciudad de México</strong>, renunciando a
            cualquier otra jurisdicción que pudiera corresponderles por razón de su domicilio presente o futuro.
          </p>
        </section>

        <p className='mb-6 '>Última actualización: 7 de junio de 2025</p>
      </div>
    </div>
  )
}
