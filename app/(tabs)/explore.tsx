
import { Image } from 'expo-image';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useExploreViewModel } from '@/viewmodels/ExploreViewModel';

export default function TabTwoScreen() {
  // const vm = new ExploreViewModel();

  // const [currentBanner, setCurrentBanner] = useState(0);
  // const [selectedFilter, setSelectedFilter] = useState('All');
  // const [data, setData] = useState(vm.products);

  // const [selectedItem, setSelectedItem] = useState<ProductModel | null>(null);
  // const [isSheetVisible, setIsSheetVisible] = useState(false);

  // const handleItemPress = (item: ProductModel) => {
  //   setSelectedItem(item);
  //   setIsSheetVisible(true);
  // };

  // const closeSheet = () => {
  //   setIsSheetVisible(false);
  //   setSelectedItem(null);
  // };

  // //  Banner auto slider
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentBanner((prev) =>
  //       prev === vm.banners.length - 1 ? 0 : prev + 1
  //     );
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  // // Filter click
  // const handleFilter = (filter: string) => {
  //   setSelectedFilter(filter);
  //   setData(vm.filterProducts(filter));
  // };
  
  const {
    categories, banners, currentBanner, filters, selectedFilter, filteredData, handleFilter,
    isSheetVisible, selectedItem, handleItemPress, closeSheet
  } = useExploreViewModel();

  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <View key={item.id} style={styles.category}>
            <Image source={{ uri: item.image }} style={styles.catImage} />
            <ThemedText>{item.name}</ThemedText>
          </View>
        ))}
      </ScrollView>

      {/* Banner */}
      <Image
        source={{ uri: banners[currentBanner] }}
        style={styles.banner}
      />

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterRow}>
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                selectedFilter === item && styles.active,
              ]}
              onPress={() => handleFilter(item)}
            >
              <Text style={{
                color: selectedFilter === item ? '#fff' : '#000'
              }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Products */}
      <FlatList
        data={filteredData}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.productImg} />
              <Text>{item.name}</Text>
              <View style={styles.price}>
                <Text>{item.price}</Text>
                <Text>⭐ {item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
      <Modal
        visible={isSheetVisible}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={closeSheet}
      >
        <Pressable style={styles.overlay} onPress={closeSheet}>
          <View style={styles.bottomSheet}>
            <View style={styles.handle} />

            {selectedItem && (
              <View style={styles.content}>
                <Text style={styles.sheetTitle}>{selectedItem.name}</Text>
                <Image source={{ uri: selectedItem.image }} style={styles.productImg} />
                <Text style={styles.sheetDesc}>{selectedItem.description}</Text>
                <Text style={styles.sheetPrice}>{selectedItem.price}</Text>

                <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
                  <Text style={styles.closeBtnText}>Done</Text>
                </TouchableOpacity>
                <View style={{ height: Platform.OS === 'android' ? 20 : 40 }} />
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    maxWidth: 500,
    alignSelf: 'center'
  },

  category: {
    alignItems: 'center',
    marginRight: 15,
  },

  catImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  banner: {
    width: '100%',
    height: 150,
    marginVertical: 15,
    borderRadius: 10,
  },

  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  filterBtn: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '40%',
    width: '100%',           // Mobile mate full width
    maxWidth: 500,           // Web mate maximum 500px (Desktop par nani dekhase)
    alignSelf: 'center',
  },
  handle: { width: 40, height: 5, backgroundColor: '#ccc', alignSelf: 'center', borderRadius: 5, marginBottom: 20 },
  content: { gap: 10 },
  sheetTitle: { fontSize: 22, fontWeight: 'bold' },
  sheetDesc: { fontSize: 16, color: '#666' },
  sheetPrice: { fontSize: 20, color: 'green', fontWeight: 'bold' },
  closeBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  closeBtnText: { color: 'white', fontWeight: 'bold' },

  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#1E4DB7',
    borderColor: '#1E4DB7',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productImg: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
});
