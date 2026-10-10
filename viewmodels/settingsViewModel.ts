import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Share } from 'react-native';

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  type?: 'switch'; // Optional
  iconBg?: string;
  route?: string; // Optional
}

interface SettingSection {
  title: string;
  data: SettingItem[];
}

export const useSettingsViewModel = () => {
  const router = useRouter();
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const openRating = () => setIsRatingVisible(true);
  const closeRating = () => {
    setIsRatingVisible(false);
    setSelectedRating(0); // Reset rating on close
  };

  const handleStarPress = (rating: number) => {
    setSelectedRating(rating);
    // API call
  };

  const [isShareVisible, setIsShareVisible] = useState(false);
  const appLink = "https://play.google.com/store/apps/details?id=com.your.package.name";

  const openShare = () => setIsShareVisible(true);
  const closeShare = () => setIsShareVisible(false);

  // App Link Copy karva mate
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(appLink);
    Alert.alert("Success", "Link Copied to Clipboard!");
  };

  // Direct Social Media par share karva mate
  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing Translate App: ${appLink}`,
      });
    } catch (error) {
      // console.log(error.message);
    }
  };

  // Settings Data Structure
  const sections: SettingSection[] = [
    {
      title: 'Appearance & Notification',
      data: [
        { id: 'night_mode', title: 'Night Mode', icon: 'moon-waning-crescent', type: 'switch' },
        { id: 'notifications', title: 'Notifications', icon: 'bell', iconBg: '#B41B1B', type: 'switch' },
      ],
    },
    {
      title: 'Display settings',
      data: [
        { id: 'language', title: 'Current Language', icon: 'translate', iconBg: '#0F52BD' },
        { id: 'text_size', title: 'Text Size', icon: 'format-size', route: '/textsize' },
        { id: 'context', title: 'Context Button', icon: 'wrench', iconBg: '#B41B1B' , route: '/contentbutton'},
      ],
    },
    {
      title: 'Let us Know',
      data: [
        { id: 'privacy', title: 'Security & Privacy', icon: 'lock', route: '/privacy' },
        { id: 'faqs', title: 'FAQs', icon: 'help-circle', iconBg: '#B41B1B', route: '/helpdesk'},
        { id: 'about', title: 'About Us', icon: 'information', iconBg: '#0F52BD', route: '/about' },
        { id: 'contact', title: 'Contact Us', icon: 'headphones', route: '/contact'},
      ],
    },
    {
      title: 'Others',
      data: [
        { id: 'shareApp', title: 'Share App', icon: 'share-variant', route: 'ShareApp' },
        { id: 'works', title: 'How it Works?', icon: 'cog-outline', iconBg: '#B41B1B', route: '/howitWorks' },
        { id: 'rateUs', title: 'Rate Us', icon: 'star-outline', iconBg: '#0F52BD', route: 'rateUs' },
      ],
    },
  ];

  const handlePress = (item: any) => {
    console.log(item.route);
    if(item.route == 'rateUs'){
      openRating();
    }
    else if(item.route == 'ShareApp'){
      openShare();
    }
    else if (item.route) {
      router.push(item.route); // Navigating to next page
    }
  };

  const [userData, setUserData] = useState({
    name: "John",
    lastname: "Kartos",
    email: "johnkartos123@gmail.com",
    phone: "5657336709",
    image: null
  });

  const loadUserData = async () => {
    const savedData = await AsyncStorage.getItem('user_profile');
    if (savedData !== null) {
      setUserData(JSON.parse(savedData));
    }
    else{
      setUserData(userData);
    }
  };

  // 3. Jyare pan Settings page par pacha aavo, tyare data refresh thavo jove
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const goToProfile = () => {
    router.push({
      pathname: '/profile',
      // 2. Data ne params tarike Profile page ma moklo
      params: { 
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        phone: userData.phone,
        image: userData.image,
      }
    });
  };

  return { sections, 
    handlePress,
    isRatingVisible,
    selectedRating,
    openRating,
    closeRating,
    handleStarPress ,
    isShareVisible,
    appLink,
    closeShare,
    copyToClipboard,
    onShare,
    userData,
    goToProfile
  };
};