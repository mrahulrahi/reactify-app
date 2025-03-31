import React, { useState, useRef,useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,LayoutAnimation, UIManager, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MasonryFlashList } from "@shopify/flash-list";
import { Video } from 'expo-av';
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AssetCard from '../../components/AssetCard';

const userIcon = require('@/assets/images/user-icon.png');

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

filterData = ['All', 'Images', 'Videos']

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
// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const Creations = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'video'
  const activeVideoRef = useRef(null); // Track currently playing video
  const [selectedFilter, setSelectedFilter] = useState('All'); // Track selected filter



  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // Animate layout changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1' edges={['top']}>
        <View className='flex-1 bg-bs-bg-color pt-2.5'>
          <View className='flex-row justify-between items-center'>
            {/* Back Button */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} className="p-2">
              <FontAwesome6 name="chevron-left" size={26} color="white" />
            </TouchableOpacity>

            {/* User Profile Info */}
            <TouchableOpacity
              activeOpacity={1}
              className="flex-row items-center gap-3"
            >
              <Image className="!w-[35px] !h-[35px]" source={userIcon} resizeMode="contain" />
              <Text className="font-inter700 text-base leading-tight text-bs-white">
                Jimmy Simmons
              </Text>
            </TouchableOpacity>

            {/* Help Button */}
            <TouchableOpacity activeOpacity={0.7} 
            onPress={() => router.push("general/noCreations")}
            className="p-2">
              <Octicons name="question" size={26} color="white" />
            </TouchableOpacity>
          </View>
          {/* Content Section */}
          <View className='flex-1'>
            <MasonryFlashList
              data={activeTab === 'image' ? imageData : videoData}
              ListHeaderComponent={() => (
                <>

                {/* generation in progress expandable card start */}
                <LinearGradient colors={["#EF56EF", "#9363EC"]} start={{ x: 0.2, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 1, borderRadius: 18, marginBottom:24 }}>
                  <View className='relative bg-black/80 rounded-[17px] overflow-hidden'>

                    <View className='w-100 flex-row items-center justify-between pe-[8px] py-[8px] ps-[14px]'>
                      <View className='flex-row items-center gap-[14px]'>
                          <View><SimpleLineIcons name="refresh" size={18} color="#E8EAED" /></View>
                          <Text className="font-poppins400 text-white text-[18px] leading-tight">Generating Assets</Text>
                      </View>
                      <TouchableOpacity activeOpacity={1}
                          onPress={toggleExpand}
                          className="flex-row items-center gap-[11px] bg-white/10 rounded-[20px] pe-[6px] py-[6px] ps-[15px]"
                        >
                          <View><Text className='font-inter700 text-[16px] text-white'>2</Text></View>
                          <View className='w-[28px] h-[29px] bg-white/10 rounded-full flex items-center justify-center'>
                           <Entypo name={expanded ? "chevron-up" : "chevron-down"} size={14} color="#D9D9D9" />
                          </View>
                      </TouchableOpacity> 
                    </View>
                    {/* Expandable Content */}
                      {expanded && (
                        <View className="flex-1 px-2 pt-1.5 pb-3.5 flex flex-col gap-6">
                          <AssetCard
                            title="A smiling gopher watching the sunset..."
                            type="video"
                            image={require("../../assets/images/g-image-1.jpg")}
                          />
                          <AssetCard
                            title="Generation in progress..."
                            type="image"
                            image={require("../../assets/images/video-gen.jpg")}
                          />
                        </View>
                      )}
                  </View>
                </LinearGradient>
                {/* generation in progress expandable card end */}                  

               







                  <Text className="font-inter500 text-2xl leading-tight text-bs-white mb-2.5 px-1">
                    My Creations
                  </Text>
                  <ScrollView className="mb-4" horizontal>
                    <View className="flex-row gap-1.5">
                      {filterData.map((item) => (
                        <TouchableOpacity
                          activeOpacity={1}
                          key={item}
                          className={`min-w-28 flex-row items-center justify-center px-6 py-2.5 rounded-full border
                            ${selectedFilter === item ? "bg-white border-white" : "bg-[#23292B] border-[#23292B]"}`}
                          onPress={() => setSelectedFilter(item)}
                        >
                          <Text
                            className={`font-inter700 text-base leading-tight ${selectedFilter === item ? "text-black" : "text-[#969696]"}`}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </>
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
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

 
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



