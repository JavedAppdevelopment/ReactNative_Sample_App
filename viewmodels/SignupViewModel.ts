import { useState } from 'react';
import UserModel from '../models/UserModel';
import { validateField } from '../utils/validation';

export type FormType = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

export type FormField = keyof FormType;

console.log("SignupViewMode...");

export const useSignupViewModel = () => {

 const [form, setForm] = useState<FormType>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [errors, setErrors] = useState<Record<FormField, string>>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  // Handle Change
 const handleChange = (field: FormField, value: string) => {
    // 1. Form state update
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    // 2. Validation logic
    let error = validateField(field, value, updatedForm);
    
    setErrors(prev => {
      let newErrors = { ...prev, [field]: error };
      
      // Password match check
      if (field === 'password' || field === 'confirmPassword') {
        newErrors.confirmPassword = validateField('confirmPassword', updatedForm.confirmPassword, updatedForm);
      }
      return newErrors;
    });
  };

  // Submit
 const handleSignup = () => {
    let newErrors: Record<FormField, string> = { name: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '', gender: '' };
    let isValid = true;

    (Object.keys(form) as FormField[]).forEach((field) => {
      const error = validateField(field, form[field], form);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    return {
      isValid,
      user: isValid ? new UserModel(form.name, form.lastname, form.email, form.phone, form.password, form.confirmPassword, form.gender) : null
    };
  };
  return {
    form, errors, handleChange, handleSignup,
    isPasswordVisible, setIsPasswordVisible,
    isConfirmPasswordVisible, setIsConfirmPasswordVisible
  };
};


