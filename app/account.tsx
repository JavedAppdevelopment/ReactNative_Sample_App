
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Mybutton from '@/components/mybutton';
import { ThemedView } from '@/components/themed-view';
import { useLoginViewModel } from '@/viewmodels/LoginViewModel';

const screenWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
  const router = useRouter();
//   const vm = new LoginViewModel();

//   const [form, setForm] = useState<LoginFormType>(vm.form);
//   const [errors, setErrors] = useState(vm.errors);

//   useEffect(() => {
//   console.log("Aa code automatic chalse!");

//   return () => {
//     // Cleanup logic (Optional) - Jyare component bandh thay tyare
//   };
// }, []);

//   // Real-time validation
//   const handleChange = (field: LoginField, value: string) => {
//     const result = vm.handleChange(field, value);
//     setForm(result.form);
//     setErrors(result.errors);
//   };

//   // Login
//   const handleLogin = () => {
//     const result = vm.handleLogin();
//     setErrors(result.errors);

//     if (result.isValid) {
//       alert('Login Success ✅');
//       router.push('/');
//     }
//   };

//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

  // Custom Hook mathi badhu access karo
  
  const { 
    form, errors, isPasswordVisible, isRemembered,
    CheckIsRemembered,handleChange, handleLogin, togglePasswordVisibility, resetForm
  } = useLoginViewModel();

  const onLoginPress = () => {
    const result = handleLogin();
    if (result.isValid) {
      resetForm();
      alert('Login Success ✅');
      router.replace('/'); // replace vaprvathi user back nahi jai shake
    }
  };
  return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }} >

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
     <ThemedView style={styles.container1}>
      <ThemedView style={styles.container}>
         <Stack.Screen
                options={{
                  // headerStyle: { backgroundColor: '#1A237E' },
                  // headerTintColor: '#FFFFFF',
                  // title: 'Signup',
                  // headerBackTitle: 'Back',
                  // headerTitleAlign: 'center',
                   headerShown: false,
                }}
              />  

        <Image source={require('@/assets/images/girl-base.png')}
        style={styles.imagelogin}/>
    
        <Text style={styles.title}>Welcome Back!</Text>

        <Text style={styles.titlelogin}>Login to continue your translations.</Text>

        {/* <TextInput
          placeholder="Email or Username"
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null} */}

        <View style={styles.passwordInputContainer}>
          <TextInput placeholder="Enter Your Phone Number"
          style={styles.flexInput}
          keyboardType="phone-pad"
          maxLength={10}
          value={form.phone}
          onChangeText={(text)=> handleChange('phone', text)}/>
          <MaterialCommunityIcons name="phone" size={24} style={styles.iconStyle}/>
        </View>
        {errors.phone ? <Text style={styles.error}>{errors.phone}</Text>: null}

        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Enter Your Password"
            secureTextEntry={!isPasswordVisible}
            style={styles.flexInput}
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconStyle}>
            <MaterialCommunityIcons style={{color: '#000000'}}
              name={isPasswordVisible ? "lock-open" : "lock"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

        <TouchableOpacity onPress={CheckIsRemembered} activeOpacity={0.7}
          style={styles.checkboxContainer}>
          <MaterialCommunityIcons 
          name={isRemembered ? "checkbox-marked" : "checkbox-blank-outline"} 
          size={22} 
          color={isRemembered ? "#1E2B6D" : "#666"} />
          <Text style={styles.label}>Remember Me</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.loginBtn} onPress={onLoginPress}>
          <ThemedText style={styles.loginText}>LOGIN</ThemedText>
        </TouchableOpacity> */}
        <Mybutton title={"LOGIN"} onPress={onLoginPress}/>

        <Text style={styles.forgotLink}>Forgot Password?</Text>
        <Text style={styles.signupText}>
          Don’t have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => router.push('/signup')}>
            Sign up
          </Text>
        </Text>

      </ThemedView>
     </ThemedView>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 40,
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
    gap: 15,
    width: screenWidth > 600 ? 400 : '100%',
    alignSelf: 'center',
  },
  imagelogin:{
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1, 
  },
  container1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    width: screenWidth > 600 ? 400 : '100%',
    alignSelf: 'center'
  },

  title: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  titlelogin:{
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    // backgroundColor: '#E5EAF5',
    borderRadius: 10,
    padding: 13,
    marginBottom: 15,
    borderWidth: 1
  },
  passwordInputContainer: {
    // backgroundColor: '#E5EAF5', 
    borderRadius: 10, 
    marginBottom: 15,        
    flexDirection: 'row',   
    alignItems: 'center',    
    overflow: 'hidden',  
    borderWidth: 1,     
  },

  flexInput: {
    flex: 1,                 
    color: '#000000',
    fontSize: 16,
    paddingVertical: 13,   
    paddingLeft: 15,  
    paddingRight: 10, 
  },

  iconStyle: {
    paddingHorizontal: 15,     
    justifyContent: 'center',
    color: '#000000'  
  },

  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  checkboxContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    width: '100%',
    marginBottom: 13,
  },
  label:{
    marginLeft: 8,
    fontSize: 13,
    color: '#333',
  },
  loginBtn: {
    backgroundColor: '#1E4DB7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  socialBtn: {
    backgroundColor: '#E5EAF5',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  fbText: {
    color: '#3b5998',
    fontWeight: 'bold',
  },

  googleText: {
    color: '#DB4437',
    fontWeight: 'bold',
  },

  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
  },

  signupLink: {
    color: '#1A237E',
    fontWeight: 'bold',
  },
  forgotLink:{
    color: '#1A237E',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 9,
  }
});