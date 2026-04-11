import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';
import { supabase } from '../utils/supabase';

const HomeScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
      .limit(20);

    if (data) {
      setExpenses(data);
      setTotal(data.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0));
    } else {
      console.error('Failed to fetch expenses:', error);
    }
    setLoading(false);
  }, []);

  useFocusEffect(fetchExpenses);

  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>{currentMonth}</Text>

        <View style={styles.heroContainer}>
          <Text style={styles.heroAmount}>${total.toFixed(2)}</Text>
          <Text style={styles.subtext}>Total Expenses</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          {loading ? (
            <ActivityIndicator color="#5A80B8" style={{ marginVertical: 12 }} />
          ) : expenses.length === 0 ? (
            <Text style={styles.emptyText}>No expenses yet. Tap + to add one.</Text>
          ) : (
            expenses.map((expense) => (
              <View key={expense.id} style={[styles.row, { marginBottom: 12 }]}>
                <View style={styles.categoryIcon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.merchant}>{expense.merchant}</Text>
                  <Text style={styles.meta}>{expense.category} • {expense.date}</Text>
                </View>
                <Text style={styles.amount}>-${(parseFloat(expense.amount) || 0).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddExpense')}>
        <Plus color="#FFF" size={24} />
        <Text style={styles.fabText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  header: { fontSize: 17, fontWeight: '600', textAlign: 'center', marginBottom: 40, color: '#8E8E93' },
  heroContainer: { alignItems: 'center', marginBottom: 40 },
  heroAmount: { fontSize: 48, fontWeight: '800', letterSpacing: -1 },
  subtext: { fontSize: 15, color: '#8E8E93', marginTop: 8 },
  card: { backgroundColor: '#F2F2F7', borderRadius: 20, padding: 20 },
  cardTitle: { fontSize: 13, fontWeight: '600', color: '#8E8E93', marginBottom: 16, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center' },
  categoryIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E5EA', marginRight: 12 },
  merchant: { fontSize: 17, fontWeight: '600' },
  meta: { fontSize: 14, color: '#8E8E93' },
  amount: { fontSize: 17, fontWeight: '600' },
  emptyText: { fontSize: 15, color: '#8E8E93', textAlign: 'center', paddingVertical: 12 },
  fab: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
    backgroundColor: '#5A80B8', flexDirection: 'row',
    paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30,
    alignItems: 'center', elevation: 4, shadowOpacity: 0.1,
  },
  fabText: { color: '#FFF', fontWeight: '600', marginLeft: 8 },
});

export default HomeScreen;
