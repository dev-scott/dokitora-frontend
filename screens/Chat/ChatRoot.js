import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const ChatRoot = () => {
  const [channel, setChannel] = useState();

  if (channel) {
    return (
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
      
    );
  }

  const navigation= useNavigation()

  return (
    <SafeAreaView
      className="bg-white flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <ChannelList onSelect={(channel) => navigation.navigate("ChannelDetail" , { id:channel.id , idTest:"id" }) } />
    </SafeAreaView>
  );
};

export default ChatRoot;
