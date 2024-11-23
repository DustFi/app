import { Factory, MAINNET_FACTORY_ADDR, DeDustClient } from '@dedust/sdk';
import { Address, TonClient4 } from "@ton/ton";
import poolsData from '../../public/dedustPools.json';

export const tonClient = new TonClient4({ endpoint: "https://mainnet-v4.tonhubapi.com" });
export const factory = tonClient.open(Factory.createFromAddress(MAINNET_FACTORY_ADDR));
export const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });

export const listAllPoolsDedust = async () => {
    try {
        const pools = await dedustClient.getPools();
        console.log('Pools:', pools);
        // Save pools to a JSON file - only used once to create and store dedust sdk pools data
        // fs.writeFileSync('dedustPools.json', JSON.stringify(pools, null, 2), 'utf-8');
        console.log('Pools data saved to dedustPools.json');
        return pools;
    }
    catch (error) {
        console.error('Error getting pools:', error);
    }
}

// poolTrades gives array of particular pool trades in this format - {
// {
//     "sender": "EQB8WhcLZKUR2nX5RtuOlHjgxjQKRG-4Ncm3ZGhhuVx7O06V",
//     "assetIn": {
//         "type": "native"
//     },
//     "assetOut": {
//         "type": "jetton",
//         "address": "EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE"
//     },
//     "amountIn": "4821548226",
//     "amountOut": "7263064268",
//     "lt": "51224955000001",
//     "createdAt": "2024-11-25T00:21:09.000Z"
// }

