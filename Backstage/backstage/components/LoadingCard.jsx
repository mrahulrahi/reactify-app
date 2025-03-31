

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const LoadingCard = ({ 
  message = 'Generating...', 
  aspectRatio, 
  type, 
  description = 'A rainbow shoe, glistening in the sun, cinematic, 8k resolution camera.', 
  buttonVisibility = 'imageAndStyle' 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 50);

    return () => clearInterval(interval); 
  }, []);

  const aspectStyle = aspectRatio === "1/1" ? { aspectRatio: 1 } : { aspectRatio };

  const renderButton = (buttonIndex) => {
    if (buttonVisibility === 'imageOnly' && buttonIndex === 1) {
      return true;
    }
    if (buttonVisibility === 'imageOrStyle' && (buttonIndex === 1 || buttonIndex === 2)) {
      return true;
    }
    if (buttonVisibility === 'imageAndStyle') {
      return true;
    }
    return false;
  };  
  return (
    <View className="bg-[#0F0F0F] p-2.5 border border-[#4D5658] rounded-[30px] min-h-[350px] !max-w-[90vw] !w-full  max-h-[70vh]  h-auto" style={aspectStyle}>
      <View className="!w-full grow rounded-[26px] overflow-hidden relative">
        <View className='absolute left-0 right-0 top-0 bottom-0'>
          <Image  
            source={require('@/assets/images/gen.gif')}
            style={{ width: '100%', height: '100%', resizeMode:'cover', opacity: 0.5, borderRadius: 26, overflow: 'hidden' }}
            contentFit="cover"
          />
        </View>

        <View className="grow-0 flex-row absolute top-0 left-0 right-0 pt-[20px] px-[20px] justify-between">
          {/* First Button */}
          {renderButton(1) && (
            <View className='!max-w-[144px]' style={{ flexGrow: 1, flexBasis: 0, maxWidth: '144px' }}>
              <TouchableOpacity
                activeOpacity={1}
                className="grow h-[59px] flex-row items-center justify-center gap-2 py-4 px-3 bg-bs-gray-bg/20 border border-[#4D5658] rounded-[18px]"
                onPress={() => alert('Action 1')}
              >
                <Image
                  source={type === 'video' ? require('@/assets/images/video-icon.png') : require('@/assets/images/action-icon-4.png')}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                  transition={1000}
                />
                <Text className="font-inter400 text-base leading-none text-bs-silver-sand">
                  {type === 'video' ? 'Video' : 'Image'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Second Button */}
          {renderButton(2) && (
            <View className='!max-w-[144px]' style={{ flexGrow: 1, flexBasis: 0, maxWidth: '144px', marginLeft: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                className="grow h-[59px] flex-row bg-[#0F0F0F] border border-[#4D5658] rounded-[18px] overflow-hidden"
                onPress={() => alert('Action 2')}
              >
                <View className="w-1/2 h-full">
                  <Image
                    source={require('@/assets/images/gallery-img-2.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <View className="w-1/2 h-full items-center justify-center">
                  <Image
                    source={require('@/assets/images/action-icon-4.png')}
                    style={{ width: 24, height: 24 }}
                    contentFit="contain"
                    transition={1000}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {renderButton(3) && (
            <View className='!max-w-[144px]' style={{ flexGrow: 1, flexBasis: 0, maxWidth: '144px', marginLeft: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                className="grow h-[59px] flex-row bg-[#0F0F0F] border border-[#4D5658] rounded-[18px] overflow-hidden"
                onPress={() => alert('Action 3')}
              >
                <View className="w-1/2 h-full">
                  <Image
                    source={require('@/assets/images/loading-img-1.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <View className="w-1/2 h-full items-center justify-center">
                  <Image
                    source={type === 'video' ? require('@/assets/images/action-icon-4.png') : require('@/assets/images/action-icon-5.png')}
                    style={{ width: 24, height: 24 }}
                    contentFit="contain"
                    transition={1000}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="flex-1 absolute top-1/2 -translate-y-1/2 items-center justify-center gap-5 self-center">
          <AnimatedCircularProgress
            size={57}
            width={4}
            fill={progress}
            tintColor="#ffffff"
            backgroundColor="#4A5568"
          />
          <Text className="font-inter400 text-base leading-none text-bs-silver-sand">{message}</Text>
        </View>
      </View>
      <View className='shrink-0'>
        <Text className="font-inter400 px-3 pt-5 pb-3 text-[17.4px] leading-[1.15] text-bs-silver-sand">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default LoadingCard;
