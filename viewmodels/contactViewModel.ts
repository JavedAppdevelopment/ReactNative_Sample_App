import { router } from 'expo-router';
import { useState } from 'react';
import { validateField } from '../utils/validation';

export type ContactFormType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const useContactViewModel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form, setForm] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    // Validation
    const error = validateField(field, value, updatedForm);
    setErrors((prev: any) => ({ ...prev, [field]: error }));
  };

  const handleSend = () => {
    // Badha field check karo
    let newErrors: any = {};
    let isValid = true;

    (Object.keys(form) as (keyof ContactFormType)[]).forEach((field) => {
      // Tamara validation logic pramane error melvo
      const error = validateField(field, form[field], form);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);

    if (isValid) {
      console.log("Contact Data:", form);
      setIsModalVisible(true);
      // Ahiya API call kari sako
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleGoBack = () =>{
    router.back();
  }

  return { form, errors, isModalVisible,setIsModalVisible, handleChange, handleSend, handleGoBack };
};