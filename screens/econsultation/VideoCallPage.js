// import { View, Text } from "react-native";
// import React from "react";
// import AgoraUIKit, { PropsInterface } from "agora-rn-uikit";
// import "expo-dev-client";

// const VideoCallPage = () => {
//   const [videoCall, setVideoCall] = useState(true);
//   const props = {
//     connectionData: {
//       appId: "<Agora App ID>",
//       channel: "test",
//     },
//     rtcCallbacks: {
//       EndCall: () => setVideoCall(false),
//     },
//   };

//   return videoCall ? (
//     <AgoraUIKit
//       connectionData={props.connectionData}
//       rtcCallbacks={props.rtcCallbacks}
//     />
//   ) : null;
// };

// export default VideoCallPage;



import { View, Text } from 'react-native'
import React from 'react'

const VideoCallPage = () => {
  return (
    <View>
      <Text>VideoCallPage</Text>
    </View>
  )
}

export default VideoCallPage