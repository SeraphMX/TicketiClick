// utils/couponValidator.ts
export const validateCoupon = (code: string) => {
  const normalized = code.trim().toLowerCase()
  if (normalized === 'chapul20') {
    return {
      code: 'chapul20',
      discount: 20,
      isPercentage: true,
      isApplied: true
    }
  }

  return {
    code,
    discount: 0,
    isPercentage: false,
    isApplied: false
  }
}
