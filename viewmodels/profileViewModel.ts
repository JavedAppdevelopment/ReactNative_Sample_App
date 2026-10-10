import { validateField } from '@/utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';


export type FormType = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
};
export type FormField = keyof FormType;

export const useProfileViewModel = () => {

  const params = useLocalSearchParams();
  const router = useRouter();

  // Initial data Settings page mathi aavse
 const [name, setFirstName] = useState((params.name as string) || '');
  const [lastname, setLastName] = useState((params.lastname as string) || '');
  const [email, setEmail] = useState((params.email as string) || '');
  const [phone, setPhone] = useState((params.phone as string) || '');
  const [profileImage, setProfileImage] = useState(params.image as string || '');

  // const handleUpdate = () => {
  //   // Ahiya update logic
  //   console.log("Updated Data:", { firstName, lastName, email, phone });
    
  //   // Pachha jata pehla tame ahiya local storage (AsyncStorage) 
  //   // ma save kari sako jo tame permanent save rakhvu hoy to.
    
  //   alert("Profile Updated Successfully!");
  //   router.back(); // Update thaya pachi pacha Settings ma jata raho
  // };

  const handleUpdate = async () => {
    try {
        // const updatedUser = { firstName, lastName, email, phone, profileImage };
        const updatedUser = { 
            ...form,        
            image: profileImage 
        };
        
        // 1. Data ne JSON string banavi ne save karo
        await AsyncStorage.setItem('user_profile', JSON.stringify(updatedUser));
        
        console.log("Data Saved Locally:", updatedUser);
        alert("Profile Updated Successfully!");
        
        router.back(); 
    } catch (error) {
        alert("Error saving data");
    }
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images', 
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    setProfileImage(result.assets[0].uri);
  }
};

  const [form, setForm] = useState<FormType>({
    name: (params.name as string) || '', 
    lastname: (params.lastname as string) || '',
    email: (params.email as string) || '',
    phone: (params.phone as string) || '',
});

  const [errors, setErrors] = useState<Record<FormField, string>>({
    name: '',
    lastname: '',
    email: '',
    phone: ''
  });

  // 4. Handle Change (Same Signup Logic)
  const handleChange = (field: FormField, value: string) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    // Real-time Validation
    let error = validateField(field, value, updatedForm);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // 5. Handle Update (Jem handleSignup hatu tem)
  const onProfileUpdate = () => {
    let newErrors: Record<FormField, string> = { name: '', lastname: '', email: '', phone: '' };
    let isValid = true;

    (Object.keys(form) as FormField[]).forEach((field) => {
      const error = validateField(field, form[field], form);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
     handleUpdate();
    }
  };

  return {
    name, setFirstName,
    lastname, setLastName,
    email, setEmail,
    phone, setPhone,
    profileImage, setProfileImage,
    form, setForm,
    errors, setErrors,
    handleUpdate,
    pickImage,
    onProfileUpdate,
    handleChange
  };
};