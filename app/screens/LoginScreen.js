import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import mockUsers from '../../mockUsers';


export default function LoginScreen ({setIsAuthenticated})
{
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(false);

        try{

            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            if (!trimmedEmail || !trimmedPassword) {
                setError(true);
                setErrorText("Please fill in all fields.");
                setLoading(false);
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(trimmedEmail)) {
                setError(true);
                setErrorText("Please enter a valid email address");
                setLoading(false);
                return;
            }

            const user = mockUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                await SecureStore.setItemAsync('loggedInUser', JSON.stringify(user));
                Alert.alert('Success', 'Login successful!');
                setIsAuthenticated(true);
            } else {
                setError(true);
                setErrorText("Invalid Credentials.");
            }
        } catch (err) {
            setError(true);
            setErrorText("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <View className="">
            <View className="w-full h-full bg-white">
                <StatusBar style="dark" />
                <Image source={require( '../../assets/images/background.png' )} className="absolute w-full h-full" />

                {/*Lights*/}
                <View className="absolute flex-row justify-around w-full">
                    <Animated.Image entering={FadeInUp.delay( 200 ).duration( 1000 ).springify().damping( 3 )} source={require( '../../assets/images/light.png' )} className="h-[225] w-[90]" />
                    <Animated.Image entering={FadeInUp.delay( 400 ).duration( 1000 ).springify().damping( 2 )} source={require( '../../assets/images/light.png' )} className="h-[160] w-[65]" />
                </View>

                {/*Title and Form*/}
                <View className="flex justify-around w-full h-full pt-40 pb-10">

                    {/*Title*/}
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration( 1000 ).springify()} className="text-5xl font-bold tracking-wider text-white">Login</Animated.Text>
                    </View>

                    {/*Form*/}
                    <View className="flex items-center mx-4 space-y-4">
                        <Animated.View entering={FadeInDown.duration( 1000 ).springify()} className="w-full p-5 m-5 bg-black/5 rounded-2xl">
                            <TextInput 
                                placeholder="Email" 
                                placeholderTextColor={'gray'} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 200 ).duration( 1000 ).springify()} className="flex-row items-center w-full p-5 m-3 bg-black/5 rounded-2xl">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'gray'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                className='flex-1'
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text className="font-bold text-sky-600">{showPassword ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>

                        </Animated.View>

                        {error && (
                            <Animated.Text entering={FadeIn} className="text-red-500 text-center font-bold text-lg">
                                {errorText}
                            </Animated.Text>
                        )}
                        
                        <Animated.View entering={FadeInDown.delay( 400 ).duration( 1000 ).springify()} className="flex items-center justify-center w-full p-5 mt-5 rounded-2xl">
                            <TouchableOpacity 
                                onPress={handleLogin}
                                className={`flex items-center justify-center w-full px-4 ${loading ? 'bg-sky-300' : 'bg-sky-400'} h-14 rounded-2xl`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                ) : (
                                    <Text className="text-xl font-bold text-center text-white">Login</Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 600 ).duration( 1000 ).springify()} className="flex-row justify-center">
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push( 'Signup' )}>
                                <Text className="font-bold text-sky-600"> Sign Up</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    )
}
