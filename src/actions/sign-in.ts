"use server"

import { signIn } from "@/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
    console.log("SIGN IN ATTEMPT:", { email });

    try {
        
        await signIn( "credentials", {
            email,
            password,
            redirect: false
        });

        console.log("SIGN IN SUCCESS:", { email });

        return
    } catch (error) {
        console.error("Ошибка авторизации", error);
        throw error
    }
}