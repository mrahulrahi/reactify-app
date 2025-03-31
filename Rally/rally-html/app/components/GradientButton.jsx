
import { useRouter } from "expo-router";  
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const gradients = {
    blue: ['#1E90FF', '#0D4C8A'],
    green: ['#27A356', '#27A356'],
    yellow: ['#FFD700', '#FF7700']
};

const GradientButton = ({ title, onAction, type = 'blue', disabled }) => {
    const router = useRouter(); 

    const handlePress = () => {
        if (!disabled) {
            if (typeof onAction === "string") {
                router.push(onAction.startsWith("/") ? onAction : `/${onAction}`);
            } else if (typeof onAction === "function") {
                onAction();
            }
        }
    };

    return (
        <TouchableOpacity 
            disabled={disabled} 
            activeOpacity={disabled ? 1 : 0.7}  // Reduce opacity on press when enabled
            onPress={handlePress}
            style={{
                opacity: disabled ? 0.4 : 1,  // ✅ Apply opacity when disabled
                cursor: disabled ? 'not-allowed' : 'pointer'  // ✅ Apply cursor style
            }}
        >
            <LinearGradient 
                style={{
                    width: '100%', 
                    paddingHorizontal: 20, 
                    paddingVertical: 15, 
                    borderRadius: 10
                }} 
                colors={gradients[type]}
            >
                <Text className="font-lexend500 text-sm leading-tight tracking-[0.02em] text-rally-white text-center uppercase">
                    {title}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

