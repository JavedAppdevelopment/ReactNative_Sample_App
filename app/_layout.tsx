import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   // anchor: '(tabs)',
//   initialRouteName: 'walkthrough',
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);


useEffect(() => {
    const checkStatus = async () => {
      try {
        const hasOpened = await AsyncStorage.getItem('hasOpenedBefore');
        // Jo hasOpened null hoy, to isFirstLaunch = true
        setIsFirstLaunch(hasOpened === null);
      } catch (e) {
        setIsFirstLaunch(false); // Error aave to safe side tabs batava
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    checkStatus();
  }, []);

  if (isFirstLaunch === null) return null;
  console.log('isFirstLaunch',isFirstLaunch);
  
  // return (
  //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //     <Stack initialRouteName={isFirstLaunch ? "walkthrough" : "(tabs)"}
  //       screenOptions={{
  //         headerStyle: {
  //           backgroundColor: '#1A237E'
  //         },
  //         headerTintColor: '#FFFFFF',
  //         headerTitleAlign: 'center',
  //         headerShown: true, // Jo tamare default ma header hide rakhvu hoy to
  //       }}
  //       >
  //       <Stack.Screen name="walkthrough" options={{ headerShown: false }} />
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: false }} />
  //       <Stack.Screen name="howitWorks" options={{ presentation: 'transparentModal', headerShown: false }} />
  //       <Stack.Screen name="contentbutton" options={{presentation: 'transparentModal', headerShown: false}}/>
  //     </Stack>
  //     <StatusBar style="auto" />
  //   </ThemeProvider>
  // );
return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName={isFirstLaunch ? "walkthrough" : "(tabs)"}
         screenOptions={{
          headerStyle: {
            backgroundColor: '#1A237E'
          },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          headerShown: true, // Jo tamare default ma header hide rakhvu hoy to
        }}
      >
        <Stack.Screen name="walkthrough" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="howitWorks" options={{ presentation: 'transparentModal', headerShown: false }} />
        <Stack.Screen name="contentbutton" options={{presentation: 'transparentModal', headerShown: false}}/>
      </Stack>
    </ThemeProvider>
  );
}
