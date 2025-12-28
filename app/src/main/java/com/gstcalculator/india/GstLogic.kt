package com.gstcalculator.india

import java.math.BigDecimal
import java.math.RoundingMode

object GstLogic {

    data class CalculationResult(
        val originalAmount: BigDecimal,
        val gstAmount: BigDecimal,
        val finalAmount: BigDecimal,
        val rate: Double,
        val isAddition: Boolean
    )

    /**
     * Calculates GST (Add or Remove)
     * @param amount The input amount
     * @param rate The GST rate (e.g., 5.0, 12.0)
     * @param isAddition True to ADD GST, False to REMOVE GST
     */
    fun calculate(amount: Double, rate: Double, isAddition: Boolean): CalculationResult {
        // Use BigDecimal for financial precision
        val amountBd = BigDecimal(amount)
        val rateBd = BigDecimal(rate)

        var gstAmount: BigDecimal
        var finalAmount: BigDecimal
        var originalAmount = amountBd

        if (isAddition) {
            // Formula: GST = Amount * (Rate / 100)
            // Final = Amount + GST
            gstAmount = amountBd.multiply(rateBd)
                .divide(BigDecimal(100), 2, RoundingMode.HALF_UP)
            finalAmount = amountBd.add(gstAmount)
        } else {
            // Formula: Original = Final / (1 + Rate/100)
            // GST = Final - Original
            // Here 'amount' is the "Final Amount" (inclusive of GST)
            val onePlusRate = BigDecimal(1).add(rateBd.divide(BigDecimal(100)))
            val baseAmount = amountBd.divide(onePlusRate, 2, RoundingMode.HALF_UP)
            
            gstAmount = amountBd.subtract(baseAmount)
            finalAmount = amountBd
            originalAmount = baseAmount
        }

        return CalculationResult(
            originalAmount = originalAmount.setScale(2, RoundingMode.HALF_UP),
            gstAmount = gstAmount.setScale(2, RoundingMode.HALF_UP),
            finalAmount = finalAmount.setScale(2, RoundingMode.HALF_UP),
            rate = rate,
            isAddition = isAddition
        )
    }
}
