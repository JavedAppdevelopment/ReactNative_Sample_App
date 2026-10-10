import { useContactViewModel } from '@/viewmodels/contactViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactUs() {
  const {
    form, 
    errors,
    isModalVisible,
    setIsModalVisible, 
    handleChange, 
    handleSend,
    handleGoBack
  } = useContactViewModel();
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
         <KeyboardAvoidingView
               style={{ flex: 1 }}
               // Android mate 'padding' ghani vaar 'height' karta saru chale che jo container flex:1 hoy
               behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
              keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 100}
          >

        <Stack.Screen options={{ 
        headerTitle: "Contact Us", 
        headerShown: true,
        headerBackTitle: 'Back'
      }} />
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Top Illustration */}
      <View style={styles.imageContainer}>
        <Image source={require('@/assets/images/Man-writing-message.png')} style={styles.mainImage} />
      </View>

      <View style={styles.form}>
        {/* Name Input */}
        <Text style={styles.label}>Name<Text style={{color:'red'}}>*</Text></Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Your Name" 
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Email<Text style={{color: 'red'}}>*</Text></Text>
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name='email' size={24} />
            <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
            />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Contact Number<Text style={{color:'red'}}>*</Text></Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={24} />
          <TextInput 
            style={styles.input} 
            placeholder="Enter Your Contact Number" 
            keyboardType="phone-pad"
            maxLength={10}
            value={form.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>Message<Text style={{color:'red'}}>*</Text></Text>
        <View style={[styles.inputContainer, { height: 75, alignItems: 'flex-start', paddingTop: 3 }]}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter a Message" 
            multiline 
            value={form.message}
            onChangeText={(text) => handleChange('message', text)}
          />
        </View>
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}

        {/* Send Button */}
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
    
    <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            
            <View style={styles.imageWrapper}>
              <Image 
                source={require('@/assets/images/checkbox_active.png')} 
                style={styles.successImage} 
              />
            </View>

            <Text style={styles.thanksText}>Thank you for contacting us!</Text>
            <Text style={styles.subText}>
              Our support team will get back to you shortly.
            </Text>

            <TouchableOpacity style={styles.goBackBtn} onPress={handleGoBack}>
              <Text style={styles.goBackBtnText}>Go Back</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',  padding: 10},
  imageContainer: { alignItems: 'center', marginVertical: 13 },
  mainImage: {resizeMode: 'contain' },
  form: { paddingHorizontal: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, marginTop: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 48
  },
  input: { flex: 1, marginLeft: 5 },
  sendBtn: {
    backgroundColor: '#1A237E',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  sendBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Backdrop effect
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    // Shadow mate
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageWrapper: {
    marginBottom: 18,
  },
  successImage: {
    resizeMode: 'contain',
  },
  thanksText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  goBackBtn: {
    backgroundColor: '#1A237E',
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});   