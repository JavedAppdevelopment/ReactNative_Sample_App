
import Mybutton from '@/components/mybutton';
import { useSignupViewModel } from '@/viewmodels/SignupViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenWidth = Dimensions.get('window').width;

export default function SignupScreen() {
  const router = useRouter();
  // const vm = new SignupViewModel();

  // const [form, setForm] = useState<FormType>(vm.form);
  // const [errors, setErrors] = useState(vm.errors);

  // const handleChange = (field: FormField, value: string) => {
  //   const result = vm.handleChange(field, value);
  //   setForm(result.form);
  //   setErrors(result.errors);
  // };

  // const handleSignup = () => {
  //   const result = vm.handleSignup();
  //   setErrors(result.errors);

  //   if (result.isValid) {
  //     alert('Signup Success ✅');
  //     console.log('User:', result.user);

  //     router.push('/account');
  //   }
  // };

  //  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  //   const togglePasswordVisibility = () => {
  //     setIsPasswordVisible(!isPasswordVisible);
  //   };
  //   const toggleConfirmPasswordVisible = () => {
  //     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  //   }


  const {
    form, errors, handleChange, handleSignup,
    isPasswordVisible, setIsPasswordVisible,
    isConfirmPasswordVisible, setIsConfirmPasswordVisible
  } = useSignupViewModel();

  const onSignupPress = () => {
    const result = handleSignup();
    if (result.isValid) {
      alert('Signup Success ✅');
      router.push('/account');
    }
  };
  const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" translucent={false} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container1}>
            <View style={styles.container}>

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

              <Text style={styles.title} className="text-red-600">Create Account</Text>

              <Text style={styles.titlelogin}>Join Translate App and connect with the world.</Text>

              <View style={styles.InputContainer}>
                <MaterialCommunityIcons name='account' size={24} style={styles.iconStyle} />
                <TextInput
                  placeholder="Enter Your First Name"
                  style={styles.flexInput}
                  value={form.name}
                  onChangeText={(text) => handleChange('name', text)}
                />
              </View>
              {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

              <View style={styles.InputContainer}>
                <MaterialCommunityIcons name='account' size={24} style={styles.iconStyle} />
                <TextInput
                  placeholder="Enter Your Last Name"
                  style={styles.flexInput}
                  value={form.lastname}
                  onChangeText={(text) => handleChange('lastname', text)}
                />
              </View>
              {errors.lastname ? <Text style={styles.error}>{errors.lastname}</Text> : null}

              <View style={styles.InputContainer}>
                <MaterialCommunityIcons name='email' size={24} style={styles.iconStyle} />
                <TextInput
                  placeholder="Email"
                  style={styles.flexInput}
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                />
              </View>
              {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

              <View style={styles.InputContainer}>
                <MaterialCommunityIcons name="phone" size={24} style={styles.iconStyle} />
                <TextInput placeholder="Enter Your Phone Number"
                  style={styles.flexInput}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={form.phone}
                  onChangeText={(text) => handleChange('phone', text)} />
              </View>
              {errors.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}

              <View style={styles.InputContainer}>
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconStyle}>
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? "lock-open" : "lock"}
                    size={24}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  style={styles.flexInput}
                  value={form.password}
                  onChangeText={(text) => handleChange('password', text)}
                />
              </View>
              {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

              <View style={styles.InputContainer}>
                <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.iconStyle}>
                  <MaterialCommunityIcons
                    name={isConfirmPasswordVisible ? "lock-open" : "lock"}
                    size={24}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!isConfirmPasswordVisible}
                  style={styles.flexInput}
                  value={form.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                />
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              ) : null}

              <View style={styles.InputContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={styles.listContainer} 
                  itemContainerStyle={styles.itemContainer}
                  itemTextStyle={styles.itemText}
                  data={genderOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={form.gender}
                  onChange={item => {
                    handleChange('gender', item.value);
                  }}
                  renderLeftIcon={() => (
                    <MaterialCommunityIcons style={styles.iconStyle} name="gender-male-female" size={24} />
                  )}
                  renderRightIcon={() => (
                    <MaterialCommunityIcons style={styles.iconStyle} name="chevron-down" size={24}/>
                  )}
                  // Dropdown open thay tyare selection color
                  activeColor='#F5F5F5'
                />
              </View>
              {errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}

              {/* <TouchableOpacity style={styles.button} onPress={onSignupPress}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity> */}
              <Mybutton title="Create Account" onPress={onSignupPress} />

              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => router.push('/account')}>
                  Login
                </Text>
              </Text>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#7B9ACC',
    justifyContent: 'center',
    padding: 20,
    width: screenWidth > 600 ? 400 : '100%',
    alignSelf: 'center',
  },
  container1: {
    flex: 1,
    // backgroundColor: '#7B9ACC',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 26,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#E5EAF5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  InputContainer: {
    // backgroundColor: '#E5EAF5', 
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1
  },
  titlelogin: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  flexInput: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    paddingVertical: 13,
    paddingLeft: 0,
  },

  iconStyle: {
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#1E4DB7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
  },
  link: {
    color: '#1A237E',
    fontWeight: 'bold',
  },

  dropdown: {
    height: 45,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  listContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemContainer: {
    paddingVertical: 0, 
    marginVertical: 0,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,       
    marginVertical: 0,
    paddingVertical: 0,
  },
});
