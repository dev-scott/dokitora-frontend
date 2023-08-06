import { View, Text, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
// import { useRouter } from 'expo-router';
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../../constants";

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

  const Doctor = assets.Doctor;

  return (
    <Pressable
      onPress={detailFunction}
      style={{
        backgroundColor: "white",
        margin: 5,
        marginVertical: 3,
        padding: 10,
      }}
      className="rounded-[2px] flex flex-row "
    >
      <View className="w-[20%]">
        <View className="rounded-full w-[70px] h-[70px] bg-primary">
          <Doctor height="100%" width="100%" />
        </View>
      </View>
      <View className="px-5 w-[80%]">
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="text-[18px]"
        >
          {user.username}
        </Text>
        <Text
          style={{
            fontFamily: "sharp-sans",
          }}
          className="text-gray-dark"
        >
          {user.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserListItem;
