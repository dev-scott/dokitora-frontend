import { View, Text , Button } from 'react-native'
import React from 'react'

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';



const OrderDetail = () => {


    const html = `
    <html>
      <body>
        <h1>Hi sado </h1>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    // await shareAsync(file.uri);

    const fileUri = `${FileSystem.documentDirectory}order.pdf`;

    await FileSystem.moveAsync({
      from: file.uri,
      to: fileUri
    });



  };


  return (
    <View>
      <Text>OrderDetail</Text>
      <Button title="Generate PDF" onPress={generatePdf} />

    </View>
  )
}

export default OrderDetail