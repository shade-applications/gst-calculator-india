import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
    Platform,
} from 'react-native';
import { calculateGst, CalculationResult } from '../utils/gst';

export default function App() {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState(18); // Default 18%
    const [result, setResult] = useState<CalculationResult | null>(null);

    const rates = [5, 12, 18, 28];
    const quickAmounts = ['100', '500', '1000'];

    const handleCalculate = (isAddition: boolean) => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return;

        const res = calculateGst(numAmount, rate, isAddition);
        setResult(res);
        Keyboard.dismiss();
    };

    const setQuickAmount = (val: string) => {
        setAmount(val);
        setResult(null);
    };

    const selectRate = (r: number) => {
        setRate(r);
        setResult(null);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerTitle}>GST Calculator</Text>

                    {/* Amount Input */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Enter Amount (₹)</Text>
                        <TextInput
                            style={styles.input}
                            value={amount}
                            onChangeText={(t) => {
                                setAmount(t);
                                setResult(null);
                            }}
                            keyboardType="numeric"
                            placeholder="0.00"
                            placeholderTextColor="#ccc"
                        />
                    </View>

                    {/* Quick Amounts */}
                    <View style={styles.quickRow}>
                        {quickAmounts.map((amt) => (
                            <TouchableOpacity
                                key={amt}
                                style={styles.quickBtn}
                                onPress={() => setQuickAmount(amt)}
                            >
                                <Text style={styles.quickBtnText}>₹{amt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Rate Selection */}
                    <Text style={styles.label}>GST Rate</Text>
                    <View style={styles.rateRow}>
                        {rates.map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={[
                                    styles.rateBtn,
                                    rate === r && styles.rateBtnSelected,
                                ]}
                                onPress={() => selectRate(r)}
                            >
                                <Text
                                    style={[
                                        styles.rateBtnText,
                                        rate === r && styles.rateBtnTextSelected,
                                    ]}
                                >
                                    {r}%
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.addBtn]}
                            onPress={() => handleCalculate(true)}
                        >
                            <Text style={styles.actionBtnText}>ADD GST +</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionBtn, styles.removeBtn]}
                            onPress={() => handleCalculate(false)}
                        >
                            <Text style={styles.actionBtnText}>REMOVE GST -</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Result Card */}
                    {result && (
                        <View style={styles.resultCard}>
                            <View style={styles.resultRow}>
                                <Text style={styles.resultLabel}>Original</Text>
                                <Text style={styles.resultValue}>₹{result.originalAmount}</Text>
                            </View>
                            <View style={styles.resultRow}>
                                <Text style={[styles.resultLabel, { color: '#EF5350' }]}>
                                    GST ({result.rate}%)
                                </Text>
                                <Text style={[styles.resultValue, { color: '#EF5350' }]}>
                                    ₹{result.gstAmount}
                                </Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.resultRow}>
                                <Text style={styles.resultTotalLabel}>Total Amount</Text>
                                <Text style={styles.resultTotalValue}>₹{result.finalAmount}</Text>
                            </View>
                        </View>
                    )}

                    <View style={{ flex: 1 }} />

                    {/* Ad Placeholder */}
                    <View style={styles.adPlaceholder}>
                        <Text style={styles.adText}>Ad Banner Placeholder</Text>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#6200EE', // Primary
        marginBottom: 32,
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
        alignSelf: 'flex-start',
        width: '100%',
    },
    input: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        fontSize: 28,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#FAFAFA',
    },
    quickRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    quickBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    quickBtnText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    rateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 32,
    },
    rateBtn: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    rateBtnSelected: {
        backgroundColor: '#6200EE',
    },
    rateBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    rateBtnTextSelected: {
        color: '#FFF',
    },
    actionRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 32,
    },
    actionBtn: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addBtn: {
        backgroundColor: '#6200EE',
    },
    removeBtn: {
        backgroundColor: '#EF5350',
    },
    actionBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'Bold',
    },
    resultCard: {
        width: '100%',
        padding: 20,
        backgroundColor: '#F3E5F5', // Light purple tint
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    resultLabel: {
        fontSize: 16,
        color: '#444',
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#DDD',
        marginVertical: 8,
    },
    resultTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    resultTotalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    adPlaceholder: {
        width: '100%',
        height: 50,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adText: {
        color: '#757575',
        fontSize: 12
    }
});
