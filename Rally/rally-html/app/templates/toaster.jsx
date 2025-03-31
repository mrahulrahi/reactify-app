import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "toastify-react-native";
import { LinearGradient } from "expo-linear-gradient";


  export default function Toaster() {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <View className="bg-rally-bg-color flex-1 pt-32">            
            <View className="flex flex-col gap-3 py-4 px-5 bg-black min-h-screen">
  
              {/* SUCCESS TOAST */}
              <TouchableOpacity activeOpacity={0.8}
                className="py-[17px] px-[14px] bg-rally-green rounded-lg flex-row items-center"
                
              >
                <Image source={require("../../assets/images/checkmark.png")} style={{ width: 24, height: 24 }} />
                <Text className="text-rally-white ml-2 font-lexend500 text-[16px] leading-[1.2]">Login Successful</Text>
              </TouchableOpacity>         
  
              {/* ERROR TOAST */}
              <TouchableOpacity activeOpacity={0.8}>
                <LinearGradient
                  colors={["#FF1A61", "#990F3A"]}
                  start={{ x: 0, y: -50 }}
                  end={{ x: 1, y: -50 }}
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 17,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image source={require("../../assets/images/warning.png")} style={{ width: 24, height: 24 }} />
                  <Text className="text-rally-white ml-2 font-lexend500 text-[16px] leading-[1.2]">Login Error</Text>
                </LinearGradient>
              </TouchableOpacity>
  
              {/*WARNING TOAST */}
              <TouchableOpacity activeOpacity={0.8}
                className="py-[17px] px-[14px] bg-rally-yellow rounded-lg flex-row items-center"
                
              >
                <Image source={require("../../assets/images/warning.png")} style={{ width: 24, height: 24 }} />
                <Text className="text-rally-white ml-2 font-lexend500 text-[16px] leading-[1.2]">Username Doesn't Exist</Text>
              </TouchableOpacity>
  
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  