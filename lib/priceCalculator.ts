interface Coupon {
  code: string
  discount: number
  isApplied: boolean
  isPercentage?: boolean
}

interface PriceCalculatorInput {
  quantity: number
  unitPrice: number
  coupon?: Coupon
  serviceFeePercent?: number
  paymentFeePercent?: number
  ticketFee?: number
}

interface PriceCalculatorResult {
  subtotal: number
  discount: number
  serviceFee: number
  paymentFee: number
  ticketFee: number
  total: number
}

export function priceCalculator({
  quantity,
  unitPrice,
  coupon,
  serviceFeePercent = 10,
  paymentFeePercent = 5,
  ticketFee = 10
}: PriceCalculatorInput): PriceCalculatorResult {
  const subtotal = quantity * unitPrice

  let discount = 0
  if (coupon?.isApplied) {
    discount = coupon.isPercentage ? (subtotal * coupon.discount) / 100 : coupon.discount
  }

  const serviceFee = ((subtotal - discount) * serviceFeePercent) / 100
  const paymentFee = ((subtotal - discount) * paymentFeePercent) / 100
  const totalTicketFee = ticketFee * quantity

  const total = subtotal - discount + serviceFee + paymentFee + totalTicketFee

  return {
    subtotal,
    discount,
    serviceFee,
    paymentFee,
    ticketFee: totalTicketFee,
    total
  }
}
