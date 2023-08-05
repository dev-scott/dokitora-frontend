import { Share } from "react-native"

const SharePlace=(place)=>{
        Share.share({
            title:'Partager la pharmacie',
            message:"Soins d'urgence chez: "+place.attributes.name+"\n"+"Address: "
            +place.attributes.adresse,
        })
}



export default{
    SharePlace
}