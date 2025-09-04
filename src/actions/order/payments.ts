"use server";

import { revalidatePath } from "next/cache";
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
    if (!authToken) {
      console.log("No se pudo obtener el token de autenticación");
      return {
        ok: false,
        message: "No se pudo obtener el token de autenticación",
      };
    }
    console.log(orderId);

    const orderDetails = await gettPAypalOrderDetails(orderId, authToken);
    if (!orderDetails.ok) {
      console.log(orderDetails.message);
      return {
        ok: false,
        message: orderDetails.message,
      };
    }

    const { purchase_units, status } = orderDetails.order;
    const { invoice_id } = purchase_units[0];
    console.log("purchase_units", purchase_units);
    console.log("status", status);

    if(status !== "COMPLETED") {
      return {
        ok: false,
        message: "El pago no ha sido completado",
      };
    }

    //update pias status in BD

    try {

      console.log("invoice_id", invoice_id)

      const updatePaigOrderBD = await prisma.order.update({
        where: {
          id: invoice_id, //invoice_id is the id of the order in the database
        },
        data: {
          isPaid: true,
          paidAt: new Date(),
        },
      });

      if (!updatePaigOrderBD) {
        return {
          ok: false,
          message: "Error al actualizar el pago en base de datos",
        };
      }

      //revalidate path
      revalidatePath(`/orders/${orderId}`);
      return {
        ok: true,
        message: "Pago actualizado en base de datos",
        order: orderDetails.order,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error al actualizar el pago",
      };
    }
   /*  return {
      ok: true,
      order: orderDetails.order,
      message: "",
    }; */
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al verificar el pago con PayPal",
    };
  }
};

const getPaypalOAuthToken = async (): Promise<string | null> => {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

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

const gettPAypalOrderDetails = async (orderId: string, authToken: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (!process.env.PAYPAL_ORDERS_URL)
      return {
        ok: false,
        message: "No se encontro la URL de la API de PayPal",
      };

    const res = await fetch(
      `${process.env.PAYPAL_ORDERS_URL}/${orderId}`,
      requestOptions
    );
    const result = await res.json();

    return {
      ok: true,
      order: result,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener los detalles de la orden de PayPal",
    };
  }
};
