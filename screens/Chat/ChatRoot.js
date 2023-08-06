import { View, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/AuthContext";

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
  const { client } = useChatContext();

  const authCtx = useContext(AuthContext)
  const navigation= useNavigation()


  useEffect(() => {
    // connect the user

    const connectUser = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const idUser = authCtx.id.toString();
      console.log(" l'id de l'user :  ",idUser);

      await client.connectUser(
        {
          id: authCtx.id.toString(),
          name: `${authCtx.username}`,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken(authCtx.id.toString())
      );
      const channel = client.channel("livestream", "public", {
        name: "Public",
        // image: 'https://i.imgur.com/fR9Jz14.png',
      });
      await channel.create();
    };
    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, []);

  const isPrivate = {
    type: 'messaging',
    members: { $in: [authCtx.id.toString()] },
  };
  const isPublic = { type: 'livestream' };




  return (
    <SafeAreaView
      className="bg-white flex-1 relative px-[16px] pt-[44px] pb-8 "
      pointerEvents="box-none"
    >
      <ChannelList
      filters={{ $or: [isPrivate, isPublic] }}
      onSelect={(channel) => navigation.navigate("ChannelDetail" , { id:channel.id , idTest:"id" }) } />
    </SafeAreaView>
  );

  
};

export default ChatRoot;
