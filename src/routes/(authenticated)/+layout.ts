import { type UserAuth } from "$lib/types";
import { createClient, type AuthenticationInfo } from "@propelauth/javascript";
import { env } from '$env/dynamic/public';


export const ssr = false;

//@ts-ignore
export const load = (async function(): Promise<{auth:UserAuth}> {
    let authClient = createClient({
        authUrl: env.PUBLIC_AUTH_URL,
        enableBackgroundTokenRefresh: true,
    }) ?? null;

    let authInfo = await authClient?.getAuthenticationInfoOrNull();

    console.log(authInfo);

    if(authInfo === null) {
        authClient.logout(false);
        authClient.redirectToLoginPage();
    }

    return {
        auth: {
            client: authClient,
            info: <AuthenticationInfo>authInfo
        }
    }
});
