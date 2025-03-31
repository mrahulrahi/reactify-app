import { useMemo } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const gradients = {
    blue: ['#1E90FF', '#0D4C8A'],
    green: ['#27A356', '#27A356'],
    yellow: ['#FFD700', '#FF7700']
};

const GradientButton = ({ title, onAction, type = 'blue', disabled }) => {
    const colors = useMemo(() => gradients[type] || gradients.blue, [type]);

    const handlePress = () => {
        if (typeof onAction === "string") {
            router.push(onAction);
        } else if (typeof onAction === "function") {
            onAction();
        }
    };

    return (
        <TouchableOpacity disabled={disabled} activeOpacity={1} className={disabled ? 'w-full opacity-40 cursor-none' : null} onPress={handlePress}>
            <LinearGradient style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10, overflow: 'hidden' }} colors={colors} start={{ x: 0.15, y: -0.15 }} end={{ x: 1, y: 1 }}>
                <Text className="font-lexend500 text-sm leading-tight tracking-[0.02em] text-rally-white text-center uppercase">{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )

}

export default GradientButton