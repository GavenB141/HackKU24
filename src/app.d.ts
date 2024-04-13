import type { UserAuth } from "$lib/types";
import { type IAuthClient, type AuthenticationInfo } from "@propelauth/javascript";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            auth: UserAuth;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
