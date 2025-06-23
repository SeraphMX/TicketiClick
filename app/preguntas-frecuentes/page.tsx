'use client'

import { Accordion, AccordionItem } from '@heroui/react'

export default function FAQPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16  '>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Preguntas Frecuentes</h1>
      <Accordion itemClasses={{ title: 'font-semibold text-medium' }}>
        <AccordionItem
          key='1'
          aria-label='¿Cómo puedo comprar boletos en ticketi.click?'
          title='¿Cómo puedo comprar boletos en ticketi.click?'
        >
          Selecciona el evento de tu interés, elige tus asientos o zona (si aplica), añade los boletos al carrito y completa el proceso de
          pago.
        </AccordionItem>
        <AccordionItem key='2' aria-label='¿Qué métodos de pago aceptan?' title='¿Qué métodos de pago aceptan?'>
          Aceptamos tarjetas de crédito y débito (Visa, MasterCard), transferencias bancarias y pagos en efectivo a través de OXXO Pay.
        </AccordionItem>
        <AccordionItem key='3' aria-label='¿Puedo elegir mis asientos al comprar?' title='¿Puedo elegir mis asientos al comprar?'>
          Sí el evento cuenta con asientos numerados, podrás seleccionarlos desde el mapa interactivo. En eventos con acceso general, solo
          eliges la cantidad de boletos.
        </AccordionItem>
        <AccordionItem key='4' aria-label='¿Cuántos boletos puedo comprar por evento?' title='¿Cuántos boletos puedo comprar por evento?'>
          El límite habitual es de 2 boletos por usuario, aunque puede variar según el evento. Consulta los detalles específicos en cada
          ficha de evento.
        </AccordionItem>
        <AccordionItem key='5' aria-label='¿Cómo y cuándo recibiré mis boletos?' title='¿Cómo y cuándo recibiré mis boletos?'>
          Una vez confirmado el pago, recibirás tus boletos electrónicos (e-tickets) en formato PDF directamente en tu correo electrónico.
        </AccordionItem>
        <AccordionItem
          key='6'
          aria-label='¿Qué hago si no recibí mis boletos o la confirmación de compra?'
          title='¿Qué hago si no recibí mis boletos o la confirmación de compra?'
        >
          Revisa tu bandeja de entrada y carpeta de spam. Si no los encuentras, escríbenos a nuestro correo de soporte con tu nombre y
          número de pedido.
        </AccordionItem>
        <AccordionItem key='7' aria-label='¿Puedo cancelar o cambiar mis boletos?' title='¿Puedo cancelar o cambiar mis boletos?'>
          No. Todas las ventas son finales, a menos que el evento sea cancelado o modificado por el organizador.
        </AccordionItem>
        <AccordionItem
          key='8'
          aria-label='¿Puedo transferir mis boletos a otra persona?'
          title='¿Puedo transferir mis boletos a otra persona?'
        >
          Sí, puedes reenviar el archivo PDF a la persona que asistirá. Se recomienda que esa persona presente el boleto digital con código
          QR desde su dispositivo móvil.
        </AccordionItem>
        <AccordionItem
          key='9'
          aria-label='¿Qué sucede si el evento se cancela o cambia de fecha?'
          title='¿Qué sucede si el evento se cancela o cambia de fecha?'
        >
          Te informaremos por correo electrónico con los pasos a seguir para solicitar tu reembolso o para usar tus boletos en la nueva
          fecha.
        </AccordionItem>
        <AccordionItem
          key='10'
          aria-label='¿Cómo puedo contactar al equipo de soporte de ticketi.click?'
          title='¿Cómo puedo contactar al equipo de soporte de ticketi.click?'
        >
          Puedes escribirnos al correo: <a href='mailto:hola@ticketi.click'>hola@ticketi.click</a>
        </AccordionItem>
      </Accordion>

      <section>
        <h2 className='text-2xl font-semibold text-gray-900 mt-12 mb-4'>¿No encontraste tu respuesta?</h2>
        <p className='text-gray-600 mb-6'>
          Si tienes más preguntas o necesitas ayuda adicional, no dudes en contactarnos a través de nuestro correo electrónico o redes
          sociales.
        </p>
      </section>
    </div>
  )
}
