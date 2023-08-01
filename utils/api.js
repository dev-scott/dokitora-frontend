import axios from "axios";


const urlGetPharmacy = "http://192.168.1.105:1337/api/pharmacies?populate=medication.image&populate=image"

export async function getPharmacy() {

  const response = await axios.get(urlGetPharmacy);

  // const token = response.data.jwt

  // console.log(response)
  return response;
}