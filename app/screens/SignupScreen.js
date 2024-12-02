import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import mockUsers from '../../mockUsers';


export default function SignupScreen ({setIsAuthenticated})
{
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        setError(false);
        
        try{

            const trimmedUsername = username.trim();
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
    
            if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
                setError(true);
                setErrorText("Please fill in all the fields.");
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
    
            if (trimmedPassword.length < 6) {
                setError(true);
                setErrorText("Password must be at least 6 characters long.");
                setLoading(false);
                return;
            }
    
            const userExists = mockUsers.find(user => user.email === trimmedEmail || user.username === trimmedUsername);
            
            if (userExists) {
                setError(true);
                setErrorText("Oops! That email or username is already taken.");
            }else {
                await SecureStore.setItemAsync('loggedInUser', JSON.stringify({email: trimmedEmail, username: trimmedUsername, password: trimmedPassword}));
                mockUsers.push({email: trimmedEmail, username: trimmedUsername, password: trimmedPassword});
                console.log(mockUsers);
                Alert.alert('Success', 'Account created successfully!');
                setIsAuthenticated(true);
            }
        }catch (err) {
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
                <View className="flex justify-around w-full h-full pt-48">

                    {/*Title*/}
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration( 1000 ).springify()} className="text-5xl font-bold tracking-wider text-white">Sign Up</Animated.Text>
                    </View>

                    {/*Form*/}

                    <View className="flex items-center mx-4 space-y-4">
                        <Animated.View entering={FadeInDown.duration( 1000 ).springify()} className="w-full p-5 m-3 bg-black/5 rounded-2xl">
                            <TextInput 
                                placeholder="Username"
                                placeholderTextColor={'gray'}
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 200 ).duration( 1000 ).springify()} className="w-full p-5 m-3 bg-black/5 rounded-2xl">
                            <TextInput 
                                placeholder="Email"
                                placeholderTextColor={'gray'}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 400 ).duration( 1000 ).springify()} className="flex-row items-center w-full p-5 m-3 bg-black/5 rounded-2xl">
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

                        <Animated.View entering={FadeInDown.delay( 600 ).duration( 1000 ).springify()} className="flex items-center justify-center w-full p-5 mt-5 rounded-2xl">
                            <TouchableOpacity 
                                onPress={handleSignup}
                                className={`flex items-center justify-center w-full px-4 ${loading ? 'bg-sky-300' : 'bg-sky-400'} h-14 rounded-2xl`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    </View>
                                ) : (
                                    <Text className="text-xl font-bold text-center text-white">Sign Up</Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 800 ).duration( 1000 ).springify()} className="flex-row justify-center">
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push( 'Login' )}>
                                <Text className="font-bold text-sky-600"> Login</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>

                </View>
            </View>
        </View>
    )
}
