'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { CardContent } from '@/components/ui/card'
import { Badge, Card, CardHeader, NumberInput, Select, SelectItem } from '@heroui/react'
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Globe,
  Headphones,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OrganizadoresPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: ''
  })

  //

  const eventCategories = [
    { key: 'musica', label: 'Música' },
    { key: 'deportes', label: 'Deportes' },
    { key: 'teatro', label: 'Teatro' },
    { key: 'conferencia', label: 'Conferencias' },
    { key: 'festival', label: 'Festivales' },
    { key: 'taller', label: 'Talleres' },
    { key: 'otro', label: 'Otro tipo de eventos' }
  ]

  // Calculadora de comisiones
  const [ticketPrice, setTicketPrice] = useState(500)
  const [ticketQuantity, setTicketQuantity] = useState(100)
  const [whoAbsorbsCost, setWhoAbsorbsCost] = useState<'organizer' | 'client'>('client')

  const calculateCommission = () => {
    const basePrice = ticketPrice
    const quantity = ticketQuantity

    // Costos fijos
    const ticketiCommissionRate = 0.1 // 10%
    const paymentFeeRate = 0.05 // 5%
    const fixedFeePerTicket = 10 // $10 MXN por boleto

    if (whoAbsorbsCost === 'organizer') {
      // El organizador absorbe los costos - se descuentan del total bruto
      const grossRevenue = basePrice * quantity
      const ticketiCommission = grossRevenue * ticketiCommissionRate
      const paymentFee = grossRevenue * paymentFeeRate
      const fixedFee = quantity * fixedFeePerTicket
      const totalFees = ticketiCommission + paymentFee + fixedFee
      const netRevenue = grossRevenue - totalFees

      return {
        type: 'organizer',
        basePrice,
        quantity,
        grossRevenue,
        ticketiCommission,
        paymentFee,
        fixedFee,
        totalFees,
        netRevenue,
        clientPaysPerTicket: basePrice, // El cliente paga el precio base
        totalClientPays: grossRevenue
      }
    } else {
      // El cliente absorbe los costos - se suman al precio del boleto
      const baseTotalWithoutFees = basePrice * quantity
      const ticketiCommission = baseTotalWithoutFees * ticketiCommissionRate
      const paymentFee = baseTotalWithoutFees * paymentFeeRate
      const fixedFee = quantity * fixedFeePerTicket
      const totalFees = ticketiCommission + paymentFee + fixedFee

      // Precio final que paga el cliente por boleto (incluye comisiones)
      const clientPaysPerTicket = basePrice + totalFees / quantity
      const totalClientPays = clientPaysPerTicket * quantity

      return {
        type: 'client',
        basePrice,
        quantity,
        grossRevenue: baseTotalWithoutFees, // Lo que recibe el organizador (precio base)
        ticketiCommission,
        paymentFee,
        fixedFee,
        totalFees,
        netRevenue: baseTotalWithoutFees, // El organizador recibe el precio base completo
        clientPaysPerTicket,
        totalClientPays
      }
    }
  }

  const commission = calculateCommission()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí integrarías con tu sistema de registro
    console.log('Registro de organizador:', formData)
    router.push('/crear-cuenta')
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-zinc-800 text-white'>
        <div className='absolute inset-0 bg-black opacity-20'></div>
        <div className='relative max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            Convierte tus eventos en
            <span className='text-blue-300'> éxitos garantizados</span>
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto'>
            La plataforma más completa para vender boletos, gestionar eventos y hacer crecer tu audiencia
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3'>
              Crear cuenta gratis
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button size='lg' variant='bordered' className='border-white text-white hover:bg-white hover:text-blue-900'>
              Ver demo en vivo
            </Button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-blue-300'>50K+</div>
              <div className='text-sm text-blue-100'>Eventos creados</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-blue-300'>2M+</div>
              <div className='text-sm text-blue-100'>Boletos vendidos</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-blue-300'>99.9%</div>
              <div className='text-sm text-blue-100'>Uptime garantizado</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-blue-300'>24/7</div>
              <div className='text-sm text-blue-100'>Soporte técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Registro */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white' id='registro'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Comienza a vender boletos en minutos</h2>
            <p className='text-xl text-gray-600'>Únete a miles de organizadores que confían en Ticketi</p>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Registro gratuito</h3>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <Input
                  label='Nombre completo'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type='email'
                  label='Correo electrónico'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  type='tel'
                  label='Teléfono'
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Input
                  label='Empresa u organización'
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <Select
                  isRequired
                  className='max-w-xs'
                  defaultSelectedKeys={['cat']}
                  label='Tipos de evento'
                  placeholder='Selecciona un tipo'
                >
                  {eventCategories.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                  ))}
                </Select>

                <Button type='submit' color='primary'>
                  Crear cuenta gratuita
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </form>
            </div>

            <div className='bg-blue-50 p-8 rounded-lg'>
              <h4 className='text-xl font-semibold mb-4 text-gray-900'>¿Por qué elegir Ticketi?</h4>
              <ul className='space-y-3'>
                <li className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                  <span>Sin costos de configuración</span>
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                  <span>Comisiones más bajas del mercado</span>
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                  <span>Pagos instantáneos</span>
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                  <span>Soporte técnico 24/7</span>
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                  <span>Herramientas de marketing incluidas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pasos para comenzar */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>3 pasos para tu primer evento</h2>
            <p className='text-xl text-gray-600'>Configurar tu evento nunca fue tan fácil</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Calendar className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>1. Crea tu evento</h3>
              <p className='text-gray-600'>Agrega información básica, fechas, ubicación y precios. Todo en menos de 5 minutos.</p>
            </div>

            <div className='text-center'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CreditCard className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>2. Configura pagos</h3>
              <p className='text-gray-600'>Conecta tu cuenta bancaria y comienza a recibir pagos al instante.</p>
            </div>

            <div className='text-center'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <TrendingUp className='h-8 w-8 text-blue-600' />
              </div>
              <h3 className='text-xl font-semibold mb-2'>3. Promociona y vende</h3>
              <p className='text-gray-600'>Usa nuestras herramientas de marketing para llegar a más personas y vender más boletos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Competitivas */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>¿Por qué elegir Ticketi?</h2>
            <p className='text-xl text-gray-600'>Comparamos con las principales plataformas del mercado</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card className='border-blue-200 shadow-lg'>
              <CardHeader className='text-center flex flex-col items-center'>
                <Zap className='h-12 w-12 text-blue-600 mx-auto mb-2' />
                <h3>Más rápido</h3>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-center'>Configuración en 5 minutos vs 2-3 horas en otras plataformas</p>
              </CardContent>
            </Card>

            <Card className='border-green-200 shadow-lg'>
              <CardHeader className='text-center flex flex-col items-center'>
                <DollarSign className='h-12 w-12 text-green-600 mx-auto mb-2' />
                <h3>Más económico</h3>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-center'>Comisiones 40% más bajas que Eventbrite y otros competidores</p>
              </CardContent>
            </Card>

            <Card className='border-zinc-200 shadow-lg'>
              <CardHeader className='text-center flex flex-col items-center'>
                <Smartphone className='h-12 w-12 text-zinc-600 mx-auto mb-2' />
                <h3>Más moderno</h3>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-center'>Interfaz intuitiva diseñada para la nueva generación de organizadores</p>
              </CardContent>
            </Card>

            <Card className='border-blue-200 shadow-lg'>
              <CardHeader className='text-center flex flex-col items-center'>
                <Headphones className='h-12 w-12 text-blue-600 mx-auto mb-2' />
                <h3>Mejor soporte</h3>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 text-center'>Soporte en español 24/7, no chatbots automáticos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculadora de Comisiones */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-blue-50'>
        <div className='max-w-5xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Calculadora de ganancias</h2>
            <p className='text-xl text-gray-600'>Descubre cuánto puedes ganar con tu próximo evento</p>
          </div>

          <Card className='shadow-xl'>
            <CardHeader>
              <h3 className='flex items-center'>
                <Calculator className='h-6 w-6 mr-2' />
                Estima tus ganancias
              </h3>
            </CardHeader>
            <CardContent>
              <div className='grid lg:grid-cols-3 gap-8'>
                {/* Inputs */}
                <div className='space-y-6'>
                  <div>
                    <NumberInput
                      label='Precio por boleto (MXN)'
                      value={ticketPrice}
                      onValueChange={setTicketPrice}
                      className='text-lg'
                      min='1'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-2'>Cantidad estimada de boletos</label>
                    <NumberInput
                      label='Cantidad estimada de boletos'
                      value={ticketQuantity}
                      onValueChange={setTicketQuantity}
                      className='text-lg'
                      min='1'
                    />
                  </div>

                  {/* Radio buttons para quién absorbe la comisión */}
                  <div>
                    <label className='block text-sm font-medium mb-3'>¿Quién absorbe las comisiones?</label>
                    <div className='space-y-3'>
                      <div className='flex items-center space-x-3'>
                        <input
                          type='radio'
                          id='organizer'
                          name='whoAbsorbs'
                          value='organizer'
                          checked={whoAbsorbsCost === 'organizer'}
                          onChange={(e) => setWhoAbsorbsCost(e.target.value as 'organizer' | 'client')}
                          className='h-4 w-4 text-blue-600'
                        />
                        <label htmlFor='organizer' className='text-sm font-medium'>
                          El organizador (se descuentan del total)
                        </label>
                      </div>
                      <div className='flex items-center space-x-3'>
                        <input
                          type='radio'
                          id='client'
                          name='whoAbsorbs'
                          value='client'
                          checked={whoAbsorbsCost === 'client'}
                          onChange={(e) => setWhoAbsorbsCost(e.target.value as 'organizer' | 'client')}
                          className='h-4 w-4 text-blue-600'
                        />
                        <label htmlFor='client' className='text-sm font-medium'>
                          El cliente (se suman al precio del boleto)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultados */}
                <div className='lg:col-span-2'>
                  <div className='bg-gray-50 p-6 rounded-lg'>
                    <h4 className='font-semibold text-lg mb-4'>
                      {whoAbsorbsCost === 'organizer'
                        ? 'Desglose de ingresos (Organizador absorbe costos)'
                        : 'Desglose de ingresos (Cliente absorbe costos)'}
                    </h4>

                    <div className='grid md:grid-cols-2 gap-6'>
                      {/* Columna izquierda - Cálculos principales */}
                      <div className='space-y-3'>
                        {whoAbsorbsCost === 'organizer' ? (
                          <>
                            <div className='flex justify-between'>
                              <span>Ingresos brutos:</span>
                              <span className='font-semibold'>${commission.grossRevenue.toLocaleString()} MXN</span>
                            </div>
                            <div className='flex justify-between text-red-600'>
                              <span>Comisión Ticketi (10%):</span>
                              <span>-${commission.ticketiCommission.toLocaleString()} MXN</span>
                            </div>
                            <div className='flex justify-between text-red-600'>
                              <span>Comisión bancaria (5%):</span>
                              <span>-${commission.paymentFee.toLocaleString()} MXN</span>
                            </div>
                            <div className='flex justify-between text-red-600'>
                              <span>Cargo por boleto ($10 c/u):</span>
                              <span>-${commission.fixedFee.toLocaleString()} MXN</span>
                            </div>
                            <hr className='my-3' />
                            <div className='flex justify-between text-lg font-bold text-green-600'>
                              <span>Tú recibes:</span>
                              <span>${commission.netRevenue.toLocaleString()} MXN</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className='flex justify-between'>
                              <span>Precio base por boleto:</span>
                              <span className='font-semibold'>${commission.basePrice.toLocaleString()} MXN</span>
                            </div>
                            <div className='flex justify-between'>
                              <span>Tus ingresos totales:</span>
                              <span className='font-semibold text-green-600'>${commission.netRevenue.toLocaleString()} MXN</span>
                            </div>
                            <hr className='my-3' />
                            <div className='bg-blue-100 p-3 rounded-md'>
                              <h5 className='font-semibold text-blue-800 mb-2'>Lo que paga el cliente:</h5>
                              <div className='flex justify-between text-blue-700'>
                                <span>Precio final por boleto:</span>
                                <span className='font-bold'>${commission.clientPaysPerTicket.toLocaleString()} MXN</span>
                              </div>
                              <div className='flex justify-between text-blue-700 mt-1'>
                                <span>Total que paga el cliente:</span>
                                <span className='font-bold'>${commission.totalClientPays.toLocaleString()} MXN</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Columna derecha - Desglose de comisiones */}
                      {/* <div className='bg-white p-4 rounded-md border'>
                        <h5 className='font-semibold mb-3'>Desglose de comisiones:</h5>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Comisión Ticketi:</span>
                            <span>${commission.ticketiCommission.toLocaleString()} MXN</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Comisión bancaria:</span>
                            <span>${commission.paymentFee.toLocaleString()} MXN</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Cargo fijo por boleto:</span>
                            <span>${commission.fixedFee.toLocaleString()} MXN</span>
                          </div>
                          <hr />
                          <div className='flex justify-between font-semibold'>
                            <span>Total comisiones:</span>
                            <span>${commission.totalFees.toLocaleString()} MXN</span>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    {/* Comparación con Eventbrite */}
                    {/* <div className='mt-6 p-4 bg-green-100 rounded-md'>
                      <p className='text-sm text-green-800'>
                        💡 <strong>Comparación con Eventbrite:</strong> Con sus comisiones (~18% total) pagarías $
                        {((commission.grossRevenue || commission.totalClientPays) * 0.18).toLocaleString()} MXN.
                        <br />
                        <span className='font-semibold'>
                          ¡Ahorras $
                          {((commission.grossRevenue || commission.totalClientPays) * 0.18 - commission.totalFees).toLocaleString()} MXN con
                          Ticketi!
                        </span>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparación de Planes */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Planes transparentes para todos</h2>
            <p className='text-xl text-gray-600'>Sin letra pequeña, sin sorpresas</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Plan Gratuito */}
            <Card className='relative'>
              <CardHeader className='flex flex-col items-center'>
                <h3 className='text-center'>Eventos Gratuitos</h3>
                <div className='text-center'>
                  <span className='text-4xl font-bold'>$0</span>
                  <span className='text-gray-600'> MXN</span>
                </div>
                <h3 className='text-center'>Para eventos sin costo de entrada</h3>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3'>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Eventos 100% gratuitos</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Gestión básica de asistentes</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Promoción en la plataforma</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Soporte por email</span>
                  </li>
                </ul>
                <Button className='w-full mt-6' variant='bordered'>
                  Comenzar gratis
                </Button>
              </CardContent>
            </Card>

            {/* Plan Básico */}
            <Card className='relative' classNames={{ base: 'border-blue-500 border-1' }}>
              <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600'>Más Popular</Badge>
              <CardHeader className='flex flex-col items-center'>
                <h3 className='text-center'>Eventos de Pago</h3>
                <div className='text-center'>
                  <span className='text-4xl font-bold'>10%</span>
                  <span className='text-gray-600'> + $10/boleto</span>
                </div>
                <h3 className='text-center'>Para eventos con boletos de pago</h3>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3'>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Todo lo del plan gratuito</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Procesamiento de pagos</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Reportes avanzados</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Herramientas de marketing</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <Button className='w-full mt-6 bg-blue-600 hover:bg-blue-700'>Empezar ahora</Button>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className='relative'>
              <CardHeader className='flex flex-col items-center'>
                <h3 className='text-center'>Enterprise</h3>
                <div className='text-center'>
                  <span className='text-4xl font-bold'>Personalizado</span>
                </div>
                <h3 className='text-center'>Para organizaciones grandes</h3>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3'>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Comisiones negociables</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Integración API completa</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Branding personalizado</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>Account manager dedicado</span>
                  </li>
                  <li className='flex items-center'>
                    <CheckCircle className='h-5 w-5 text-green-500 mr-3' />
                    <span>SLA garantizado</span>
                  </li>
                </ul>
                <Button className='w-full mt-6' variant='bordered'>
                  Contactar ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios Clave */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Todo lo que necesitas en una plataforma</h2>
            <p className='text-xl text-gray-600'>Herramientas profesionales para eventos exitosos</p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='flex items-start space-x-4'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <BarChart3 className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Analytics avanzados</h3>
                <p className='text-gray-600'>Reportes en tiempo real de ventas, asistencia y comportamiento de usuarios</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-green-100 p-3 rounded-lg'>
                <Shield className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Pagos seguros</h3>
                <p className='text-gray-600'>Certificación PCI DSS y encriptación de grado bancario para todas las transacciones</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-zinc-100 p-3 rounded-lg'>
                <Globe className='h-6 w-6 text-zinc-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Alcance global</h3>
                <p className='text-gray-600'>Vende boletos en múltiples monedas y idiomas, llega a audiencias internacionales</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <Users className='h-6 w-6 text-blue-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Gestión de asistentes</h3>
                <p className='text-gray-600'>Check-in digital, listas de asistentes, comunicación masiva y seguimiento</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-yellow-100 p-3 rounded-lg'>
                <Star className='h-6 w-6 text-yellow-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Marketing integrado</h3>
                <p className='text-gray-600'>Email marketing, redes sociales, códigos de descuento y programa de afiliados</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-green-100 p-3 rounded-lg'>
                <Clock className='h-6 w-6 text-green-600' />
              </div>
              <div>
                <h3 className='font-semibold text-lg mb-2'>Pagos instantáneos</h3>
                <p className='text-gray-600'>Recibe tu dinero al instante después de cada venta, sin esperas ni retenciones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-6'>¿Listo para crear tu primer evento?</h2>
          <p className='text-xl mb-8 text-blue-100'>Únete a miles de organizadores que ya están vendiendo más boletos con Ticketi</p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
            <Button size='lg' className='bg-white text-blue-900 hover:bg-gray-100 px-8 py-3'>
              Crear cuenta gratuita
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button size='lg' variant='bordered' className='border-white text-white hover:bg-white hover:text-blue-900'>
              Hablar con un experto
            </Button>
          </div>

          <p className='text-sm text-blue-200'>Sin configuración. Sin costos ocultos. Sin compromisos a largo plazo.</p>
        </div>
      </section>
    </div>
  )
}
