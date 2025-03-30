import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MasonryFlashList } from "@shopify/flash-list";
import { Video } from 'expo-av';

// Icons
const icon1 = require('@/assets/images/action-icon-4.png');
const icon1Dark = require('@/assets/images/action-icon-4-dark.png');
const icon2 = require('@/assets/images/videocam.png');
const icon2Dark = require('@/assets/images/videocam-dark.png');

// Image Data
const imageData = [
  { title: "First Item", img: 'img-1', height: 118 },
  { title: "Second Item", img: 'img-2', height: 246 },
  { title: "Third Item", img: 'img-3', height: 118 },
  { title: "Fourth Item", img: 'img-4', height: 203 },
  { title: "Fifth Item", img: 'img-5', height: 203 },
  { title: "Sixth Item", img: 'img-6', height: 118 },
  { title: "Seventh Item", img: 'img-7', height: 203 },
  { title: "Eighth Item", img: 'img-8', height: 246 },
  { title: "Ninth Item", img: 'img-9', height: 203 },
];

const images = {
  'img-1': require('@/assets/images/my-creations-img-1.jpg'),
  'img-2': require('@/assets/images/my-creations-img-2.jpg'),
  'img-3': require('@/assets/images/my-creations-img-3.jpg'),
  'img-4': require('@/assets/images/my-creations-img-4.jpg'),
  'img-5': require('@/assets/images/my-creations-img-5.jpg'),
  'img-6': require('@/assets/images/my-creations-img-6.jpg'),
  'img-7': require('@/assets/images/my-creations-img-7.jpg'),
  'img-8': require('@/assets/images/my-creations-img-8.jpg'),
  'img-9': require('@/assets/images/my-creations-img-9.jpg'),
};

// Video Data
const videoData = [
  { title: "Video 1", video: { uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' }, height: 200 },
  { title: "Video 2", video: { uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }, height: 250 },
  { title: "Video 3", video: { uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }, height: 220 },
];

// Image Item Component
const ImageItem = ({ title, img, height }) => (
  <View style={[styles.itemContainer, { height }]}>
    <Image style={[styles.image, { height }]} source={images[img]} resizeMode="cover" />
  </View>
);

// Video Item Component (Ensures only one video plays at a time)
const VideoItem = ({ title, video, height, activeVideoRef, setActiveVideoRef }) => {
  const videoRef = useRef(null);

  const handlePlayPause = async () => {
    if (activeVideoRef.current && activeVideoRef.current !== videoRef.current) {
      await activeVideoRef.current.pauseAsync();
    }

    setActiveVideoRef(videoRef);
    await videoRef.current.playAsync();
  };

  return (
    <TouchableOpacity style={[styles.itemContainer, { height }]} onPress={handlePlayPause}>
      <Video
        ref={videoRef}
        source={video}
        style={[styles.video, { height }]}
        resizeMode="cover"
        useNativeControls
        isLooping={false}
      />
    </TouchableOpacity>
  );
};

const Creations = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'video'
  const activeVideoRef = useRef(null); // Track currently playing video

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} className="p-2">
            <FontAwesome6 name="chevron-left" size={26} color="white" />
          </TouchableOpacity>

          {/* Toggle Button (Image / Video) */}
          <View className="flex-row gap-2 bg-[#23292B] border border-[#4D5658] rounded-[46px] overflow-hidden">
            {/* Image Toggle */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => setActiveTab('image')}
              className={`flex-row items-center gap-2 px-4 py-2.5 ${activeTab === 'image' ? 'bg-bs-white rounded-[46px]' : 'bg-transparent'}`}
            >
              <Image className="!w-6 !h-6" source={activeTab === 'image' ? icon1Dark : icon1} resizeMode="contain" />
              <Text className={`font-inter700 text-base ${activeTab === 'image' ? 'text-bs-black' : 'text-[#979797]'}`}>
                Image
              </Text>
            </TouchableOpacity>

            {/* Video Toggle */}
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => setActiveTab('video')}
              className={`flex-row items-center gap-2 px-4 py-2.5 ${activeTab === 'video' ? 'bg-bs-white rounded-[46px]' : 'bg-transparent'}`}
            >
              <Image className="!w-6 !h-6" source={activeTab === 'video' ? icon2Dark : icon2} resizeMode="contain" />
              <Text className={`font-inter700 text-base ${activeTab === 'video' ? 'text-bs-black' : 'text-[#979797]'}`}>
                Video
              </Text>
            </TouchableOpacity>
          </View>

          {/* Help Button */}
          <TouchableOpacity activeOpacity={0.7} onPress={() => alert('Help')} className="p-2">
            <Octicons name="question" size={26} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <MasonryFlashList
            data={activeTab === 'image' ? imageData : videoData}
            ListHeaderComponent={() => (
              <Text className="font-inter500 text-2xl leading-none text-bs-white mb-[10px] px-6">
                {/* {activeTab === 'image' ? 'My Image Creations' : 'My Video Creations'} */}
                My Creations
              </Text>
            )}
            numColumns={2}
            renderItem={({ item }) => 
              activeTab === 'image' 
                ? <ImageItem title={item.title} img={item.img} height={item.height} /> 
                : <VideoItem 
                    title={item.title} 
                    video={item.video} 
                    height={item.height} 
                    activeVideoRef={activeVideoRef}
                    setActiveVideoRef={(ref) => (activeVideoRef.current = ref)}
                  />
            }
            keyExtractor={(item) => item.title}
            estimatedItemSize={200}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
          />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0F11',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  content: {
    flex: 1,
  },
  columnWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 10, 
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 4, 
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3E3E3E',
    marginBottom: 10, 
  },
  image: {
    width: '100%',
    borderRadius: 18,
  },
  video: {
    width: '100%',
    borderRadius: 18,
  },
});

export default Creations;



