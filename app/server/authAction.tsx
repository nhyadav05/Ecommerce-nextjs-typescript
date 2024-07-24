// app/server/authAction.ts
"use server";

import API_BASE_URL from "@/apiConfig";

export const SignIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const responseLogin = await fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!responseLogin.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await responseLogin.json();
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};


// ---------------- signup--------------------



export const SignUp = async ({name, email, password }: { name:string;email: string; password: string }) => {
  try {
    const responseLogin = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password }),
    });

    if (!responseLogin.ok) {
      throw new Error("Failed to sign in");
    }

    const data = await responseLogin.json();
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};