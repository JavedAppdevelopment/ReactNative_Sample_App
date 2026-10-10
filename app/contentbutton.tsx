import { useContentButtonViewModel } from '@/viewmodels/contentbuttonViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContentButtonModal() {
  const { selectedType, handleSelect,onClose, saveType } = useContentButtonViewModel();
  const [visible, setVisible] = useState(true);

  const onApply = async () => {
    await saveType();
    onClose();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
       
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <Stack.Screen options={{ headerShown: false, presentation: 'transparentModal' }} />
      {/* Background Overlay - Jethi pachal nu page dekhay */}
      <Pressable style={styles.overlay} onPress={onClose}>
        
        {/* Bottom Sheet Content */}
        <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
          
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Content Button</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Radio Buttons Row */}
          <View style={styles.radioGroup}>
            <TouchableOpacity style={styles.radioItem} onPress={() => handleSelect('Swipe')}>
              <MaterialCommunityIcons 
                name={selectedType === 'Swipe' ? "radiobox-marked" : "radiobox-blank"} 
                size={24} color="#1A237E" 
              />
              <Text style={styles.radioLabel}>Swipe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioItem} onPress={() => handleSelect('Bubble')}>
              <MaterialCommunityIcons 
                name={selectedType === 'Bubble' ? "radiobox-marked" : "radiobox-blank"} 
                size={24} color="#1A237E" 
              />
              <Text style={styles.radioLabel}>Bubble</Text>
            </TouchableOpacity>
          </View>

          {/* Preview Section */}
          <Text style={styles.previewLabel}>Preview</Text>
          <View style={styles.previewContainer}>
            {selectedType === 'Swipe' ? (
              /* --- SWIPE DESIGN (2 alag capsules) --- */
              <View style={styles.swipeWrapper}>
                <View style={styles.iconCapsule}>
                  <MaterialCommunityIcons name="bookmark-outline" size={22} color="white" />
                </View>
                <View style={styles.iconCapsule}>
                  <MaterialCommunityIcons name="volume-high" size={22} color="white" />
                </View>
                <View style={styles.textBox}>
                  <Text style={styles.langHeader}>English</Text>
                  <Text style={styles.langSub}>Lorem ipsum dolor sit amet consectetuer ?</Text>
                  <Text style={[styles.langHeader, {marginTop: 5}]}>Spanish</Text>
                  <Text style={styles.langSub}>adipiscingeliala sed diam ?</Text>
                </View>
              </View>
            ) : (
              /* --- BUBBLE DESIGN (Single box with left bar) --- */
              <View style={styles.bubbleWrapper}>
                <View style={styles.leftBlueBar}>
                  <MaterialCommunityIcons name="bookmark-outline" size={22} color="white" />
                  <MaterialCommunityIcons name="volume-high" size={22} color="white" style={{marginTop: 30}} />
                </View>
                <View style={styles.bubbleTextContent}>
                  <Text style={[styles.langHeader, {textAlign: 'right'}]}>Spanish</Text>
                  <Text style={[styles.langSub, {textAlign: 'right'}]}>Lorem ipsum dolor sit</Text>
                  <Text style={[styles.langHeader, {textAlign: 'right', marginTop: 10}]}>English</Text>
                  <Text style={[styles.langSub, {textAlign: 'right'}]}>Lorem ipsum dolor sit amet consectetuer</Text>
                </View>
              </View>
            )}
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>

        </Pressable>
      </Pressable>
    </Modal>
 </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'flex-end', 
  },
  bottomSheet: {
    backgroundColor: '#F5F6F8', // Light grey modal background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 50 
  },
//   modalHeader: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   modalTitle: { fontSize: 18,  alignItems: 'center', fontWeight: 'bold', color: '#1A237E' },

  modalHeader: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative' 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1A237E',
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 0, 
  },

  radioGroup: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 20
  },
  radioItem: { flexDirection: 'row', alignItems: 'center' },
  radioLabel: { fontSize: 15, marginLeft: 8, color: '#333' },
  previewLabel: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#555' },
  previewContainer: {
    borderWidth: 1,
    borderColor: '#1A237E',
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'white',
    minHeight: 120,
    justifyContent: 'center',
    marginBottom: 20
  },
  // Swipe Design Styles
  swipeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCapsule: {
    backgroundColor: '#1A237E',
    width: 30,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  textBox: {
    flex: 1,
    borderRadius: 15,
    padding: 12,
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Bubble Design Styles
  bubbleWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 100,
    // Shadow for iOS/Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftBlueBar: {
    backgroundColor: '#1A237E',
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  bubbleTextContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },

  // Common Text Styles
  langHeader: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: '#000' 
  },
  langSub: { 
    fontSize: 11, 
    color: '#444', 
    lineHeight: 14 
  },
  
  applyBtn: { 
    backgroundColor: '#1A237E', 
    padding: 14, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  applyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
});