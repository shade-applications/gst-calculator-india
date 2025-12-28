package com.gstcalculator.india

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.gstcalculator.india.ui.theme.GSTCalculatorIndiaTheme

@Composable
fun GstCalculatorApp() {
    GSTCalculatorIndiaTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            CalculatorScreen()
        }
    }
}

@Composable
fun CalculatorScreen() {
    var amountInput by remember { mutableStateOf("") }
    var selectedRate by remember { mutableDoubleStateOf(18.0) }
    var result by remember { mutableStateOf<GstLogic.CalculationResult?>(null) }
    
    val focusManager = LocalFocusManager.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .clickable(interactionSource = remember { MutableInteractionSource() }, indication = null) {
                focusManager.clearFocus() 
            },
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        Spacer(modifier = Modifier.height(20.dp))

        // Title
        Text(
            text = "GST Calculator",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = MaterialTheme.colorScheme.primary
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Amount Input
        OutlinedTextField(
            value = amountInput,
            onValueChange = { if (it.all { char -> char.isDigit() || char == '.' }) amountInput = it },
            label = { Text("Enter Amount (₹)") },
            modifier = Modifier.fillMaxWidth(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            textStyle = TextStyle(fontSize = 24.sp, fontWeight = FontWeight.Bold),
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = MaterialTheme.colorScheme.primary,
                unfocusedBorderColor = Color.Gray
            )
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Quick Amounts (Optional but requested in PRD)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            val quickAmounts = listOf("100", "500", "1000")
            quickAmounts.forEach { amt ->
                OutlinedButton(onClick = { amountInput = amt; result = null }) {
                    Text("₹$amt")
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Tax Rates
        Text(text = "GST Rate", style = MaterialTheme.typography.titleMedium)
        Spacer(modifier = Modifier.height(8.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            val rates = listOf(5.0, 12.0, 18.0, 28.0)
            rates.forEach { rate ->
                FilterChip(
                    selected = selectedRate == rate,
                    onClick = { selectedRate = rate; result = null },
                    label = { Text("${rate.toInt()}%") },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = MaterialTheme.colorScheme.primary,
                        selectedLabelColor = Color.White
                    )
                )
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Action Buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Button(
                onClick = {
                    val amt = amountInput.toDoubleOrNull() ?: 0.0
                    result = GstLogic.calculate(amt, selectedRate, true)
                    focusManager.clearFocus()
                },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Text("ADD GST +", fontSize = 16.sp, modifier = Modifier.padding(vertical = 8.dp))
            }

            Button(
                onClick = {
                    val amt = amountInput.toDoubleOrNull() ?: 0.0
                    result = GstLogic.calculate(amt, selectedRate, false)
                    focusManager.clearFocus()
                },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF5350)) // Red shade for remove
            ) {
                Text("REMOVE GST -", fontSize = 16.sp, modifier = Modifier.padding(vertical = 8.dp))
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Results
        AnimatedVisibility(visible = result != null) {
            result?.let { res ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        ResultRow("Original", "₹${res.originalAmount.toPlainString()}")
                        ResultRow("GST (${res.rate.toInt()}%)", "₹${res.gstAmount.toPlainString()}", isBold = true, color = Color.Red)
                        Divider(modifier = Modifier.padding(vertical = 8.dp))
                        ResultRow("Total Amount", "₹${res.finalAmount.toPlainString()}", isBold = true, isLarge = true, color = Color(0xFF4CAF50))
                    }
                }
            }
        }
        
        Spacer(modifier = Modifier.weight(1f))
        
        // Ad Placeholder (Bottom)
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp)
                .background(Color.LightGray),
            contentAlignment = Alignment.Center
        ) {
            Text("Ad Banner Placeholder", color = Color.DarkGray)
        }
    }
}

@Composable
fun ResultRow(label: String, value: String, isBold: Boolean = false, isLarge: Boolean = false, color: Color = Color.Unspecified) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            fontSize = if (isLarge) 20.sp else 16.sp,
            fontWeight = if (isBold) FontWeight.Bold else FontWeight.Normal
        )
        Text(
            text = value,
            fontSize = if (isLarge) 24.sp else 18.sp,
            fontWeight = FontWeight.Bold,
            color = if (color != Color.Unspecified) color else MaterialTheme.colorScheme.onSurface
        )
    }
}

@Preview(showBackground = true)
@Composable
fun AppPreview() {
    GSTCalculatorIndiaTheme {
        CalculatorScreen()
    }
}
