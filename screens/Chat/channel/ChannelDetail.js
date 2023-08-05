import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Channel, MessageInput, MessageList, useChatContext } from "stream-chat-expo";

const ChannelDetail = ({ route, navigation }) => {
  const [channel, setChannel] = useState(null);

  const { client } = useChatContext();

  const { id } = route.params;

  console.log(id);

  useEffect(() => {
    const fetchChannel = async () => {
      const _id = typeof id === 'string' ? id : id[0];
      const channels = await client.queryChannels({ id: { $eq: _id } });
      setChannel(channels[0]);
      // console.log(channels)
    };

    fetchChannel();
  }, [id]);

if(!channel){
  return <ActivityIndicator/>
}
 

  return (
  <Channel channel={channel}>
    <MessageList/>
    <MessageInput/>
  </Channel>
  );
};

export default ChannelDetail;
