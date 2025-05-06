"use client";
// components/checkout/PaymentMethod.tsx
// Componente de selección de método de pago

import { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Store, ChevronRight } from 'lucide-react';

interface PaymentMethodProps {
  formData: {
    paymentMethod?: string;
  };
  onSubmit: (method: string) => void;
  onBack: () => void;
}

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Tarjeta de crédito/débito',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
  },
  {
    id: 'transfer',
    name: 'Transferencia bancaria',
    description: 'BBVA, Santander, Banorte',
    icon: Building2,
  },
  {
    id: 'oxxo',
    name: 'Pago en OXXO',
    description: 'Genera tu referencia y paga en cualquier OXXO',
    icon: Store,
  },
];

export default function PaymentMethod({ formData, onSubmit, onBack }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState(formData.paymentMethod || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod) {
      onSubmit(selectedMethod);
    }
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
        <h2 className="text-xl font-bold text-gray-900">Método de pago</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`
                  relative rounded-lg border-2 p-4 cursor-pointer transition-all
                  ${selectedMethod === method.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                  </div>
                  <div className="ml-3 flex items-center">
                    <Icon className={`h-8 w-8 ${
                      selectedMethod === method.id ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className="ml-3">
                      <label className="block text-sm font-medium text-gray-900">
                        {method.name}
                      </label>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                </div>

                {method.id === 'card' && selectedMethod === 'card' && (
                  <div className="mt-4 pl-7">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          MM/AA
                        </label>
                        <input
                          type="text"
                          placeholder="12/25"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!selectedMethod}
            className={`
              inline-flex items-center justify-center px-4 py-2 border border-transparent 
              text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 
              hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            Continuar
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}