import { useTextSizeViewModel } from '@/viewmodels/textsizeViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // Slider mate aa install karvu padse
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TextSizeScreen() {
  const viewModel = useTextSizeViewModel();

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
       <Stack.Screen options={{ 
        headerTitle: "Text Size", 
        headerShown: true,
        headerBackTitle: 'Back'
      }} />
    <ScrollView style={styles.container}>
      <View style={styles.previewBox}>
        <Text style={[
          styles.previewText, 
          { fontSize: viewModel.fontSize * 0.5, fontFamily: viewModel.selectedFont }
        ]}>
          Hello
        </Text>
      </View>

      {/* 2. Font Size Slider */}
      <View style={styles.row}>
        <Text style={styles.label}>Font Size</Text>
        <Slider
          style={styles.slider}
          minimumValue={40}
          maximumValue={120}
          value={viewModel.fontSize}
          onValueChange={(val) => viewModel.setFontSize(val)}
          minimumTrackTintColor="#1A237E"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#1A237E"
        />
        <Text style={styles.percentage}>{Math.round(viewModel.fontSize)}%</Text>
      </View>

      {/* 3. Fonts Dropdown */}
      <View style={styles.row}>
        <Text style={styles.label}>Fonts</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdownHeader} 
            onPress={() => viewModel.setIsDropdownOpen(!viewModel.isDropdownOpen)}
          >
            <Text style={styles.dropdownTitle}>{viewModel.selectedFont}</Text>
            <MaterialCommunityIcons 
              name={viewModel.isDropdownOpen ? "chevron-up" : "chevron-down"} 
              size={24} 
            />
          </TouchableOpacity>

          {viewModel.isDropdownOpen && (
            <View style={styles.dropdownList}>
              {viewModel.fontList.map((font) => (
                <TouchableOpacity 
                  key={font} 
                  style={styles.fontItem}
                  onPress={() => {
                    viewModel.setSelectedFont(font);
                    viewModel.setIsDropdownOpen(false);
                  }}
                >
                  <Text style={{ fontFamily: font }}>{font}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={viewModel.handleSave}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  previewBox: {
    height: 110,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 40
  },
  previewText: { color: '#000' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  label: { width: 80, fontSize: 16, fontWeight: '500' },
  slider: { flex: 1, height: 40 },
  percentage: { width: 40, textAlign: 'right', fontSize: 12, },
  dropdownContainer: { flex: 1, borderWidth: 1, borderColor: '#333', borderRadius: 5 },
  dropdownHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10,
    paddingVertical: 7, 
    alignItems: 'center' 
  },
  dropdownTitle: { fontSize: 16 },
  dropdownList: { borderTopWidth: 1, borderColor: '#eee' },
  fontItem: { padding: 10, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  saveBtn: {
    backgroundColor: '#1A237E',
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});