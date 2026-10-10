import { HelpModel } from '@/models/helpModel';
import { useMemo, useState } from 'react';


export const useHelpDeskViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(0); 

  const faqData: HelpModel[] = [
    { id: 1, question: "What is Translate App?", answer: "Translate App allows you to translate text, voice, and images instantly between multiple languages." },
    { id: 2, question: "Do I need an internet connection?", answer: "Yes, for most translations an active internet connection is required to fetch accurate results." },
    { id: 3, question: "Can I translate text from an image?", answer: "Yes! Use the camera feature to snap a photo, and the app will detect and translate the text for you." },
    { id: 4, question: "How can I change the app language?", answer: "Go to Settings > Language Settings to change the interface language." },
    { id: 5, question: "Can I use the app offline?", answer: "Offline mode is coming soon! You will be able to download language packs in the future update." },
  ];

  // Search logic
  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Toggle Accordion
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return {
    searchQuery,
    setSearchQuery,
    expandedId,
    toggleExpand,
    filteredFaqs
  };
};