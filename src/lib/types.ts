import { type AuthenticationInfo, type IAuthClient } from "@propelauth/javascript";

export interface UserAuth {
    client: IAuthClient;
    info: AuthenticationInfo;
}
