import { TranslationHistory } from "@/models/translationHistoryModel";
import moment from "moment";
import { useMemo, useState } from "react";

export const useBookmarkViewModel = (allMessages: TranslationHistory[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Modal mate states
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<TranslationHistory | null>(null);

  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    // 3 second pachi automatic hide thai jase
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // 1. Read More / Read Less toggle
  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedItems);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedItems(newSet);
  };

  const confirmDelete = (item: TranslationHistory) => {
    setSelectedItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  
  // 2. Data Filtering & Grouping by Date
  const sections = useMemo(() => {
    // Fakt bookmarked items lo ane search apply karo
    let filtered = allMessages.filter(m => 
      m.isBookmarked && 
      (m.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) || 
       m.translatedText.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Date pramane grouping (Today, Yesterday, Date)
    const groups = filtered.reduce((acc: any, item) => {
      const date = moment(item.timestamp).format('YYYY-MM-DD');
      let title = moment(item.timestamp).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'DD MMM YYYY',
        sameElse: 'DD MMM YYYY'
      });

      if (!acc[title]) acc[title] = [];
      acc[title].push(item);
      return acc;
    }, {});

    return Object.keys(groups).map(title => ({
      title,
      data: groups[title]
    }));
  }, [allMessages, searchQuery]);

  return { sections, searchQuery, setSearchQuery, expandedItems, toggleExpand,isDeleteModalVisible, 
    setIsDeleteModalVisible, selectedItemToDelete, confirmDelete, showToast, triggerToast };
};