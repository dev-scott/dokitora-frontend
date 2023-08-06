import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import ChatRoot from "./ChatRoot";
import { useChatContext } from "stream-chat-expo";
import { AuthContext } from "../../store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LayoutRoot = () => {
  const { client } = useChatContext();

  const authCtx = useContext(AuthContext);
  const idUser = authCtx.id.toString();

  useEffect(() => {
    // connect the user

    const connectUser = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      console.log(idUser);

      await client.connectUser(
        {
          id: idUser,
          name: `${authCtx.username}`,
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken(idUser)
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

  return <ChatRoot />;
};

export default LayoutRoot;
