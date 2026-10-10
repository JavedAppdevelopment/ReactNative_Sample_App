import { useTranslationViewModel } from '@/viewmodels/translationViewModel';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import moment from 'moment';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function TranslationScreen() {
  const { 
    messages, inputText, setInputText, handleTranslate, 
    buttonType , isFilterVisible, setIsFilterVisible, sortOrder, setSortOrder,
    startDate, setStartDate, endDate, setEndDate,showPicker, setShowPicker, onDateChange,
    sourceLang,targetLang,swapLanguages,isLangModalVisible, setIsLangModalVisible,
    selectionMode, openLanguagePicker,handleLangSelect,isLoading,speakText,handleMicPress,isListening,
    toggleBookmark
    // startListening,stopListening
  } = useTranslationViewModel();

  const flatListRef = useRef<FlatList>(null);
  const headerHeight = useHeaderHeight();

  const languageList = [
  { label: 'English', code: 'en' },
  { label: 'Gujarati', code: 'gu' },
  { label: 'Hindi', code: 'hi' },
  { label: 'Marathi', code: 'mr' },
];

  // --- SWIPE LOGIC (Screen 4 & 5) ---
  const renderRightActions = (item: any) => (
    <View style={styles.swipeActions}>
      <TouchableOpacity style={styles.swipeIcon}>
        <Ionicons name="volume-medium-outline" size={24} color="#fff" 
        onPress={() => speakText(item.translatedText, targetLang.code)}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeIcon} onPress={() => toggleBookmark(item)}>
        {/* <Ionicons name="bookmark-outline" size={24} color="#fff" /> */}
        <Ionicons 
          name={item.isBookmarked ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color={item.isBookmarked ? "#FFD700" : "#fff"} 
        />
      </TouchableOpacity>
    </View>
  );

  // --- MESSAGE LIST ITEM ---
  const renderItem = ({ item }: any) => {
    const isBubbleMode = buttonType === 'Bubble';

    return (
      <GestureHandlerRootView>
        {isBubbleMode ? (
          /* BUBBLE MODE: Bookmark icons baaju ma j dekhase */
          <View style={styles.messageWrapper}>
            <View style={[styles.card, styles.bubbleCard]}>
              <View style={styles.cardContent}>
                <Text style={styles.langLabel}>English</Text>
                <Text style={styles.sourceText}>{item.sourceText}</Text>
                <View style={styles.divider} />
                <Text style={styles.langLabel}>Gujarati</Text>
                <Text style={styles.translatedText}>{item.translatedText}</Text>
              </View>
              <View style={styles.bubbleActions}>
                <TouchableOpacity onPress={() => toggleBookmark(item)}>
                  {/* <Ionicons name="bookmark-outline" size={24} color="#1A237E" /> */}
                   <Ionicons 
                      name={item.isBookmarked ? "bookmark" : "bookmark-outline"} 
                      size={24} 
                      color={item.isBookmarked ? "#FFD700" : "#1A237E"} 
                    />
                  </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 12 }} onPress={() => speakText(item.translatedText, targetLang.code)}><Ionicons name="volume-medium-outline" size={24} color="#1A237E" /></TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* SWIPE MODE: Swipe karvathi blue icons aavse */
          <ReanimatedSwipeable
            containerStyle={styles.messageWrapper}
            renderRightActions={() => renderRightActions(item)}
            friction={2}
            rightThreshold={40}
          >
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.langLabel}>{sourceLang.label}</Text> 
                <Text style={styles.sourceText}>{item.sourceText}</Text>
                <View style={styles.divider} />
                <Text style={styles.langLabel}>{targetLang.label}</Text>
                <Text style={styles.translatedText}>{item.translatedText}</Text>
              </View>
            </View>
          </ReanimatedSwipeable>
        )}
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerRight: () => (
                  <TouchableOpacity  style={{marginRight: 10}} onPress={() => setIsFilterVisible(true)}>
                    <MaterialCommunityIcons name="tune-variant" size={24} color="white" />
                  </TouchableOpacity>
                ),
              }} 
            />
      {/* 1. SIMPLE TITLE ONLY (No Complex Header) */}
     <View style={styles.languageBarContainer}>
          <View style={styles.languageBar}>
            <TouchableOpacity onPress={() => openLanguagePicker('source')}>
              <Text style={styles.langText}>{sourceLang.label}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={swapLanguages}>
              <MaterialCommunityIcons name="swap-horizontal" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLanguagePicker('target')}>
            <Text style={styles.langText}>{targetLang.label}</Text>
            </TouchableOpacity>
          </View>
      </View>

     <KeyboardAvoidingView
        style={{ flex: 1 }}
        // Android mate 'padding' ghani vaar 'height' karta saru chale che jo container flex:1 hoy
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} 
        keyboardVerticalOffset={headerHeight} // Fix '70' na badle dynamic height
      >
      {/* 2. CHAT HISTORY */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        // onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
         onContentSizeChange={() => {
            if (sortOrder === 'Ascending') {
              flatListRef.current?.scrollToEnd();
            }
          }}
      />

      {/* 3. BOTTOM WHATSAPP STYLE INPUT */}
      {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}> */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.textModeBtn}>
            <MaterialCommunityIcons name="format-text" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              // placeholder="Message"
              placeholder={isListening ? "Listening..." : "Type here..."}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
            // onPress={handleTranslate}
            // onPress={handleMicPress}
            onPress={() => {
              if (inputText.trim().length > 0) {
                handleTranslate();
              } else {
                handleMicPress();
              }
            }}
           style={styles.sendIcon}>
              <Ionicons 
                name={inputText ? "send" : "mic"} 
                size={24} 
                color="#1a237e" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* --- FILTER MODAL (SCREENSHOT STYLE) --- */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setIsFilterVisible(false)}
        >
          {/* PEHLU FIX: Pressable ma style muko ane andar vadharano View kadhi nakho */}
          <Pressable 
            style={styles.bottomSheet} 
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sheetTitle}>Sort By Date</Text>
            
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[styles.radioButton, sortOrder === 'Ascending' && styles.radioActive]}
                onPress={() => setSortOrder('Ascending')}
              >
                <Ionicons name={sortOrder === 'Ascending' ? "radio-button-on" : "radio-button-off"} size={20} color="#1A237E" />
                <MaterialCommunityIcons name="sort-ascending" size={24} color="#1A237E" />
                <Text style={styles.radioLabel}>Ascending</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.radioButton, sortOrder === 'Descending' && styles.radioActive]}
                onPress={() => setSortOrder('Descending')}
              >
                <Ionicons name={sortOrder === 'Descending' ? "radio-button-on" : "radio-button-off"} size={20} color="#1A237E" />
                <MaterialCommunityIcons name="sort-descending" size={24} color="#1A237E" />
                <Text style={styles.radioLabel}>Descending</Text>
              </TouchableOpacity>
            </View>

            {/* BIJU FIX: Tame ahiya // vali comment lakhi hati, e kadhi nakhi che */}
            <Text style={[styles.sheetTitle, { marginTop: 20 }]}>Filter By Date And Time</Text>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <TouchableOpacity 
                style={styles.dateSelector} 
                onPress={() => setShowPicker('start')}
              >
                <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#1A237E" />
                <Text style={styles.dateValue}>{moment(startDate).format('DD-MMM-YYYY HH:mm')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateRow}>
              <Text style={styles.dateLabel}>End Date</Text>
              <TouchableOpacity 
                style={styles.dateSelector} 
                onPress={() => setShowPicker('end')}
              >
                <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#1A237E" />
                <Text style={styles.dateValue}>{moment(endDate).format('DD-MMM-YYYY HH:mm')}</Text>
              </TouchableOpacity>
            </View>

            {showPicker !== 'none' && (
              <DateTimePicker
                value={showPicker === 'start' ? startDate : endDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <TouchableOpacity style={styles.applyBtn} onPress={() => setIsFilterVisible(false)}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
            
          </Pressable>
        </Pressable>
      </Modal>

      {/* LANGUAGE SELECTION MODAL */}
      <Modal
        visible={isLangModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLangModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsLangModalVisible(false)}>
          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>
              Select {selectionMode === 'source' ? 'Source' : 'Target'} Language
            </Text>
            
            <FlatList
              data={languageList}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.langItem} 
                  onPress={() => handleLangSelect(item.label, item.code)}
                >
                  <Text style={styles.langItemText}>{item.label}</Text>
                  {(selectionMode === 'source' ? sourceLang.code : targetLang.code) === item.code && (
                    <Ionicons name="checkmark-circle" size={22} color="#1A237E" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      <Modal visible={isLoading} transparent={true}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1A237E" />
          <Text style={{ marginTop: 10 }}>Downloading Translation Model...</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>This may take a moment</Text>
        </View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  simpleTitleBar: { paddingTop: 50, paddingBottom: 15, alignItems: 'center', backgroundColor: '#fff' },
  titleText: { fontSize: 20, fontWeight: 'bold', color: '#1a237e' },
  listContent: { padding: 15, paddingBottom: 100 },
  messageWrapper: { marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  bubbleCard: { flexDirection: 'row' },
  cardContent: { flex: 1 },
  langLabel: { fontSize: 11, color: '#999', fontWeight: 'bold' },
  sourceText: { fontSize: 14, color: '#333', marginVertical: 3 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  translatedText: { fontSize: 16, color: '#1a237e', fontWeight: '700' },
  bubbleActions: { justifyContent: 'center', paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: '#1A237E', marginLeft: 5 },
  // swipeActions: { flexDirection: 'row', width: 100, backgroundColor: '#1a237e', borderRadius: 15, marginLeft: 10 },
  // swipeIcon: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  swipeActions: { 
  flexDirection: 'row', 
  width: 100,           // Thodi width vadhari jethi space male
  height: '100%',      // Card ni puri height le
  paddingVertical: 2,  // Thodi upar-niche jagya
  marginLeft: 5,
  gap: 6,              // BEY ICONS VACHHE JAGYA (Main badlav)
},
swipeIcon: { 
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: '#1a237e', // Color have ahiya aavshe
  borderRadius: 12,           // Individual box round thashe
},


  // Language Bar Logic
  languageBarContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10, // Header ni thodu upar chade te rite
    zIndex: 2,
  },
  languageBar: {
    flexDirection: 'row',
    backgroundColor: '#1A237E',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    elevation: 5,
  },
  langText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  
  // BOTTOM BAR
  bottomBar: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  textModeBtn: { backgroundColor: '#1A237E', padding: 10, borderRadius: 50, elevation: 3, marginRight: 10 },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 3,
    minHeight: 50
  },
  input: { flex: 1, fontSize: 16, color: '#333' },
  sendIcon: { marginLeft: 10 },


// ... Mode CSS styles ...
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  bottomSheet: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    padding: 20, 
    paddingBottom: Platform.OS === 'ios' ? 40 : 50 
  },
  sheetHeader: { alignItems: 'flex-end', marginBottom: 5 },
  sheetTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 10 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  radioButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 6, 
    width: '48%' 
  },
  radioActive: { borderColor: '#1A237E', backgroundColor: '#f0f2ff' },
  radioLabel: { marginLeft: 8, fontSize: 14 },
  // dateInput: { 
  //   backgroundColor: '#f1f1f1', 
  //   padding: 12, 
  //   borderRadius: 8, 
  //   marginTop: 10,
  //   borderWidth: 1,
  //   borderColor: '#ddd'
  // },
  applyBtn: { 
    backgroundColor: '#1A237E', 
    padding: 12, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 20 
  },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  dateRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', // Label left ma ane selector right ma
  marginTop: 10,
},
dateLabel: {
  fontSize: 15,
  fontWeight: '600',
  color: '#333',
  flex: 1, // Label ne left side fix rakhse
},
dateSelector: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f1f3f9',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#D1D9FF',
  width: '60%', // Selector ni fix width
  justifyContent: 'flex-start',
},
dateValue: {
  marginLeft: 10,
  fontSize: 14,
  color: '#1A237E',
  fontWeight: '500',
},


// New languase mode 
langItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  langItemText: { fontSize: 18, color: '#333' }
});