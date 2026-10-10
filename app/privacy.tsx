import { PolicySection, usePrivacyViewModel } from '@/viewmodels/privacyViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const { policyData, handleAccept, handleBack,isChecked,    
    toggleCheckbox } = usePrivacyViewModel();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
    {/* <View style={styles.container}> */}
      {/* 1. Custom Header Configuration */}
      <Stack.Screen 
        options={{
          title: 'Privacy Policy',
          headerShown: true,
          headerBackTitle: 'Back'
        //   headerStyle: { backgroundColor: '#1E2B6D' }, // Screenshot Dark Blue
        //   headerTintColor: 'white',
        //   headerTitleAlign: 'center',
        //   headerLeft: () => (
        //     <TouchableOpacity onPress={handleBack} style={{marginLeft: 10}}>
        //       <MaterialCommunityIcons name="chevron-left" size={30} color="white" />
        //     </TouchableOpacity>
        //   ),
        }} 
      />

      {/* 2. Policy Text Content (Scrollable) */}
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.baseText}>
          {policyData.map((item: PolicySection) => (
            <Text 
              key={item.id} 
              style={item.isLink ? styles.linkText : styles.bodyText}
            >
              {item.text}
            </Text>
          ))}
        </Text>
        {/* --- Checkbox Section --- */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={toggleCheckbox}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons 
            name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"} 
            size={24} 
            color={isChecked ? "#1E2B6D" : "#666"} 
          />
          <Text style={styles.checkboxText}>
            I have read and agree to the privacy policy
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 3. Bottom Button */}
      <TouchableOpacity style={[styles.button, !isChecked && styles.buttonDisabled]} 
      onPress={handleAccept}
      disabled={!isChecked}>
        <Text style={styles.buttonText}>I've agree with this</Text>
      </TouchableOpacity>
    {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  
  contentContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 30, 
    paddingBottom: 100 // Button mate jagya
  },
  
  baseText: { 
    lineHeight: 22 
  },
  bodyText: { 
    fontSize: 15, 
    color: '#333333', 
    fontStyle: 'italic', 
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' 
  },
  linkText: { 
    color: '#3366CC', // Blue color for link
    textDecorationLine: 'underline', 
    fontStyle: 'normal' // Link italic na hovi joie
  },
  
  button: { 
    position: 'absolute', 
    bottom: 50, 
    left: 25, 
    right: 25, 
    backgroundColor: '#1E2B6D',
    paddingVertical: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    shadowColor: '#000', // Small shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold',
    fontStyle: 'italic'
  },


  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0', // Grey color jyare disable hoy
    opacity: 0.9,
  },
});