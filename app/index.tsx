import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'
import { splashStyles } from '@/styles/splashStyles'
import { resetAndNavigate } from '@/utils/LibraryHelpers'
import { tokenStorage } from '@/service/storage';

interface DecodedToken {
  exp:number;
}

const Main = () => {

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
  }

  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate('/(auth)/signin')
    }, 3000)
  }, []);

  return (
    <View style={splashStyles.container}>
      <Image 
         source = {require('@/assets/images/adaptive-icon.png')}
         style = {splashStyles.logo}
         />
    </View>
  )
}

export default Main