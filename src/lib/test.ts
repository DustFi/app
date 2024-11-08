import { Address, TonClient4, WalletContractV3R2 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { Asset, Factory, MAINNET_FACTORY_ADDR } from "@dedust/sdk";

export async function main() {
    console.log("Creating vault...");
    console.log("MNEMONIC", process.env.NEXT_PUBLIC_MNEMONIC);
    if (!process.env.NEXT_PUBLIC_MNEMONIC) {
        throw new Error("Environment variable MNEMONIC is required.");
    }

    const mnemonic = process.env.NEXT_PUBLIC_MNEMONIC.split(" ");

    if (!process.env.NEXT_PUBLIC_JETTON_ADDRESS) {
        throw new Error("Environment variable JETTON_ADDRESS is required.");
    }

    const jettonAddress = Address.parse(process.env.NEXT_PUBLIC_JETTON_ADDRESS as string);
    const jettonAddress2 = Address.parse('EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE');

    const tonClient = new TonClient4({
        endpoint: "https://mainnet-v4.tonhubapi.com",
    });

    const factory = tonClient.open(
        Factory.createFromAddress(MAINNET_FACTORY_ADDR),
    );

    const keys = await mnemonicToPrivateKey(mnemonic);

    console.log("Keys", keys, "Jetton Address", jettonAddress, "Factory", factory, "Ton Client", tonClient);
    const wallet = tonClient.open(
        WalletContractV3R2.create({
            workchain: 0,
            publicKey: keys.publicKey,
        }),
    );

    const wallet2 = tonClient.open(
        WalletContractV3R2.create({
            workchain: 0,
            walletId: '0QB_r4q5cXgZix4vZ3aidkpdHAhXac9XySXQpUoRDRo5dDjE'
        }),
    );


    const sender = wallet.sender(keys.secretKey);
    console.log("Wallet", wallet, "Sender", sender);

    try {
        console.log("jettonAddress:", jettonAddress);
        console.log("jettonAddress2:", jettonAddress2);
        const asset = Asset.jetton(jettonAddress);

        console.log("Asset:", asset);
        // await factory.sendCreateVault(sender, { asset });
        const response = await factory.sendCreateVault(sender, { asset });
        console.log("Vault created successfully!", response);
    } catch (error) {
        console.error('Error creating vault:', error);
    }
}
