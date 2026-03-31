import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>October</Text>
        
        {/* The Hero Amount */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroAmount}>$4,250.15</Text>
          <Text style={styles.subtext}>Remaining: $1,100.00</Text>
        </View>

        {/* Recent Transactions Placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={styles.row}>
            <View style={styles.categoryIcon} />
            <View style={{flex: 1}}>
              <Text style={styles.merchant}>Whole Foods</Text>
              <Text style={styles.meta}>Groceries • Today</Text>
            </View>
            <Text style={styles.amount}>-$124.50</Text>
          </View>
        </View>
      </ScrollView>

      {/* Understated Primary Action */}
      <TouchableOpacity style={styles.fab}>
        <Plus color="#FFF" size={24} />
        <Text style={styles.fabText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingTop: 60 },
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
  fab: { 
    position: 'absolute', bottom: 40, alignSelf: 'center',
    backgroundColor: '#5A80B8', flexDirection: 'row', 
    paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30,
    alignItems: 'center', elevation: 4, shadowOpacity: 0.1
  },
  fabText: { color: '#FFF', fontWeight: '600', marginLeft: 8 }
});

export default HomeScreen;
