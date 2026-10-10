import { useEffect, useState } from 'react';
import ProductModel from '../models/ProductModel';

export const useExploreViewModel = () => {

  const categories = [
    { id: 1, name: 'Women', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200' },
    { id: 2, name: 'Kids', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200' },
    { id: 3, name: 'Men', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200' },
    { id: 4, name: 'Shoes', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { id: 5, name: 'Sports', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200' },
    { id: 6, name: 'Seasonal', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=200' },
  ];

  const filters = [
    'All',
    'Popular',
    'New',
    'Shirts',
    'T-Shirts',
    'Jeans',
    'Shorts',
    'Jackets',
  ];

  const banners = [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
  ];

  const products: ProductModel[] = [
    new ProductModel(1, 'T-Shirt', 'T-Shirts', '$20', 4.5,'Comfortable cotton T-shirt with a stylish design, perfect for daily wear.', 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=400'),
    new ProductModel(2, 'Jeans', 'Jeans', '$40', 4.2,'Durable denim jeans with a modern fit, offering comfort and long-lasting wear.', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400'),
    new ProductModel(3, 'Shirt', 'Shirts', '$30', 4.7,'Premium quality shirt made with soft fabric, suitable for casual and formal occasions.', 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=400'),
    new ProductModel(4, 'Shorts', 'Shorts', '$50', 3.5,'Stylish top designed for comfort and everyday fashion.', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400'),
    new ProductModel(5, 'Jackets', 'Jackets', '$90', 4.1,'Trendy jacket designed to keep you warm while enhancing your style.', 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=400'),
    new ProductModel(6, 'Shorts', 'Shorts', '$50', 3.5,'Stylish top designed for comfort and everyday fashion.', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400'),

  ];

  // States
  const [filteredData, setFilteredData] = useState<ProductModel[]>(products);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ProductModel | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  // Banner logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredData(products);
    } else if (filter === 'Popular') {
      setFilteredData(products.filter(p => p.rating > 4.5));
    } else {
      setFilteredData(products.filter(p => p.category === filter));
    }
  };

  // Popup logic
  const handleItemPress = (item: ProductModel) => {
    setSelectedItem(item);
    setIsSheetVisible(true);
  };

  const closeSheet = () => {
    setIsSheetVisible(false);
    setSelectedItem(null);
  };

  return {
    categories,
    filters,
    banners,
    filteredData,
    selectedFilter,
    currentBanner,
    selectedItem,
    isSheetVisible,
    handleFilter,
    handleItemPress,
    closeSheet
  };
}