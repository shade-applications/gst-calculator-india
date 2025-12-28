import { useState, useEffect } from 'react';
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
    Share,
    ScrollView,
    LayoutAnimation,
    UIManager,
    StatusBar as RNStatusBar,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { calculateGst, CalculationResult } from '../utils/gst';

// Enable LayoutAnimation on Android
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState(18);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const rates = [5, 12, 18, 28];
    const quickAmounts = ['100', '500', '1000', '5000'];

    // COLORS
    const THEME = {
        bg: '#0F0F13', // Deep Dark Blue/Black
        card: '#1C1C23', // Slightly lighter
        primary: ['#6C63FF', '#4C6EF5'] as const, // Gradient 1
        success: ['#00C853', '#64DD17'] as const, // Gradient Green
        danger: ['#D50000', '#FF5252'] as const, // Gradient Red
        text: '#FFFFFF',
        textDim: '#8F9BB3',
        border: '#2E3A59',
    };

    const triggerHaptic = (style = Haptics.ImpactFeedbackStyle.Light) => {
        Haptics.impactAsync(style);
    };

    const handleCalculate = (isAddition: boolean) => {
        triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount === 0) return;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const res = calculateGst(numAmount, rate, isAddition);
        setResult(res);
        Keyboard.dismiss();
    };

    const handleClear = () => {
        triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setAmount('');
        setResult(null);
        Keyboard.dismiss();
    };

    const handleCopy = async () => {
        if (!result) return;
        triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
        await Clipboard.setStringAsync(
            `GST Info:\nAmt: ₹${result.originalAmount}\nGST: ₹${result.gstAmount} (${result.rate}%)\nFinal: ₹${result.finalAmount}`
        );
    };

    const handleShare = async () => {
        if (!result) return;
        triggerHaptic();
        try {
            await Share.share({
                message: `GST Calc:\nOriginal: ₹${result.originalAmount}\nGST (${result.rate}%): ₹${result.gstAmount}\nTotal: ₹${result.finalAmount}`,
            });
        } catch (error) { }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[styles.container, { backgroundColor: THEME.bg }]}>
                <StatusBar style="light" />

                {/* HEADER */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>GST India</Text>
                        <Text style={styles.headerSubtitle}>Simple & Secure</Text>
                    </View>
                    <TouchableOpacity onPress={handleClear} style={styles.iconBtn}>
                        <Ionicons name="refresh-circle" size={32} color={THEME.textDim} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    {/* INPUT SECTION */}
                    <View style={styles.inputSection}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.currency}>₹</Text>
                            <TextInput
                                style={styles.mainInput}
                                value={amount}
                                onChangeText={(t) => {
                                    setAmount(t);
                                    if (result) {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                        setResult(null);
                                    }
                                }}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor="#333"
                                selectionColor={THEME.primary[1]}
                            />
                        </View>

                        {/* QUICK CHIPS */}
                        <View style={styles.chipsRow}>
                            {quickAmounts.map((amt) => (
                                <TouchableOpacity
                                    key={amt}
                                    onPress={() => {
                                        triggerHaptic();
                                        setAmount(amt);
                                        if (result) setResult(null);
                                    }}
                                    style={styles.chip}
                                >
                                    <Text style={styles.chipText}>+{amt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* RATE SELECTOR */}
                    <View style={styles.section}>
                        <Text style={styles.label}>TAX SLAB</Text>
                        <View style={[styles.rateContainer, { borderColor: THEME.border }]}>
                            {rates.map((r) => {
                                const isSelected = rate === r;
                                return (
                                    <TouchableOpacity
                                        key={r}
                                        style={[styles.rateBtn, isSelected && { backgroundColor: THEME.card }]}
                                        onPress={() => {
                                            triggerHaptic();
                                            setRate(r);
                                            if (result) setResult(null);
                                        }}
                                    >
                                        <Text style={[styles.rateText, isSelected && { color: THEME.primary[1], fontWeight: 'bold' }]}>
                                            {r}%
                                        </Text>
                                        {isSelected && <View style={styles.rateDot} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* ACTION BUTTONS */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.actionBtnWrapper}
                            activeOpacity={0.8}
                            onPress={() => handleCalculate(true)}
                        >
                            <LinearGradient
                                colors={THEME.success}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientBtn}
                            >
                                <Ionicons name="add-circle-outline" size={24} color="#FFF" style={{ marginRight: 8 }} />
                                <Text style={styles.btnText}>Add GST</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionBtnWrapper}
                            activeOpacity={0.8}
                            onPress={() => handleCalculate(false)}
                        >
                            <LinearGradient
                                colors={THEME.danger}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientBtn}
                            >
                                <Ionicons name="remove-circle-outline" size={24} color="#FFF" style={{ marginRight: 8 }} />
                                <Text style={styles.btnText}>Remove GST</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* RESULT CARD */}
                    {result && (
                        <View style={styles.resultCard}>
                            <LinearGradient
                                colors={[THEME.card, '#252530']}
                                style={styles.resultGradient}
                            >
                                <View style={styles.resHeader}>
                                    <Text style={styles.resTitle}>Calculation</Text>
                                    <View style={styles.resIcons}>
                                        <TouchableOpacity onPress={handleCopy} style={{ marginRight: 16 }}>
                                            <Ionicons name="copy-outline" size={20} color={THEME.textDim} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleShare}>
                                            <Ionicons name="share-social-outline" size={20} color={THEME.textDim} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.resRow}>
                                    <Text style={styles.resLabel}>Base Amount</Text>
                                    <Text style={styles.resValue}>₹{result.originalAmount.toLocaleString('en-IN')}</Text>
                                </View>

                                <View style={styles.resRow}>
                                    <Text style={[styles.resLabel, { color: result.isAddition ? THEME.success[1] : THEME.danger[1] }]}>
                                        GST ({result.rate}%)
                                    </Text>
                                    <Text style={[styles.resValue, { color: result.isAddition ? THEME.success[1] : THEME.danger[1] }]}>
                                        {result.isAddition ? '+' : '-'} ₹{result.gstAmount.toLocaleString('en-IN')}
                                    </Text>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.resRow}>
                                    <Text style={styles.resTotalLabel}>Total Pay</Text>
                                    <Text style={styles.resTotalValue}>₹{result.finalAmount.toLocaleString('en-IN')}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    )}

                </ScrollView>

                {/* AD PLACEHOLDER */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Ad Space (Premium Layout)</Text>
                </View>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#8F9BB3',
        fontWeight: '500',
        marginTop: 2,
    },
    iconBtn: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    inputSection: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    currency: {
        fontSize: 40,
        color: '#444',
        marginRight: 8,
        fontWeight: '300',
    },
    mainInput: {
        fontSize: 56,
        color: '#FFF',
        fontWeight: '700',
        minWidth: 100,
        textAlign: 'center',
    },
    chipsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    chip: {
        backgroundColor: '#1E1E24',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2E3A59',
    },
    chipText: {
        color: '#A0A0A0',
        fontSize: 13,
        fontWeight: '600',
    },
    section: {
        marginBottom: 24,
    },
    label: {
        color: '#666',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    rateContainer: {
        flexDirection: 'row',
        backgroundColor: '#15151A',
        borderRadius: 16,
        borderWidth: 1,
        padding: 4,
    },
    rateBtn: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        position: 'relative',
    },
    rateText: {
        color: '#8F9BB3',
        fontSize: 15,
        fontWeight: '600',
    },
    rateDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#4C6EF5',
        marginTop: 4,
        position: 'absolute',
        bottom: 6,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 30,
    },
    actionBtnWrapper: {
        flex: 1,
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    gradientBtn: {
        flexDirection: 'row',
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    btnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    resultCard: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2E3A59',
    },
    resultGradient: {
        padding: 24,
    },
    resHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    resTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    resIcons: {
        flexDirection: 'row',
    },
    resRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    resLabel: {
        color: '#8F9BB3',
        fontSize: 15,
    },
    resValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#2E3A59',
        marginVertical: 16,
        opacity: 0.5,
    },
    resTotalLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    resTotalValue: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: '800',
    },
    footer: {
        backgroundColor: '#000',
        padding: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    footerText: {
        color: '#333',
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    }
});
