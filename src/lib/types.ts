import { type AuthenticationInfo, type IAuthClient } from "@propelauth/javascript";
import { Decimal128 } from 'decimal128';

export interface UserAuth {
    client: IAuthClient;
    info: AuthenticationInfo;
}

export interface UserPortfolio {
    liquid: Decimal128;
}

export interface CoinValues {
    [Key: string]: CoinValue
}

export interface CoinValue  {
    marketValue: Decimal128,
}
