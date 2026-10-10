import { useRouter } from 'expo-router';

// Data Structures
export interface BulletPoint {
  id: string;
  text: string;
}

export interface AboutData {
  illustration: any; // Image source
  mainTitle: string;
  paragraphs: string[];
  sections: {
    title: string;
    content: string;
  }[];
  featuresTitle: string;
  features: BulletPoint[];
}

export const useAboutViewModel = () => {
  const router = useRouter();

  // 1. About Us Page Data
  const aboutData: AboutData = {

    illustration: require('../assets/images/about_us.png'), 
    
    mainTitle: "Breaking language barriers, one word at a time.",
    
    paragraphs: [
      "Translate App is designed to help people communicate effortlessly across languages. We believe understanding should never be limited by words — our goal is to make translation simple, fast, and accurate for everyone.",
      "With advanced AI translation technology, you can easily translate text, voice, and even images. Whether you’re traveling, learning a new language, or chatting with someone from another country, Translate App is your perfect companion."
    ],
    
    sections: [
      {
        title: "Our Mission",
        content: "To make communication seamless for everyone, no matter what language they speak."
      },
      {
        title: "Our Vision",
        content: "To build a world where language is never a barrier between people."
      }
    ],
    
    featuresTitle: "Features at a Glance",
    features: [
      { id: '1', text: "Instant text translation" },
      { id: '2', text: "Voice and image translation" },
      { id: '3', text: "Multi-language support" },
      { id: '4', text: "Easy bookmark & history" },
      { id: '5', text: "Clean and simple interface" }
    ]
  };

  const handleBack = () => {
    router.back();
  };

  return {
    aboutData,
    handleBack
  };
};