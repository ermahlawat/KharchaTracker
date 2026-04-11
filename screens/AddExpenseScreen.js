import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { X } from 'lucide-react-native';

const CATEGORIES = ['Food', 'Groceries', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Bills', 'Other'];

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('Shopping');
  const [loading, setLoading] = useState(false);

  const saveExpense = async () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than zero.');
      return;
    }
    if (!merchant.trim()) {
      Alert.alert('Missing Merchant', 'Please enter a merchant name.');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('expenses')
      .insert([
        {
          amount: parsed,
          merchant: merchant.trim(),
          category,
          date: new Date().toISOString().split('T')[0],
        }
      ]);

    setLoading(false);
    if (!error) {
      navigation.goBack();
    } else {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X color="#000" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveExpense} disabled={loading}>
          <Text style={[styles.saveText, loading && { opacity: 0.5 }]}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          keyboardType="decimal-pad"
          autoFocus
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#E5E5EA"
        />
      </View>

      <TextInput
        style={styles.merchantInput}
        placeholder="Merchant Name (e.g. Starbucks)"
        value={merchant}
        onChangeText={setMerchant}
        placeholderTextColor="#8E8E93"
      />

      <Text style={styles.categoryLabel}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryScrollContent} accessibilityRole="tablist">
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, category === cat && styles.chipSelected]}
            onPress={() => setCategory(cat)}
            accessibilityRole="tab"
            accessibilityState={{ selected: category === cat }}
          >
            <Text style={[styles.chipText, category === cat && styles.chipTextSelected]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  saveText: { fontSize: 17, fontWeight: '600', color: '#5A80B8' },
  inputContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  currencySymbol: { fontSize: 40, fontWeight: '300', color: '#8E8E93', marginRight: 8 },
  amountInput: { fontSize: 60, fontWeight: '700', color: '#000', textAlign: 'center' },
  merchantInput: { fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#F2F2F7', paddingVertical: 12, textAlign: 'center', marginBottom: 24 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: '#8E8E93', textTransform: 'uppercase', marginBottom: 12 },
  categoryScroll: { flexGrow: 0 },
  categoryScrollContent: { gap: 8, paddingRight: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#F2F2F7' },
  chipSelected: { backgroundColor: '#5A80B8' },
  chipText: { fontSize: 15, color: '#3C3C43' },
  chipTextSelected: { color: '#FFF', fontWeight: '600' },
});

export default AddExpenseScreen;
