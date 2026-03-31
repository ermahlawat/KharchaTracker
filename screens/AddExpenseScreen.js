import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../utils/supabase';
import { X } from 'lucide-react-native';

const AddExpenseScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [loading, setLoading] = useState(false);

  const saveExpense = async () => {
    if (!amount || !merchant) return;
    setLoading(true);

    const { error } = await supabase
      .from('expenses')
      .insert([
        { 
          amount: parseFloat(amount), 
          merchant: merchant,
          category: 'Shopping', // You can add a selector for this later
          date: new Date().toISOString().split('T')[0] 
        }
      ]);

    setLoading(false);
    if (!error) {
      navigation.goBack();
    } else {
      alert(error.message);
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
  merchantInput: { fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#F2F2F7', paddingVertical: 12, textAlign: 'center' }
});

export default AddExpenseScreen;
