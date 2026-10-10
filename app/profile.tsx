import { useProfileViewModel } from '@/viewmodels/profileViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  // Demo mate initial data pass karyo che
  const viewModel = useProfileViewModel();
    const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    // Android mate 'padding' ghani vaar 'height' karta saru chale che jo container flex:1 hoy
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
                   keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 90}>
                    
      <Stack.Screen options={{ 
        headerTitle: "Profile", 
        headerShown: true,
        headerBackTitle: 'Back'
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        //     <MaterialCommunityIcons name="chevron-left" size={30} color="white" />
        //   </TouchableOpacity>
        // )
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image Section */}
        <View style={styles.avatarContainer}>
          <Image source={viewModel.profileImage ? { uri: viewModel.profileImage } : require('@/assets/images/user_group.png')} />
          <TouchableOpacity style={styles.editIconBadge} onPress={viewModel.pickImage}>
            <MaterialCommunityIcons name="pencil-outline" size={16} color="black" />
          </TouchableOpacity>
        </View>

        {/* Input Fields Sections */}
        <View style={styles.form}>
          <InputGroup label="First Name" icon="account" value={viewModel.form.name} 
                      onChangeText={(text: string) => viewModel.handleChange('name', text)} />
          {viewModel.errors.name ? <Text style={styles.errorText}>{viewModel.errors.name}</Text> : null}

          <InputGroup label="Last Name" icon="account" value={viewModel.form.lastname} 
                      onChangeText={(text: string) => viewModel.handleChange('lastname', text)} />
          {viewModel.errors.lastname ? <Text style={styles.errorText}>{viewModel.errors.lastname}</Text> : null}

          <InputGroup label="Email" icon="email"value={viewModel.form.email} 
                      onChangeText={(text: string) => viewModel.handleChange('email', text)} keyboardType="email-address" />
          {viewModel.errors.email ? <Text style={styles.errorText}>{viewModel.errors.email}</Text> : null}

          <InputGroup label="Contact Number" icon="phone" value={viewModel.form.phone} 
                      onChangeText={(text: string) => viewModel.handleChange('phone', text)} maxLength={10} keyboardType="phone-pad" />
          {viewModel.errors.phone ? <Text style={styles.errorText}>{viewModel.errors.phone}</Text> : null}
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.updateBtn} onPress={viewModel.onProfileUpdate}>
          <Text style={styles.updateBtnText}>Update Profile</Text>
        </TouchableOpacity>

      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Reusable Input Component
const InputGroup = ({ label, icon, ...props }: any) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <MaterialCommunityIcons name={icon} size={24} color="black" style={styles.inputIcon} />
      <TextInput style={styles.input} {...props} placeholderTextColor="#999" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 30, alignItems: 'center' },
  
  avatarContainer: { marginBottom: 20, position: 'relative' },
  avatar: { borderRadius: 60, backgroundColor: '#ccc' },
  editIconBadge: { 
    position: 'absolute', bottom: 5, right: 5, 
    backgroundColor: '#ddd', padding: 5, borderRadius: 15,
    borderWidth: 1, borderColor: 'white'
  },

  form: { width: '100%', marginBottom: 15 },
  inputWrapper: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5 },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', 
    borderWidth: 1, borderColor: '#000', borderRadius: 10,
    paddingHorizontal: 10, height: 48
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },

  updateBtn: { 
    backgroundColor: '#1A237E', width: '100%', 
    paddingVertical: 15, borderRadius: 15, 
    alignItems: 'center', marginTop: 8 
  },
  updateBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});