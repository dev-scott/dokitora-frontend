import React, { useContext, useState } from "react";

import {
  View,
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from "react-native";
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import { AuthContext } from "../../store/AuthContext";

const DateTimePicker = () => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );


  const autCtx = useContext(AuthContext)

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

//   console.log(selectedStartDate)

  autCtx.date = selectedStartDate

  return (
    <View>
      <TouchableOpacity
        className="  w-full h-[48px] pl-4 mt-[15px] rounded-2xl border border-neutral600   flex items-center flex-row justify-around   "
        onPress={handleOnPressStartDate}
      >
        <Text>{selectedStartDate}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View className=" flex flex-1 justify-center items-center w-full h-full bg-primary ">
          <View className=" m-[20px] bg-zin900 items-center justify-center rounded-2xl p-[35px]  w-[90%] shadow-sm   ">
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "#080516",
                textHeaderColor: "#469ab6",
                textDefaultColor: "#FFFFFF",
                selectedTextColor: "#FFF",
                mainColor: "#469ab6",
                textSecondaryColor: "#FFFFFF",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ color: "white" }} className="mt-[10px]">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePicker;
