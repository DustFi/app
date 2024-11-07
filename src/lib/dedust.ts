import { Factory, MAINNET_FACTORY_ADDR } from '@dedust/sdk';
import { Address, TonClient4 } from "@ton/ton";

export const tonClient = new TonClient4({ endpoint: " https://sandbox-v4.tonhubapi.com" });
export const factory = tonClient.open(Factory.createFromAddress(MAINNET_FACTORY_ADDR));
