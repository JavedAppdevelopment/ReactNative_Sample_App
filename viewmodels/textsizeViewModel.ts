import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export const useTextSizeViewModel = () => {
  const [fontSize, setFontSize] = useState(80);
  const [selectedFont, setSelectedFont] = useState('Inter'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fontList = ['Inter', 'Inria Sans', 'Roboto'];

  // Save logic
  const handleSave = async () => {
    try {
      const config = JSON.stringify({ fontSize, selectedFont });
      await AsyncStorage.setItem('app_text_config', config);
      alert("Settings Saved!");
    } catch (e) {
      alert("Error saving settings");
    }
  };

  return {
    fontSize,
    setFontSize,
    selectedFont,
    setSelectedFont,
    isDropdownOpen,
    setIsDropdownOpen,
    fontList,
    handleSave
  };
};