import axios from "axios";
import { BASE_URL } from "../config";
import { tokenStorage } from "../storage";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { useAuthStore } from "../authStore";
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { appAxios } from "./apiInterceptors";


GoogleSignin.configure({
    webClientId:'195862165902-4bgrokb7e38984d8o5e95aog4b573la2.apps.googleusercontent.com',
    forceCodeForRefreshToken:true,
    offlineAccess:true,
    iosClientId:'195862165902-ht898gojji8gtl2ccj9kk1ekkcftktja.apps.googleusercontent.com',
})

export const signInWithGoogle = async()=> {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const res = await GoogleSignin.signIn();

        const apiRes = await axios.post(`${BASE_URL}/oauth/login`,{
            id_token: res.data?.idToken
        });

        const {tokens,user} = apiRes.data 

        tokenStorage.set("accessToken",tokens?.access_token);
        tokenStorage.set("refreshToken",tokens?.refresh_token);

        const {setUser} = useAuthStore.getState();
        setUser(user);
        resetAndNavigate('/(home)/home');


       
    } catch (error) {
        
    }

}

export const signUpWithGoogle = async(data:any) => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signOut();
        const res = await GoogleSignin.signIn();

        const apiRes = await axios.post(`${BASE_URL}/oauth/login`,{
            id_token: res.data?.idToken,
            ...data
        });

        const {tokens,user} = apiRes.data

        tokenStorage.set("accessToken",tokens?.access_token);
        tokenStorage.set("refreshToken",tokens?.refresh_token);

        const {setUser} = useAuthStore.getState();
        setUser(user);
        resetAndNavigate('/(home)/home');



    } catch (error:any) {
         console.log("Error in signup with google",error);
        
    }
}

export const checkUsername = async(username:string) => {
    try {
         const apiRes = await axios.post(`${BASE_URL}/user/check-username`,{
               username
     } );
        return apiRes.data?.available;
    } catch (error) {
        console.log("Error in check username",error);
        return false;
    }
}