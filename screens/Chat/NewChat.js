import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getDoctorUsers } from '../../utils/api';
import { FlatList } from 'react-native';
import UserListItem from '../../components/UI/UserListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../store/AuthContext';
import { useChatContext } from 'stream-chat-expo';

const NewChat = () => {

    const [doctor, setDoctor] = useState([]);

    const authCtx = useContext(AuthContext)
    const { client } = useChatContext();

    useEffect(() => {
      getUsers();
    }, []);

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
  
  
  
    const getUsers = async () => {
      const result = (await getDoctorUsers()).data;
  
      const resp = result.data;
  
      console.log(resp);
      setDoctor(resp);
    };




    

  return (
    <FlatList
    data={doctor}
    renderItem={({ item }) => <UserListItem user={item} />}
  />
  )
}

export default NewChat