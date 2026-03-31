import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { exportToPDF } from '../utils/ExportService';
import { supabase } from '../utils/supabase';

const SettingsScreen = () => {
  const handleExport = async () => {
    // 1. Fetch data from Supabase
    const { data, error } = await supabase.from('expenses').select('*');
    
    if (data) {
      // 2. Generate and share the PDF
      await exportToPDF(data);
    } else {
      console.error("Export failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={handleExport}>
          <Text style={styles.rowText}>Export Data as PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 20, paddingTop: 60 },
  title: { fontSize: 34, fontWeight: 'bold', marginBottom: 20 },
  section: { backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden' },
  row: { padding: 16, borderBottomWidth: 0.5, borderBottomColor: '#E5E5EA' },
  rowText: { fontSize: 17, color: '#5A80B8', fontWeight: '500' }
});

export default SettingsScreen;
