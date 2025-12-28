export interface CalculationResult {
  originalAmount: number;
  gstAmount: number;
  finalAmount: number;
  rate: number;
  isAddition: boolean;
}

/**
 * Calculates GST (Add or Remove)
 * @param amount The input amount
 * @param rate The GST rate (e.g., 5.0, 12.0)
 * @param isAddition True to ADD GST, False to REMOVE GST
 */
export const calculateGst = (
  amount: number,
  rate: number,
  isAddition: boolean
): CalculationResult => {
  // JavaScript uses floating point, so we need to be careful with precision.
  // For a simple app, standard math is usually "okay", but for money, let's try to be slightly safer
  // by rounding at the end.
  
  let gstAmount = 0;
  let finalAmount = 0;
  let originalAmount = amount;

  if (isAddition) {
    // GST = Amount * (Rate / 100)
    gstAmount = (amount * rate) / 100;
    finalAmount = amount + gstAmount;
  } else {
    // Original = Final / (1 + Rate/100)
    // GST = Final - Original
    const onePlusRate = 1 + rate / 100;
    originalAmount = amount / onePlusRate;
    gstAmount = amount - originalAmount;
    finalAmount = amount;
  }

  return {
    originalAmount: Number(originalAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    finalAmount: Number(finalAmount.toFixed(2)),
    rate,
    isAddition,
  };
};
