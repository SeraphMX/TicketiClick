// utils/couponValidator.ts
export const validateCoupon = (code: string) => {
  const normalized = code.trim().toLowerCase()
  if (normalized === 'admin90') {
    return {
      code: 'admin90',
      discount: 90,
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
