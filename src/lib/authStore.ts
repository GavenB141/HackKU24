import { browser } from "$app/environment";
import { createClient, type IAuthClient, type AuthenticationInfo } from "@propelauth/javascript";
import { derived, readable, type Readable } from "svelte/store";
import { env } from '$env/dynamic/public';

let authClient = readable<IAuthClient | null>(null, (set)=>{
    set(createClient({
        authUrl: env.PUBLIC_AUTH_URL,
        enableBackgroundTokenRefresh: true,
    }) ?? null);
});

let authInfo: Readable<AuthenticationInfo | null> = derived(authClient, (authClient, set) => {
    authClient?.getAuthenticationInfoOrNull().then((authInfo) => set(authInfo));
});

export {
    authClient,
    authInfo
};
