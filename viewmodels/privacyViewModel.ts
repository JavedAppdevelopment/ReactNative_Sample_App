import { useRouter } from 'expo-router';
import { useState } from 'react';

// Policy Data Structure
export interface PolicySection {
  id: string;
  text: string;
  isLink?: boolean;
}

export const usePrivacyViewModel = () => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  const policyData: PolicySection[] = [
    { 
      id: '1', 
      text: "Your privacy is important to us. It is Brainstorming's policy to respect your privacy regarding any information we may collect from you across our " 
    },
    { id: 'link', text: "website", isLink: true }, 
    { id: '2', text: ", and other sites we own and operate." },
    { id: 'divider1', text: "\n\n" }, 

    { 
      id: '3', 
      text: "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used." 
    },
    { id: 'divider2', text: "\n\n" },

    { 
      id: '4', 
      text: "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification." 
    },
    { id: 'divider3', text: "\n\n" },

    { 
      id: '5', 
      text: "We don't share any personally identifying information publicly or with third-parties, except when required to by law." 
    }
  ];

  // 2. Button Action logic
  const handleAccept = () => {
    console.log("Privacy Policy Accepted!");
    router.back(); 
  };

  const handleBack = () => {
    router.back();
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return {
    policyData,
    handleAccept,
    handleBack,
    isChecked,    
    toggleCheckbox
  };
};