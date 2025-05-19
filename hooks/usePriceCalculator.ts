import { priceCalculator } from '@/lib/priceCalculator'
import { useMemo } from 'react'

interface Coupon {
  code: string
  discount: number
  isApplied: boolean
  isPercentage?: boolean
}

interface UsePriceCalculatorProps {
  quantity: number
  unitPrice: number
  coupon?: Coupon
  serviceFeePercent?: number
  paymentFeePercent?: number
  ticketFee?: number
}

export function usePriceCalculator(props: UsePriceCalculatorProps) {
  return useMemo(() => priceCalculator(props), [JSON.stringify(props)])
}
