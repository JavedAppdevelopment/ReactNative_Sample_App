
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useContentButtonViewModel = () => {
    const router = useRouter();
  const [selectedType, setSelectedType] = useState('Swipe'); // Default selection

  useEffect(() => {
    const loadSavedType = async () => {
      const saved = await AsyncStorage.getItem('content_button_type');
      if (saved) setSelectedType(saved);
    };
    loadSavedType();
  }, []);

  const handleSelect = (type: string) => {
    setSelectedType(type);
  };

  const saveType = async () => {
    await AsyncStorage.setItem('content_button_type', selectedType);
    return true;
  };
   const onClose = () => {
    router.back(); 
  };

  return { selectedType, handleSelect,onClose, saveType };
};