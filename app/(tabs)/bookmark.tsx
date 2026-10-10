import { TranslationHistory } from "@/models/translationHistoryModel";
import { useBookmarkViewModel } from "@/viewmodels/bookmarkViewModel";
import { useTranslationViewModel } from "@/viewmodels/translationViewModel";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, SectionList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function BookmarkScreen() {
  const { messages, toggleBookmark } = useTranslationViewModel(); // Tamaru junu logic
  const { sections, searchQuery, setSearchQuery, expandedItems, toggleExpand,isDeleteModalVisible, 
    setIsDeleteModalVisible, selectedItemToDelete, confirmDelete,showToast, triggerToast
   } = useBookmarkViewModel(messages);

  const handleDelete = () => {
    if (selectedItemToDelete) {
      toggleBookmark(selectedItemToDelete);
      setIsDeleteModalVisible(false);
      triggerToast();
    }
  };

  const renderItem = ({ item }: { item: TranslationHistory }) => {
    const isExpanded = expandedItems.has(item.id);

 return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        renderRightActions={() => (
          <TouchableOpacity 
            style={styles.deleteAction} 
            onPress={() => confirmDelete(item)}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      >
        <View style={styles.card}>
          {/* --- ALWAYS VISIBLE: Language & Date --- */}
          <View style={styles.cardHeader}>
            <Text style={styles.langPair}>{item.sourceLang} → {item.targetLang}</Text>
            <TouchableOpacity 
            // onPress={() => toggleBookmark(item)}
            >
              <Ionicons name="bookmark" size={22} color="#1A237E" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.dateText}>
            Date : {moment(item.timestamp).format('YYYY-MM-DD HH:mm')}
          </Text>

          {/* --- CONDITIONAL VISIBLE: Translation content --- */}
          {isExpanded && (
            <View style={styles.content}>
              <Text style={styles.sourceText}>{item.sourceText}</Text>
              <Text style={styles.translatedText}>{item.translatedText}</Text>
            </View>
          )}

          {/* --- TOGGLE BUTTON --- */}
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={styles.readMoreBtn}>
              {isExpanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#666" />
        <TextInput 
          placeholder="Search Language" 
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>


      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

        {/* --- SNACKBAR / TOAST MESSAGE --- */}
        {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toastContent}>
            <Ionicons name="checkmark-circle" size={24} color="#1B5E20" />
            <Text style={styles.toastText}>
              The selected bookmark has been deleted successfully.
            </Text>
          </View>
        </View>
      )}
      {/* --- CONFIRMATION MODAL --- */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsDeleteModalVisible(false)}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            
            <View style={styles.deleteImageWrapper}>
               <Ionicons name="trash-outline" size={50} color="#D32F2F" />
            </View>

            <Text style={styles.confirmTitle}>Are you sure you want to delete this bookmark?</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.confirmDeleteBtn} 
                onPress={handleDelete}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

import moment from "moment";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE', // Light background color
  },
  // --- SEARCH BAR STYLES ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  // --- SECTION HEADER (Today, Yesterday) ---
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E', // Dark Blue
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#F8F9FE',
    borderBottomWidth: 1,
    borderBottomColor: '#1A237E',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  // --- CARD STYLES ---
  messageWrapper: {
    marginHorizontal: 15,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
    marginHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  langPair: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 12,
  },
  content: {
    marginTop: 5,
  },
  sourceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  translatedText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  readMoreBtn: {
    fontSize: 13,
    color: '#1A237E',
    fontWeight: '600',
    textAlign: 'right',
    marginTop: 5,
  },
  // --- SWIPE ACTION (DELETE) ---
  deleteAction: {
    backgroundColor: '#D32F2F', // Red color for delete
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: '88%', // Card ni height mujab set thase
    borderRadius: 12,
    marginLeft: -10,
    marginRight: 15,
  },

//Mode css
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  deleteImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  confirmTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    lineHeight: 24,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#1A237E', // Dark Blue
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmDeleteBtn: {
    flex: 1,
    backgroundColor: '#D32F2F', // Red
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

// Toast CSS
  toastContainer: {
    position: 'absolute',
    bottom: 30, // Bottom Tab bar ni upar dekhay te rite
    left: 20,
    right: 20,
    backgroundColor: '#C8E6C9', // Light Green background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E7D32', // Dark Green border
    padding: 9,
    zIndex: 999, // Badha ni upar aave
    elevation: 5,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: {
    marginLeft: 10,
    color: '#1B5E20', // Dark Green text
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
  },
});