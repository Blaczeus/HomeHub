import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import mockUsers from '../../data/mockUsers';


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
                <Image source={require( '../../assets/images/background.jpg' )} className="absolute w-full h-full flex-1 bg-cover" />

                {/*Logo*/}
                <View className="absolute flex-row top-[25%] items-center justify-around w-full">
                    <Animated.Image entering={FadeInUp.delay( 400 ).duration( 1000 ).springify()} source={require( '../../assets/images/Logos/lightlogo-big.png' )} className="h-[95] w-[379] mb-10" />
                </View>

                {/*Title and Form*/}
                <View className="flex justify-around w-full h-full pt-40 pb-10">

                    {/*Title*/}
                    <View className="flex items-center top-[15%]">
                        <Animated.Text entering={FadeInUp.duration( 1000 ).springify()} className="text-2xl font-bold tracking-wider text-[#2E2E38] mb-10">Find your Perfect Home Now</Animated.Text>
                    </View>

                    {/*Form*/}

                    <View className="flex items-center mx-4 space-y-4">

                         <Animated.View entering={FadeInDown.duration( 1000 ).springify()} className="w-full p-3 m-5 bg-black/5 rounded-2xl">
                            <TextInput 
                                placeholder="Username" 
                                placeholderTextColor={'#2E2E38'} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 200 ).duration( 1000 ).springify()} className="w-full p-3 m-5 bg-black/5 rounded-2xl">
                            <TextInput 
                                placeholder="Email" 
                                placeholderTextColor={'#2E2E38'} 
                                autoCapitalize='none'
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 400 ).duration( 1000 ).springify()} className="flex-row items-center w-full p-3 m-3 bg-black/5 rounded-2xl">
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'#2E2E38'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                className='flex-1'
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text className="font-bold text-[#3F85D7]">{showPassword ? 'Hide' : 'Show'}</Text>
                            </TouchableOpacity>

                        </Animated.View>

                        {error && (
                            <Animated.Text entering={FadeIn} className="text-red-500 text-center font-bold text-lg mt-7">
                                {errorText}
                            </Animated.Text>
                        )}
                        
                        <Animated.View entering={FadeInDown.delay( 600 ).duration( 1000 ).springify()} className="flex items-center justify-center w-full p-3 mt-5 rounded-2xl">
                            <TouchableOpacity
                                onPress={handleSignup}
                                className={`w-full bg-[#3F85D7] p-4 rounded-2xl items-center justify-center ${loading ? 'opacity-70' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="large" color="#FFFFFF" />
                                ) : (
                                    <Text className="text-white text-lg font-bold">SignUp</Text>
                                )}
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay( 800 ).duration( 1000 ).springify()} className="flex-row justify-center">
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push( 'Login' )}>
                                <Text className="font-bold text-[#3F85D7]"> Login</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <View className="items-center absolute w-full top-[120%]">
                            <Animated.Image entering={FadeInUp.delay( 1000 ).duration( 1000 ).springify().damping( 2 )} source={require( '../../assets/images/nervego.png' )} className="h-[23] w-[191]" />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
