"use server";

import { Address } from "@/interfaces";
import prisma from "../../../lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const userAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      userAddress,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userAddress: null,
      error: "Error no se pudo grabar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addressData = {
      userId: userId,
      name : address.name,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      phone: address.phone,
      countryId: address.country,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressData,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressData,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("Error no se pudo grabar la direccion");
  }
};


export const deleteAddress = async (userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    return {
      ok: true,
      deletedAddress,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      deletedAddress: null,
      error: "Error no se pudo eliminar la direccion",
    };
  }
};

export const getUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if(!userAddress) return null;


    
    return {
      ok: true,
      userAddress:{
        name: userAddress.name,
        lastName: userAddress.lastName,
        address: userAddress.address,
        address2: userAddress.address2 ?? '',
        zip: userAddress.zip,
        city: userAddress.city,
        country: userAddress.countryId,
        phone: userAddress.phone,
        rememberAddress: true
       
      },
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      userAddress: {
        name: '',
        lastName: '',
        address: '',
        address2: '',
        zip: '',
        city: '',
        country: '',
        phone: '',
        rememberAddress: false
      },
      error: "Error no se pudo obtener la direccion",
    };
  }
};