import { useHowItWorksViewModel } from '@/viewmodels/howItWorksViewModel';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HowItWorksPage() {
  const { sections, illustration, handleClose } = useHowItWorksViewModel();
  const [visible, setVisible] = useState(true);

  const closeSheet = () => {
    setVisible(false);
    handleClose();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false, presentation: 'transparentModal' }} />

      <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={closeSheet}>
        
        <Pressable style={styles.overlay} onPress={closeSheet}>
          
          <Pressable style={styles.bottomSheet} onPress={(e) => e.stopPropagation()}>
            
            <View style={styles.handle} />

            <ScrollView showsVerticalScrollIndicator={false} >
              <Image source={illustration} style={styles.illustration} resizeMode="contain" />

              {sections.map((section, idx) => (
                <View key={idx} style={styles.section}>
                  <View style={styles.titleRow}>
                    <Text style={styles.sheetTitle}>{section.title}</Text>
                    {section.badge && (
                      <View style={styles.badge}><Text style={styles.badgeText}>{section.badge}</Text></View>
                    )}
                  </View>

                  {section.points.map((point, pIdx) => (
                    <View key={pIdx} style={styles.bulletRow}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletText}>{point.text}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
              <Text style={styles.closeBtnText}>Got It</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end', 
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    minHeight: '80%',
    height: '60%',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 50 
  },
  handle: { 
    width: 20, 
    height: 5, 
    backgroundColor: '#ccc', 
    alignSelf: 'center', 
    borderRadius: 5, 
    marginBottom: 10 
  },
  content: { gap: 15, flex: 1, padding: 5},
  illustration: { alignSelf: 'center', marginBottom: 10 },
  section: { marginBottom: 5 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E2B6D' },
  badge: { backgroundColor: '#1E2B6D', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginLeft: 10 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  bulletRow: { flexDirection: 'row', marginBottom: 6 },
  bulletSymbol: { fontSize: 18, color: '#666', marginRight: 10 },
  bulletText: { fontSize: 14, color: '#444', flex: 1, lineHeight: 20 },
  closeBtn: { 
    backgroundColor: '#1E2B6D', 
    padding: 13, 
    borderRadius: 14, 
    marginTop: 15, 
    alignItems: 'center' 
  },
  closeBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});