import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getToken } from "./helpers";
const urlGetPharmacy ="http://192.168.1.102:1337/api/pharmacies?populate=medication.image&populate=image";
const urlAddOrder = "http://192.168.1.102:1337/api/orders";

const urlGetBlogs = "http://192.168.1.102:1337/api/blogs?populate=*";

const urlGetOrderByUser ="http://192.168.1.102:1337/api/orders/findOrderByUser";

const urlGetDoctorUsers = "http://192.168.1.102:1337/api/auth/getDoctorUser";

const urlGetDeliveryPerson = "http://192.168.1.102:1337/api/auth/getDeliveryPerson"

const urlGetListDeliveries = "http://192.168.1.102:1337/api/orders?populate=*"



// const urlGetPharmacy ="http://192.168.202.18:1337/api/pharmacies?populate=medication.image&populate=image";
// const urlAddOrder = "http://192.168.202.18:1337/api/orders";

// const urlGetBlogs = "http://192.168.202.18:1337/api/blogs?populate=*";

// const urlGetOrderByUser ="http://192.168.202.18:1337/api/orders/findOrderByUser";

// const urlGetDoctorUsers = "http://192.168.202.18:1337/api/auth/getDoctorUser";

// const urlGetDeliveryPerson = "http://192.168.202.18:1337/api/auth/getDeliveryPerson"

// const urlGetListDeliveries = "http://192.168.202.18c:1337/api/orders?populate=*"

export async function getPharmacy() {
  const response = await axios.get(urlGetPharmacy);

  // const token = response.data.jwt

  // console.log(response)
  return response;
}

export async function addOrder(
  order_name,
  order_email,
  order_phone,
  order_date,
  order_pharmacy,
  order_price,
  order_pharmacy_number,
  pushToken
) {
  console.log(
    order_name,
    order_email,
    order_phone,
    order_date,
    order_pharmacy,
    order_price,
    order_pharmacy_number,
    pushToken
  );
  // console.log(order_name , order_email , order_phone , order_date , order_pharmacy);
  const response = await axios.post(urlAddOrder, {
    data: {
      name: order_name,
      email: order_email,
      phone: order_phone,
      date: order_date,
      pharmacy_name: order_pharmacy,
      order_price: order_price,
      order_pharmacy_number:order_pharmacy_number,
      pushToken:pushToken
    },
  });
  console.log("test add order");

  // const token = response.data.jwt
  // console.log(response)
  return response;
}

export async function getBlogs() {
  const response = await axios.get(urlGetBlogs);

  return response;
}

export async function getOrderByUser() {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    const response = await axios.get(urlGetOrderByUser, {
      headers: {
        "Content-Type": "application/json",
        // set the auth token to the user's jwt
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("test fff")
    // console.log(response);
    return response;
  } catch (error) {
    console.log("error :" + error);
  }
}

export async function getDoctorUsers() {
  const response = await axios.get(urlGetDoctorUsers);
  console.log("response :" + response);
  return response;
}


export async function getDeliveryPerson() {
  const response = await axios.get(urlGetDeliveryPerson);
  console.log("response :" + response);
  return response;
}

export async function getListDeliveries(){

  const responses = await axios.get(urlGetListDeliveries)
  console.log("response : " + responses)
  return responses;

}