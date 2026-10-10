import { useAboutViewModel } from '@/viewmodels/aboutViewModel';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const { aboutData, handleBack } = useAboutViewModel();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
    
      <Stack.Screen 
        options={{
          title: 'About Us',
          headerShown: true,
          headerBackTitle: 'Back'
        //   headerStyle: { backgroundColor: '#1E2B6D' }, 
        //   headerTintColor: 'white',
        //   headerTitleAlign: 'center',
        //   headerLeft: () => (
        //     <TouchableOpacity onPress={handleBack} style={{marginLeft: 10}}>
        //       <MaterialCommunityIcons name="chevron-left" size={30} color="white" />
        //     </TouchableOpacity>
        //   ),
        }} 
      />

      {/* 2. Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* 2.1 Illustration Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={aboutData.illustration} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* 2.2 Main Bold Title */}
        <Text style={styles.mainTitle}>{aboutData.mainTitle}</Text>

        {/* 2.3 General Paragraphs */}
        {aboutData.paragraphs.map((text, index) => (
          <Text key={`para-${index}`} style={styles.paragraphText}>
            {text}
          </Text>
        ))}

        {/* 2.4 Mission & Vision Sections */}
        {aboutData.sections.map((section, index) => (
          <View key={`section-${index}`} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.paragraphText}>{section.content}</Text>
          </View>
        ))}

        {/* 2.5 Features List Section */}
        <Text style={styles.sectionTitle}>{aboutData.featuresTitle}</Text>
        
        {/* Bullet Points */}
        <View style={styles.featuresContainer}>
          {aboutData.features.map((feature) => (
            <View key={feature.id} style={styles.bulletItem}>
              {/* Bullet Symbol */}
              <Text style={styles.bulletSymbol}>•</Text>
              {/* Bullet Text */}
              <Text style={styles.bulletText}>{feature.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  
  contentContainer: { 
    paddingHorizontal: 25, 
    paddingTop: 20, 
    paddingBottom: 40 // Bottom padding
  },
  
  imageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  illustration: {
    // width: '90%',
    // height: 220, 
  },
  
  mainTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333333', 
    lineHeight: 24,
    marginBottom: 15
  },
  
  paragraphText: { 
    fontSize: 15, 
    color: '#555555', 
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify' // Professional text alignment
  },
  
  sectionContainer: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8
  },
  
  featuresContainer: {
    marginTop: 5,
    paddingLeft: 10 // Indent the list
  },
  bulletItem: {
    flexDirection: 'row', // Align bullet and text horizontally
    alignItems: 'flex-start', // Top align
    marginBottom: 8
  },
  bulletSymbol: {
    fontSize: 18,
    color: '#555555',
    marginRight: 10,
    lineHeight: 20 // Center vertically with text
  },
  bulletText: {
    fontSize: 15,
    color: '#555555',
    flex: 1, // Allow text to wrap
    lineHeight: 20
  }
});