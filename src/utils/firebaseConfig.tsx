import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { asyncKeys } from "./asyncStorageManager";
import { infoToast } from "./commonFunction";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import { GOOGLE_WEB_CLINET_ID } from "./apiConstants";
// import appleAuth from "@invertase/react-native-apple-authentication";
// import auth from "@react-native-firebase/auth";
// import { getUniqueId } from "react-native-device-info";
// import store from "../redux";
// import { updateProfile } from "../actions";
// import {
//   AccessToken,
//   AuthenticationToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
//   Profile,
// } from "react-native-fbsdk-next";

export async function requestNotificationUserPermission() {
  if (Platform.OS === "android") {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    if (authStatus === 1) {
      if (Platform.OS === "ios") {
        await messaging()
          .registerDeviceForRemoteMessages()
          .then(async () => {
            getFirebaseToken();
          })
          .catch(() => {
            getFirebaseToken();
          });
      } else {
        getFirebaseToken();
      }
    } else {
      await messaging().requestPermission();    }
  } else {
    await messaging().requestPermission();
    infoToast("Please allow to notifications permission");
  }
}

const getFirebaseToken = async () => {
  await messaging()
    .getToken()
    .then((fcmToken) => {
      if (fcmToken) {
        console.log("---fcmToken---", fcmToken);
        AsyncStorage.setItem(asyncKeys.fcm_token, fcmToken);
        // infoToast(fcmToken.toString());
      } else {
        infoToast("[FCMService] User does not have a device token");
      }
    })
    .catch((error) => {
      let err = `FCm token get error${error}`;
      infoToast(error);
      console.log(err);
    });
};

// export const onGoogleLogin = async (onSucess: (res: any) => void) => {
//   GoogleSignin.configure({
//     webClientId: GOOGLE_WEB_CLINET_ID,
//   });
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     console.log("GoogleSignin userInfo", userInfo);
//     if (onSucess) onSucess(userInfo);
//   } catch (error: any) {
//     console.log("error", error);
//     if (error?.code === statusCodes?.SIGN_IN_CANCELLED) {
//       infoToast("user cancelled the login flow");
//     } else if (error?.code === statusCodes?.IN_PROGRESS) {
//       infoToast("operation (e.g. sign in) is in progress already");
//       // operation (e.g. sign in) is in progress already
//     } else if (error?.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//       infoToast("play services not available or outdated");
//     } else {
//       // some other error happened
//       infoToast("Something went wrong, please try again");
//     }
//   }
// };

// export async function onAppleLogin() {
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: appleAuth.Operation.LOGIN,
//     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//   });

//   if (!appleAuthRequestResponse.identityToken) {
//     infoToast("Apple Sign-In failed - no identify token returned");
//     throw "Apple Sign-In failed - no identify token returned";
//   }

//   const { identityToken, nonce } = appleAuthRequestResponse;
//   const appleCredential = auth.AppleAuthProvider.credential(
//     identityToken,
//     nonce
//   );
//   return auth().signInWithCredential(appleCredential);
// }

// export const formDataAppleLogin = async (response: any) => {
//   let deviceToken = await getAsyncFcmToken();
//   let uniqueId = await getUniqueId();
//   var str = response.user.email;
//   str = str?.split("@");
//   let data = new FormData();
//   data.append("name", str?.[0]);
//   data.append("email", response.user.email);
//   data.append("appleId", response.user.uid);
//   data.append("deviceToken", deviceToken || uniqueId);
//   return data;
// };

// export const formDataGoogleLogin = async (response: any) => {
//   let deviceToken = await getAsyncFcmToken();
//   let uniqueId = await getUniqueId();
//   const { name, email, id } = response?.user;
//   let data = new FormData();
//   data.append("name", name);
//   data.append("email", email);
//   data.append("googleId", id);
//   data.append("deviceToken", deviceToken || uniqueId);
//   return data;
// };

// export const onFacebookLogin = async (onSucess: (res: any) => void) => {
//   LoginManager.logOut();
//   try {
//     let res = await LoginManager.logInWithPermissions(
//       ["public_profile", "email"],
//       "enabled",
//       "my_nonce"
//     );

//     if (res?.isCancelled) {
//       infoToast("User cancelled the login process");
//     }

//     if (Platform.OS === "ios") {
//       await AuthenticationToken.getAuthenticationTokenIOS();
//       Profile.getCurrentProfile().then(function (currentProfile) {
//         if (currentProfile) {
//           console.log("currentProfile", currentProfile);
//           let obj = {
//             name: currentProfile.firstName + " " + currentProfile.lastName,
//             email: currentProfile.email,
//             id: currentProfile.userID,
//           };
//           onSucess(obj);
//         }
//       });
//     } else {
//       const result1: any = await AccessToken.getCurrentAccessToken();
//       getFacebookToken(result1?.accessToken, (res) => {
//         onSucess(res);
//       });
//     }
//   } catch (error) {}
// };

// const getFacebookToken = async (
//   token: string,
//   onSucess: (res: any) => void
// ) => {
//   const PROFILE_REQUEST_PARAMS = {
//     fields: {
//       string: "id, name, first_name, last_name, birthday, email",
//     },
//   };
//   const profileRequest = new GraphRequest(
//     "/me",
//     { accessToken: token, parameters: PROFILE_REQUEST_PARAMS },
//     (error: any, result: any) => {
//       if (error) {
//       } else {
//         if (result.isCancelled) {
//         }
//         if (result.email === undefined) {
//           errorToast("To contiune Bastah please allow access to your email");
//         } else {
//           console.log("result:::::", result);
//           onSucess(result);
//           return result;
//           // onFacebookLogin(result.name, result.email, result.id);
//         }
//       }
//     }
//   );
//   new GraphRequestManager().addRequest(profileRequest).start();
// };
