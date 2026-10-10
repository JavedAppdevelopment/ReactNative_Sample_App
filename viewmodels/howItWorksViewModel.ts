import { useRouter } from 'expo-router';

export interface BulletPoint {
  text: string;
}

export interface HowItWorksSection {
  title: string;
  badge?: string; // "Coming Soon" mate
  points: BulletPoint[];
}

export const useHowItWorksViewModel = () => {
    const router = useRouter();

    const handleClose = () => {
    router.back(); 
  };

  const illustration = require('../assets/images/how-it-works-icon.png');

  const sections: HowItWorksSection[] = [
    {
      title: "How Offline Translation Work?",
      points: [
        { text: "Input & Output Languages must be downloaded" },
        { text: "Make sure your device has enough available memory." },
        { text: "English has been downloaded as the default language." },
        { text: "Please ensure that you have a fast and stable internet connection." }
      ]
    },
    {
      title: "Camera Translation",
      badge: "Coming Soon",
      points: [
        { text: "Picture must be clear to translate it" },
        { text: "Landscape photo cannot be translate so you must rotate it in portrait mode" },
        { text: "To translate, the photo must contain text in English or a Latin language." }
      ]
    },
    {
      title: "Voice Translation",
      points: [
        { text: "Make sure your microphone is clear and working properly before starting translation." },
        { text: "Speak slowly and clearly in English or any supported language for accurate results." }
      ]
    }
  ];

  return {
    handleClose,
    sections,
    illustration,
  };
};