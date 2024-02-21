import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const validateForm = (form: any) => {
  try {
    const { username } = form;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
