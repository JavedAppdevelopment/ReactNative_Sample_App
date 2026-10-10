import { useHelpDeskViewModel } from '@/viewmodels/helpdeskViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpDesk() {
  const viewModel = useHelpDeskViewModel();

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
        <Stack.Screen options={{ 
        headerTitle: "Help Desk", 
        headerShown: true,
        headerBackTitle: 'Back'
      }} />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContent}>
        <Image source={require('@/assets/images/help_desk.png')} style={styles.topIcon} />
        <Text style={styles.titleText}>We're here to help you with anything and everything on Translate App</Text>
        <Text style={styles.subText}>At Translate App, we aim to make communication easier for everyone. Whether you want to translate text, voice, or images, we’ve got you covered. Check out the frequently asked questions below for quick help.</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput 
            placeholder="Search Help" 
            style={styles.searchInput}
            value={viewModel.searchQuery}
            onChangeText={viewModel.setSearchQuery}
          />
        </View>

        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
      </View>

      {/* FAQ List (Accordion) */}
      <View style={styles.faqList}>
        {viewModel.filteredFaqs.map((faq) => {
          const isExpanded = viewModel.expandedId === faq.id;
          return (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.questionRow} 
                onPress={() => viewModel.toggleExpand(faq.id)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <MaterialCommunityIcons 
                  name={isExpanded ? "close" : "plus"} 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
              
              {isExpanded && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Bottom Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Still stuck? We're here to help!</Text>
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Send a message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContent: { padding: 20, alignItems: 'center' },
  topIcon: { marginBottom: 15 },
  titleText: { fontSize: 20, fontWeight: '500', textAlign: 'center', marginBottom: 10 },
  subText: { fontSize: 13, color: '#999', textAlign: 'center', marginBottom: 20 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 40,
    alignItems: 'center',
    width: '100%'
  },
  searchInput: { flex: 1, marginLeft: 10 },
  faqTitle: { alignSelf: 'flex-start', marginTop: 15, fontSize: 15, fontWeight: 'bold' },
  faqList: { borderTopWidth: 1, borderColor: '#eee' },
  faqItem: { borderBottomWidth: 1, borderColor: '#eee' },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center'
  },
  questionText: { fontSize: 15, fontWeight: '500', color: '#333' },
  answerContainer: { paddingHorizontal: 20, paddingBottom: 15 },
  answerText: { fontSize: 14, color: '#666', lineHeight: 20 },
  footer: { padding: 20, alignItems: 'center' },
  footerTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  sendBtn: {
    backgroundColor: '#1A237E',
    width: '100%',
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendBtnText: { color: '#fff', fontSize: 17, fontWeight: '600' }
});