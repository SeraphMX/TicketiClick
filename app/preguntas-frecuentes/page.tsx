'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQPage() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Preguntas Frecuentes</h1>

      <Accordion type='single' collapsible className='space-y-4'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='text-left'>¿Cómo compro boletos?</AccordionTrigger>
          <AccordionContent>
            Para comprar boletos, simplemente navega a través de nuestros eventos disponibles, selecciona el que te interese, elige la
            cantidad de boletos que deseas y procede al checkout. Aceptamos diversos métodos de pago y recibirás tus boletos por correo
            electrónico inmediatamente después de la compra.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2'>
          <AccordionTrigger className='text-left'>¿Cómo recibo mis boletos?</AccordionTrigger>
          <AccordionContent>
            Una vez completada tu compra, recibirás tus boletos en formato digital a través del correo electrónico que proporcionaste
            durante la compra. También podrás acceder a tus boletos en cualquier momento desde tu cuenta en la sección "Mis Boletos".
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-3'>
          <AccordionTrigger className='text-left'>¿Puedo obtener un reembolso?</AccordionTrigger>
          <AccordionContent>
            Las políticas de reembolso varían según el evento y el organizador. En general, los reembolsos están disponibles hasta 48 horas
            antes del evento, a menos que se especifique lo contrario en los términos específicos del evento.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-4'>
          <AccordionTrigger className='text-left'>¿Qué hago si no puedo asistir al evento?</AccordionTrigger>
          <AccordionContent>
            Si no puedes asistir al evento, tienes varias opciones: 1. Solicitar un reembolso (si está dentro del período permitido) 2.
            Transferir tus boletos a otra persona 3. Contactar al organizador del evento para opciones específicas
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-5'>
          <AccordionTrigger className='text-left'>¿Los boletos son transferibles?</AccordionTrigger>
          <AccordionContent>
            Sí, los boletos son transferibles en la mayoría de los casos. Puedes transferir tus boletos a otra persona actualizando la
            información del titular del boleto en tu cuenta. Ten en cuenta que algunos eventos pueden tener restricciones específicas sobre
            la transferencia de boletos.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
