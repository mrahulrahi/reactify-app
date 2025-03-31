// import React, { useState } from "react";
// import { Modal, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
// import GradientButton from "../../components/GradientButton";


// const avatars = [
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   require("../../../assets/images/corey-herwitz.png"),
//   // Add more avatars...
// ];

// const AvatarSelectionModal = ({ visible, onClose }) => {
//   const [selectedAvatar, setSelectedAvatar] = useState(null);

//   return (
//     <Modal animationType="fade" transparent={false} visible={visible}>
//       <View className="flex-1 bg-rally-bg-color justify-center">
//       <View className="flex-row px-5 py-4 justify-between items-center bg-blue-500">
//           <Text className="text-[20px] font-lexend500 text-rally-white">Choose Avatar</Text>
//           <TouchableOpacity onPress={onClose} className="me-1">
//             <Text className="text-rally-white text-xl">✕</Text>
//           </TouchableOpacity>
//         </View>
//         <View className="flex-1">
//           <ScrollView className="bg-red-950" showsVerticalScrollIndicator={false}>
//             <View className="flex-row flex-wrap justify-center gap-4">
//               {avatars.map((avatar, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => setSelectedAvatar(avatar)}
//                   className={`rounded-full ${
//                     selectedAvatar === avatar ? "border-4 border-blue-500" : ""
//                   }`}
//                 >
//                   <Image style={{width:86, height:86}} source={avatar} className="rounded-full" />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>
//         </View>
//         <View className="px-5 py-4 bg-pink-400">
//         <GradientButton title="UPDATE PROFILE PICTURE" type="blue" onPress={onClose}/>
//         {/* <TouchableOpacity
//           className=" bg-blue-600 rounded"
//           onPress={onClose}
//         >
//           <Text className="text-white text-center font-bold">
//             UPDATE PROFILE PICTURE
//           </Text>
//         </TouchableOpacity> */}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default AvatarSelectionModal;


import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import GradientButton from "../../components/GradientButton";

const avatars = Array(32).fill(require("../../../assets/images/corey-herwitz.png"));

const AvatarSelectionModal = ({ visible, onClose }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-full h-[90%] bg-[#1E2024] rounded-xl overflow-hidden">
          <View className="flex-row px-5 py-4 justify-between items-center">
            <Text className="text-[20px] font-lexend500 text-rally-white">Choose Avatar</Text>
            <TouchableOpacity onPress={onClose} className="me-1">
              <Text className="text-rally-white text-xl">✕</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <ScrollView className="p-5 pb-12" showsVerticalScrollIndicator={false}>
              <View className="flex-row flex-wrap justify-center gap-4">
                {avatars.map((avatar, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedAvatar(avatar)}
                    className={`rounded-full ${selectedAvatar === avatar ? "border-4 border-blue-500" : ""}`}
                  >
                    <Image style={{ width: 78, height: 78 }} source={avatar} className="rounded-full" />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View className="px-5 py-4">
            <GradientButton title="UPDATE PROFILE PICTURE" type="blue" onPress={onClose} />
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default AvatarSelectionModal;

