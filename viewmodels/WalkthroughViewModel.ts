import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, useWindowDimensions, ViewToken } from 'react-native';

// 1. Viewable items mate interface
interface ViewableItemsChangedProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const useOnboardingViewModel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null); // FlatList reference
  const { width } = useWindowDimensions();
  const router = useRouter();

  // 2. viewableItems na type define karya
  const viewableItemsChanged = useRef(({ viewableItems }: ViewableItemsChangedProps) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // 3. dataLength ne 'number' type apyo
  const scrollToNext = (dataLength: number) => {
    if (currentIndex < dataLength - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/account');
    }
  };

  return { 
    scrollX, 
    currentIndex, 
    slidesRef, 
    viewableItemsChanged, 
    viewConfig, 
    scrollToNext, 
    width 
  };
};