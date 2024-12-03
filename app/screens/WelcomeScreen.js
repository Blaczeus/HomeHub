import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({}) {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        navigation.navigate('Login');
    };

    return (
        <View className="">
            <View className="w-full h-full bg-white">
                <StatusBar style="dark" />
                {/* Background Image */}
                <Image
                    source={require('../../assets/images/background.jpg')}
                    className="absolute w-full h-full flex-1 bg-cover"
                />

                {/* Logo and Illustration */}
                <View className="absolute flex-col top-[17%] items-center justify-around w-full">
                    <Animated.Image
                        entering={FadeInUp.delay(200).duration(1000).springify()}
                        source={require('../../assets/images/undraw_house_searching_re_stk8 2 (1).png')}
                        className="h-[219] w-[405] mb-20"
                    />
                    <Animated.Image entering={FadeInUp.delay( 400 ).duration( 1000 ).springify()} source={require( '../../assets/images/Logos/lightlogo-big.png' )} className="h-[95] w-[379] mb-10" />
                </View>

                {/* Title and Button */}
                <View className="flex justify-around w-full h-full pt-40 pb-10">
                    {/* Title */}
                    <View className="flex items-center top-[30%]">
                        <Animated.Text
                            entering={FadeInUp.delay( 600 ).duration(1000).springify()}
                            className="text-2xl font-bold tracking-wider text-[#2E2E38] mb-10"
                        >
                            Find Your Perfect Home in Lagos
                        </Animated.Text>
                    </View>

                    {/* Get Started Button */}
                    <View className="flex items-center mx-8">
                        <Animated.View
                            entering={FadeInUp.delay(800).duration(1000).springify()}
                            className="w-full"
                        >
                            <TouchableOpacity
                                onPress={handleGetStarted}
                                className="bg-[#3F85D7] p-6 rounded-3xl items-center"
                            >
                                <Text className="relative w-fit [font-family:'Poppins-Bold',Helvetica] font-bold text-white text-[17px] text-center tracking-[0] leading-[22px] whitespace-nowrap">Get Started</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                    {/* Footer */}
                    <View className="items-center absolute w-full bottom-[5%]">
                        <Animated.Image
                            entering={FadeInUp.delay(1000).duration(1000).springify().damping(2)}
                            source={require('../../assets/images/nervego.png')}
                            className="h-[23] w-[191]"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
