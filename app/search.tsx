import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Text,
    Dimensions,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import moviesData from '../data/movies.json';

const { width } = Dimensions.get('window');
const GAME_CARD_WIDTH = width / 3 - 16;

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();

    // Get mobile games and TV shows/movies
    const mobileGames = moviesData.movies[0].movies;
    const tvAndMovies = moviesData.movies[1].movies;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder="Search games, shows, movies..."
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            <ScrollView style={styles.content}>
                {/* Mobile Games Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recommended Mobile Games</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.gamesRow}
                    >
                        {mobileGames.map((game, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.gameCard}
                                onPress={() => router.push(`/movie/${game.id}`)}
                            >
                                <Image
                                    source={{ uri: game.imageUrl }}
                                    style={styles.gameImage}
                                />
                                <Text style={styles.gameTitle} numberOfLines={2}>
                                    {game.title}
                                </Text>
                                <Text style={styles.gameType}>
                                    {game.type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* TV Shows & Movies Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recommended TV Shows & Movies</Text>
                    <View style={styles.showsList}>
                        {tvAndMovies.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.showItem}
                                onPress={() => router.push(`/movie/${item.id}`)}
                            >
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.showImage}
                                />
                                <View style={styles.showInfo}>
                                    <Text style={styles.showTitle}>{item.title}</Text>
                                </View>
                                <TouchableOpacity style={styles.playButton}>
                                    <Ionicons name="play-circle-outline" size={32} color="white" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        marginRight: 12,
    },
    searchInputContainer: {
        flex: 1,
        height: 36,
        backgroundColor: '#333',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    section: {
        paddingVertical: 16,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    gamesRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
    gameCard: {
        width: GAME_CARD_WIDTH,
    },
    gameImage: {
        width: GAME_CARD_WIDTH,
        height: GAME_CARD_WIDTH,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    gameTitle: {
        color: 'white',
        fontSize: 14,
        marginTop: 8,
    },
    gameType: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    showsList: {
        paddingHorizontal: 16,
    },
    showItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    showImage: {
        width: 120,
        height: 70,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    showInfo: {
        flex: 1,
        marginLeft: 12,
    },
    showTitle: {
        color: 'white',
        fontSize: 16,
    },
    playButton: {
        padding: 8,
    },
});