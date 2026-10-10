import { ONBOARDING_DATA } from '@/models/WalkthroughModel';
import { useOnboardingViewModel } from '@/viewmodels/WalkthroughViewModel';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Animated,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function OnboardingScreen() {
    const router = useRouter();
    const {
        scrollX,
        currentIndex,
        slidesRef,
        viewableItemsChanged,
        viewConfig,
        scrollToNext,
        width
    } = useOnboardingViewModel();

    return (
        <View style={styles.container}>
            {/* 1. FlatList for Swiping */}
            <FlatList
                data={ONBOARDING_DATA}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                renderItem={({ item }) => (
                    <View style={[styles.slide, { width }]}>
                        {/* Title & Description at Top */}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.descriptiontop}</Text>
                        </View>

                        {/* Image in Middle */}
                        <View style={styles.imageContainer}>
                            <View style={styles.imageCircle}>
                                <Image
                                    source={item.image}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        {/* Bottom Text */}
                        <View style={styles.bottomTextContainer}>
                            <Text style={styles.bottomDescription}>{item.descriptionbottom}</Text>
                        </View>
                    </View>
                )}
            />

            {/* 2. Pagination Dots & Footer */}
            <View style={styles.footer}>
                {/* Animated Dots - Pagination */}
                <View style={styles.pagination}>
                    {ONBOARDING_DATA.map((_, i) => {
                        const dotWidth = scrollX.interpolate({
                            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                            outputRange: [8, 20, 8],
                            extrapolate: 'clamp',
                        });
                        return <Animated.View key={i} style={[styles.dot, { width: dotWidth }]} />;
                    })}
                </View>

                {/* Buttons Logic */}
                <View style={styles.buttonContainer}>
                    {/* 1. Jo chelli screen na hoy (currentIndex < Last), to j SKIP batavo */}
                    {currentIndex < ONBOARDING_DATA.length - 1 ? (
                        <>
                            <TouchableOpacity onPress={() => router.replace('/account')}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => scrollToNext(ONBOARDING_DATA.length)}>
                                {/* Next ne pan Skip jevu simple text style apyu che */}
                                <Text style={styles.skipText}>Next</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        /* 2. Jo chelli screen hoy, to fakt START TRANSLATING button (Full Width) */
                        <TouchableOpacity
                            style={styles.fullStartButton}
                            onPress={() => scrollToNext(ONBOARDING_DATA.length)}
                        >
                            <Text style={styles.fullStartButtonText}>Start Translating</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 40,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageCircle: {
        width: 260,
        height: 260,
        backgroundColor: '#E6F0FF',
        borderRadius: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    bottomTextContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    bottomDescription: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        height: 8,
        backgroundColor: '#1E2B6D',
        marginHorizontal: 4,
        borderRadius: 4,
    },
    nextButton: {
        backgroundColor: '#1E2B6D',
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 12,
    },
    startButton: {
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    minHeight: 60,
    },
    skipText: {
        fontSize: 16,
        color: '#1E2B6D',
        fontWeight: '600',
    },
    fullStartButton: {
        backgroundColor: '#1E2B6D',
        width: '100%', 
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullStartButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});