import { useSettingsViewModel } from '@/viewmodels/settingsViewModel';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
    const { sections,
        handlePress,
        isRatingVisible,
        selectedRating,
        closeRating,
        handleStarPress,
        isShareVisible,
        appLink,
        closeShare,
        copyToClipboard,
        onShare,
        goToProfile,
        userData
    } = useSettingsViewModel();

    const viewModel = useSettingsViewModel();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 1. Profile Header */}
            <View style={styles.profileSection}>
                <Image source={viewModel.userData.image ? { uri: viewModel.userData.image } : require('@/assets/images/user_group.png')} />
                <Text style={styles.userName}>{viewModel.userData.name} {viewModel.userData.lastname}</Text>
                <Text style={styles.userPhone}>+91 {viewModel.userData.phone}</Text>
                <TouchableOpacity style={styles.editButton} onPress={goToProfile}><Text style={styles.editText}>Edit Profile</Text></TouchableOpacity>
            </View>

            {/* 2. Dynamic Sections */}
            {sections.map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <View style={styles.card}>
                        {section.data.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.itemRow}
                                onPress={() => handlePress(item)}
                                disabled={item.type === 'switch'}
                            >
                                <View style={styles.leftPart}>
                                    <View style={[styles.iconCircle, { backgroundColor: item.iconBg || '#1E2B6D' }]}>
                                        <MaterialCommunityIcons name={item.icon as any} size={20} color="white" />
                                    </View>
                                    <Text style={styles.itemText}>{item.title}</Text>
                                </View>

                                {item.type === 'switch' ? (
                                    <Switch value={true} trackColor={{ false: "#767577", true: "#1E2B6D" }} />
                                ) : (
                                    <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}

            {/* 3. Log Out Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <View style={[styles.iconCircle, { backgroundColor: '#B41B1B' }]}>
                    <MaterialCommunityIcons name="power" size={20} color="white" />
                </View>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <Text style={styles.version}>Version v1.0.2</Text>

            {/* --- RATING MODAL START --- */}
            <Modal
                visible={isRatingVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeRating}
            >
                <Pressable style={styles.modalOverlay} onPress={closeRating}>
                    <Pressable style={styles.ratingBox} onPress={(e) => e.stopPropagation()}>

                        <Text style={styles.modalTitle}>Your Opinion Matter</Text>

                        <Text style={styles.modalSubTitle}>
                            Express your liking by rating application with five stars.
                        </Text>

                        {/* Star Container */}
                        <View style={styles.starContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleStarPress(star)}
                                    activeOpacity={0.7}
                                >
                                    <MaterialCommunityIcons
                                        name={star <= selectedRating ? "star" : "star-outline"}
                                        size={35}
                                        color={star <= selectedRating ? "#FFD700" : "#333"} // Gold color for selected
                                        style={{ marginHorizontal: 5 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Later Button */}
                        <TouchableOpacity style={styles.laterBtn} onPress={closeRating}>
                            <Text style={styles.laterBtnText}>Later</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            </Modal>
            {/* --- RATING MODAL END --- */}

            {/* --- SHARE APP MODAL START --- */}
            <Modal
                visible={isShareVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeShare}
            >
                <Pressable style={styles.modalOverlay} onPress={closeShare}>
                    <Pressable style={styles.shareBox} onPress={(e) => e.stopPropagation()}>

                        <Text style={styles.modalTitle}>Share App</Text>

                        <Text style={styles.modalSubTitle}>
                            Share this app with your friends and family to help them translate easily.
                        </Text>

                        {/* Link Display & Copy Button Row */}
                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText} numberOfLines={1}>{appLink}</Text>
                            <TouchableOpacity onPress={copyToClipboard} style={styles.copyIconBtn}>
                                <MaterialCommunityIcons name="content-copy" size={20} color="#1E2B6D" />
                            </TouchableOpacity>
                        </View>

                        {/* Main Share Button */}
                        <TouchableOpacity style={styles.shareMainBtn} onPress={onShare}>
                            <MaterialCommunityIcons name="share-variant" size={20} color="white" />
                            <Text style={styles.shareBtnText}>Share Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={closeShare}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>

                    </Pressable>
                </Pressable>
            </Modal>
            {/* --- SHARE APP MODAL END --- */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
    profileSection: { alignItems: 'center', marginBottom: 20 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ccc' },
    userName: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
    userPhone: { color: 'gray', fontSize: 12 },
    editButton: { backgroundColor: '#1E2B6D', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15, marginTop: 10 },
    editText: { color: 'white', fontSize: 12 },

    sectionContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
    card: { backgroundColor: '#EFEEEF', borderRadius: 20, paddingVertical: 5 },
    itemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 3 },
    leftPart: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: { width: 35, height: 35, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    itemText: { fontSize: 16, color: '#000' },

    logoutButton: { backgroundColor: '#E0A800', borderWidth: 1, borderColor: 'red', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 15, marginTop: 8 },
    logoutText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    version: { textAlign: 'center', color: '#1E2B6D', marginVertical: 20, fontWeight: 'bold' },

    /* --- RATING MODAL CSS --- */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    ratingBox: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        // Shadow
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },

    modalSubTitle: {
        fontSize: 15,
        color: '#444',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        paddingHorizontal: 5
    },

    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    laterBtn: {
        backgroundColor: '#1E2B6D',
        paddingVertical: 6,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignSelf: 'flex-end' // right side align
    },

    laterBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    /* --- RATING MODAL END --- */

    /* --- APP SHER MODAL CSS --- */
  shareBox: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f2f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  linkText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    marginRight: 10
  },
  copyIconBtn: {
    padding: 5
  },
  shareMainBtn: {
    flexDirection: 'row',
    backgroundColor: '#1E2B6D',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  shareBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10
  },
  cancelBtn: {
    paddingVertical: 10
  },
  cancelBtnText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600'
  }
});