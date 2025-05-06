"use client";
// components/checkout/OrderSummary.tsx
// Componente de resumen de la orden

import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, CreditCard, User, Check, Phone, Ticket } from 'lucide-react';
import { Event } from '@/lib/types';

interface OrderSummaryProps {
  event: Event;
  formData: {
    email: string;
    phone: string;
    ticketName?: string;
    paymentMethod: string;
  };
  onConfirm: () => void;
  onBack: () => void;
}

// Función para formatear fechas a formato español
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Traductor de métodos de pago
const translatePaymentMethod = (method: string) => {
  const translations: Record<string, string> = {
    card: 'Tarjeta de crédito/débito',
    transfer: 'Transferencia bancaria',
    oxxo: 'Pago en OXXO'
  };
  return translations[method] || method;
};

export default function OrderSummary({
  event,
  formData,
  onConfirm,
  onBack
}: OrderSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simular proceso de pago
    await new Promise(resolve => setTimeout(resolve, 2000));
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Resumen de compra</h2>
      </div>

      {/* Detalles del evento */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">{event.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.date)} - {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </div>
      </div>

      {/* Datos del comprador */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Datos de contacto</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formData.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>{formData.phone}</span>
          </div>
          {formData.ticketName && (
            <div className="flex items-center text-sm">
              <Ticket className="h-4 w-4 mr-2 text-gray-400" />
              <span>Nombre en boleto: {formData.ticketName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Método de pago */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Método de pago</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
            <span>{translatePaymentMethod(formData.paymentMethod)}</span>
          </div>
        </div>
      </div>

      {/* Resumen de costos */}
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{event.price.toFixed(2)} {event.currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Cargo por servicio</span>
            <span>{(event.price * 0.05).toFixed(2)} {event.currency}</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>{(event.price * 1.05).toFixed(2)} {event.currency}</span>
          </div>
        </div>
      </div>

      {/* Botón de confirmación */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className={`
            inline-flex items-center justify-center px-6 py-3 border border-transparent
            text-base font-medium rounded-md shadow-sm text-white bg-purple-600
            hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed
            min-w-[200px]
          `}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Procesando...
            </>
          ) : (
            <>
              <Check className="mr-2 h-5 w-5" />
              Confirmar compra
            </>
          )}
        </button>
      </div>
    </div>
  );
}