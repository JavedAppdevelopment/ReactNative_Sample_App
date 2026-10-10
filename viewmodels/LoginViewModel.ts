import { useState } from 'react';
import { validateField } from '../utils/validation';

export type LoginFormType = {
  // email: string;
  password: string;
  phone: string;
};

export type LoginField = keyof LoginFormType;

export const useLoginViewModel = () => {

  const [form, setForm] = useState<LoginFormType>({
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<LoginField, string>>({
    password: '',
    phone: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRemembered, setIsRemembered]= useState(false);

  const resetForm = () => {
    setForm({ password: '', phone: ''}); 
    setErrors({ password: '', phone: '' }); 
  };

  // Real-time change
  const handleChange = (field: LoginField, value: string) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);

    const error = validateField(field, value, updatedForm);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Submit
  const handleLogin = () => {
    let newErrors: Record<LoginField, string> = { password: '', phone: ''};
    let isValid = true;

    (Object.keys(form) as LoginField[]).forEach((field) => {
      const error = validateField(field, form[field as LoginField], form);
      if (error) {
        newErrors[field as LoginField] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, resetForm };
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const CheckIsRemembered = () => setIsRemembered(!isRemembered);
  console

  return {
    form,
    errors,
    isPasswordVisible,
    isRemembered,
    CheckIsRemembered,
    resetForm,
    handleChange,
    handleLogin,
    togglePasswordVisibility
  };
};