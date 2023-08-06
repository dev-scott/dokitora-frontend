import { View, Text, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
// import { useRouter } from 'expo-router';
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();

  const authCtx = useContext(AuthContext);

  //   const router = useRouter();
  const navigation = useNavigation();

  //   const startChannel = async () => {
  //     const channel = client.channel('messaging', {
  //       members: [user.id.toString(), authCtx.id.toString()],
  //     });
  //     await channel.watch();

  //     // router.push(`/chat/channel/${channel.id}`);
  //     navigation.navigate("ChannelDetail", {id: channel.id})
  //   };

  const detailFunction = () => {
    navigation.navigate("DoctorDetail", { user: user });
  };

  return (
    <Pressable
      onPress={detailFunction}
      style={{
        backgroundColor: "white",
        margin: 5,
        marginVertical: 3,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text>{user.username}</Text>
    </Pressable>
  );
};

export default UserListItem;
