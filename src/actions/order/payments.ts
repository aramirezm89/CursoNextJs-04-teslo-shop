"use server";

import prisma from "../../../lib/prisma";

// Set the transaction id in the order BD
export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `no se encontro la orden ${orderId}`,
      };
    }
    return {
      ok: true,
      order,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener la orden",
    };
  }
};

export const paypalCheckPayment = async (orderId: string) => {
  try {
    const authToken = await getPaypalOAuthToken();
    if(!authToken) return {
      ok: false,
      message: "No se pudo obtener el token de autenticación"
    }
    console.log(orderId)
    console.log(authToken)
    

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al verificar el pago con PayPal"
    };
  }
};




const getPaypalOAuthToken = async (): Promise<string | null> => {
  try {
console.log({
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_OAUTH_URL: process.env.PAYPAL_OAUTH_URL, 
})
    
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${encodedCredentials}`);
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded.toString(),
      redirect: "follow" as RequestRedirect,
    };


    const response = await fetch(process.env.PAYPAL_OAUTH_URL!, requestOptions);
    const result = await response.json();

    
    return result.access_token || null;
  } catch (error) {
    console.error("Error obteniendo token PayPal:", error);
    return null;
  }
};