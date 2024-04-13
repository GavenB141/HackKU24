import { env } from '$env/dynamic/private';
import { initBaseAuth } from '@propelauth/node';

const {
    validateAccessTokenAndGetUser,
} = initBaseAuth({
    authUrl: env.PRIVATE_AUTH_URL,
    apiKey: env.PRIVATE_AUTH_API_KEY,
});

export async function verifyAuth(headers: Headers) {
    let auth_header = headers.get("Authorization");
    if (!auth_header) {
        return false;
    }
    try {
        let user = await validateAccessTokenAndGetUser(auth_header);
        return user;
    } catch {
        return false;
    }
}