import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { Platform } from "react-native";

export const onNotificationPress = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("remote Message KILL state", remoteMessage);
        navigateToOrderDetails(remoteMessage);
      }
    });
};

export const onBackgroundNotificationPress = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage) {
      navigateToOrderDetails(remoteMessage);
    }
    console.log(
      "Notification caused app to open from BACKGROUND state:",
      remoteMessage.notification
    );
  });
};

export const onMessage = () => {
  if (Platform.OS === "android") {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived! ACTIVE APP", remoteMessage);
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }
};

export const onMessageReceived = (remoteMessage: any) => {
  onDisplayNotification(remoteMessage);
};

async function onDisplayNotification(message: any) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
    importance: AndroidImportance.HIGH,
  });
  notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
      pressAction: {
        id: "default",
        launchActivity: "default",
      },
    },
  });
}

export const navigateToOrderDetails = (remoteMessage: any) => {
  
};

export const openAppNotifiactionEvent = async () => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        setAsyncNotifiactionData(null);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        break;
    }
  });
};
