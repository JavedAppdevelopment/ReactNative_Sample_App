
import { TranslationHistory } from '@/models/translationHistoryModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Translation, { TranslateLanguage } from '@react-native-ml-kit/translate-text';
// import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-voice/voice';
import { useFocusEffect } from 'expo-router';
import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';

export const useTranslationViewModel = () => {
  const [messages, setMessages] = useState<TranslationHistory[]>([]);
  const [inputText, setInputText] = useState('');
  const [buttonType, setButtonType] = useState<'Swipe' | 'Bubble'>('Swipe'); // Ahiya tamara settings mathi get karvanu

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<'Ascending' | 'Descending'>('Ascending');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<'none' | 'start' | 'end'>('none');

  const [sourceLang, setSourceLang] = useState({ label: 'English', code: TranslateLanguage.ENGLISH });
  const [targetLang, setTargetLang] = useState({ label: 'Gujarati', code: TranslateLanguage.GUJARATI });

  // 2. Modal States
  const [isLangModalVisible, setIsLangModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'source' | 'target'>('source');

  const [isLoading, setIsLoading] = useState(false);
  // const downloadedModels = new Set<string>();
  const [downloadedModels, setDownloadedModels] = useState<Set<string>>(new Set());

  const [isListening, setIsListening] = useState(false);
  
  const [bookmarkedItems, setBookmarkedItems] = useState<TranslationHistory[]>([]);

  // History load karo jyare app khule
useFocusEffect(
  useCallback(() => {
    // Jyare pan page focus thashe (open thashe), tyare aa call thashe
    loadHistory();
    getSettings();
    loadModels();
    // listeners();
    return () => {
      // Optional: Jyare page bandh thay tyare kai karvu hoy to
    };
  }, [])
);

  const getSettings = async () => {
    const savedType = await AsyncStorage.getItem('content_button_type');
    if (savedType) setButtonType(savedType as any);
  };

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('chat_history');
    if (data) setMessages(JSON.parse(data));
  };

  const loadModels = async () => {
    const savedModels = await AsyncStorage.getItem('downloaded_models');
    if (savedModels) {
      setDownloadedModels(new Set(JSON.parse(savedModels)));
    }
  }


  // 3. Open Modal Function
  const openLanguagePicker = (mode: 'source' | 'target') => {
    setSelectionMode(mode);
    setIsLangModalVisible(true);
  };

  // 4. Select Language Function
  const handleLangSelect = (label: string, code: any) => {
    console.log(label,code);
  
    if (selectionMode === 'source') {
      setSourceLang({ label, code });
    } else {
      setTargetLang({ label, code });
    }
    setIsLangModalVisible(false);
    
    // Background ma model download start kari devu
    // Translation.downloadModel(code); 
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  // const handleTranslate = async () => {
  //   if (!inputText.trim()) return;

  //   const isAlreadyDownloaded = downloadedModels.has(targetLang.code);

  //   if (!isAlreadyDownloaded) {
  //     setIsLoading(true); // Khali download vakhat j chalu thase
  //   }

  //   try {
  //     const result = await Translation.translate({
  //       text: inputText,
  //       // sourceLanguage: TranslateLanguage.ENGLISH,
  //       // targetLanguage: TranslateLanguage.GUJARATI,
  //       sourceLanguage: sourceLang.code,
  //       targetLanguage: targetLang.code,
  //       downloadModelIfNeeded: true,
  //     }); 

  //     if (!isAlreadyDownloaded) {
  //     // Navu model download thayu, to list update karo
  //     const updatedModels = new Set(downloadedModels).add(targetLang.code);
  //     setDownloadedModels(updatedModels);
      
  //     // Storage ma pan save kari dyo jethi app bandh kari ne chalu karo to loader na aave
  //     await AsyncStorage.setItem('downloaded_models', JSON.stringify(Array.from(updatedModels)));
  //   }
      
  //     const newMsg: TranslationHistory = {
  //       id: Date.now().toString(),
  //       sourceText: inputText,
  //       translatedText: result as unknown as string,
  //       sourceLang: sourceLang.label, 
  //       targetLang: targetLang.label,
  //       timestamp: Date.now(),
  //     };

  //     //Claer filter
  //     setStartDate(new Date()); 
  //     setEndDate(new Date()); 
  //     setSortOrder('Ascending');

  //     const updatedHistory = [...messages, newMsg];
  //     setMessages(updatedHistory);
  //     await AsyncStorage.setItem('chat_history', JSON.stringify(updatedHistory));
  //     setInputText('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  //    finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    let result = "";

    try {
      if (Platform.OS === 'web') {
        // --- WEB LOGIC: Use Google Translate API ---
        setIsLoading(false);
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang.code}&tl=${targetLang.code}&dt=t&q=${encodeURI(inputText)}`
        );
        const data = await response.json();
        result = data[0][0][0]; // Extracting translated text
      } else {
        // --- MOBILE LOGIC: Keep your existing ML Kit code ---
        const isAlreadyDownloaded = downloadedModels.has(targetLang.code);
        if (!isAlreadyDownloaded) {
          setIsLoading(true);
        }

       const mlResult = await Translation.translate({
          text: inputText,
          sourceLanguage: sourceLang.code,
          targetLanguage: targetLang.code,
          downloadModelIfNeeded: true,
        })as any;

        result = typeof mlResult === 'string' ? mlResult : mlResult.text;

        if (!isAlreadyDownloaded) {
          const updatedModels = new Set(downloadedModels).add(targetLang.code);
          setDownloadedModels(updatedModels);
          await AsyncStorage.setItem('downloaded_models', JSON.stringify(Array.from(updatedModels)));
        }
      }

      // --- COMMON LOGIC: Save history for both Web and Mobile ---
      if (result) {
        const newMsg: TranslationHistory = {
          id: Date.now().toString(),
          sourceText: inputText,
          translatedText: result as unknown as string,
          sourceLang: sourceLang.label,
          targetLang: targetLang.label,
          timestamp: Date.now(),
          isBookmarked: false,
        };

        // Clear filter
        setStartDate(new Date());
        setEndDate(new Date());
        setSortOrder('Ascending');

        const updatedHistory = [...messages, newMsg];
        setMessages(updatedHistory);
        await AsyncStorage.setItem('chat_history', JSON.stringify(updatedHistory));
        setInputText('');
      }

    } catch (error) {
      console.error("Translation Error:", error);
      alert("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
};

const toggleBookmark = async (item: TranslationHistory) => {
  // 1. Current messages ma badlav karo
  const updatedHistory = messages.map(msg => {
    if (msg.id === item.id) {
      return { ...msg, isBookmarked: !msg.isBookmarked };
    }
    return msg;
  });

  // 2. State update karo
  setMessages(updatedHistory);

  // 3. AsyncStorage ma akhi history save kari dyo
  await AsyncStorage.setItem('chat_history', JSON.stringify(updatedHistory));
};


  const onDateChange = (event: any, selectedDate?: Date) => {
  setShowPicker('none'); // Picker bandh karo
  if (selectedDate) {
    if (showPicker === 'start') setStartDate(selectedDate);
    if (showPicker === 'end') setEndDate(selectedDate);
  }
};

const speakText = (text: string, langCode: string) => {
  const options = {
    language: langCode === 'gu' ? 'gu-IN' : 'en-US',
    pitch: 1.0,
    rate: 0.9, // Thodu slow rakhvu jethi samjay
  };
  
  Speech.speak(text, options);
};


// Aa event tyare trigger thase jyare user bolse
  useSpeechRecognitionEvent("result", (event) => {
    if (event.results && event.results.length > 0) {
      setInputText(event.results[0].transcript);
    }
  });

  // Jyare listening bandh thay tyare state update karo
  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log("Speech Error:", event.error);
    setIsListening(false);
  });



  // --- Functions ---
  const handleMicPress = async () => {
    if (isListening) {
      ExpoSpeechRecognitionModule.stop();
      setIsListening(false);
    } else {
      // Pehla permission check karo
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        alert("Microphone permission is required!");
        return;
      }

      setIsListening(true);
      
      // Start Listening
      const recognitionLang = sourceLang.code === 'gu' ? 'gu-IN' : 
                             sourceLang.code === 'hi' ? 'hi-IN' : 
                             sourceLang.code === 'mr' ? 'mr-IN' : 'en-US';

      ExpoSpeechRecognitionModule.start({
        lang: recognitionLang, // Have aa dynamic thase
        interimResults: true,
      });
    }
  };



  // --- FILTER LOGIC (Main Badlav ahiya che) ---
  const filteredMessages = useMemo(() => {
    let result = [...messages];

    // 1. Date Range Filter
    // Start date na divas na sharuat thi (00:00:00) ane End date na divas na ant sudhi (23:59:59)
    const start = moment(startDate).startOf('day').valueOf();
    const end = moment(endDate).endOf('day').valueOf();

    result = result.filter(msg => {
      return msg.timestamp >= start && msg.timestamp <= end;
    });

    // 2. Sorting Logic
    result.sort((a, b) => {
      if (sortOrder === 'Ascending') {
        return a.timestamp - b.timestamp; // Junu pehla
      } else {
        return b.timestamp - a.timestamp; // Navu pehla
      }
    });

    return result;
  }, [messages, sortOrder, startDate, endDate]);


  return {
    //  messages,
     inputText, setInputText, handleTranslate, buttonType,isFilterVisible, 
    setIsFilterVisible, sortOrder, setSortOrder,startDate, setStartDate, endDate, setEndDate, 
    showPicker, setShowPicker, onDateChange,sourceLang,targetLang,swapLanguages,
    isLangModalVisible, setIsLangModalVisible,selectionMode, openLanguagePicker,
    handleLangSelect,isLoading,speakText,handleMicPress,isListening,toggleBookmark,
    messages: filteredMessages, // Have view ne filtered data j malse
    rawMessages: messages,
    // stopListening,startListening 
  };
};