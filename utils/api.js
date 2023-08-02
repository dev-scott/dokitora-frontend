import axios from "axios";

const urlGetPharmacy =
  "http://192.168.1.105:1337/api/pharmacies?populate=medication.image&populate=image";
const urlAddOrder = "http://192.168.1.105:1337/api/orders";

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
  order_pharmacy
) {
  // console.log(name, email, phone, confirmation_date, pharmacy);
  // console.log(order_name , order_email , order_phone , order_date , order_pharmacy);
  const response = await axios.post(urlAddOrder, {
    data: {
      name: order_name,
      email:order_email,
      phone:order_phone,
      date:order_date,
      pharmacy_name:order_pharmacy
  
    },
  });

  // const token = response.data.jwt
  // console.log(response)
  return response;
}
