'use client'

import { useState } from 'react'
import { Address, toNano } from '@ton/core'
import { Asset, VaultNative, PoolType, ReadinessStatus, Factory } from '@dedust/sdk'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { tonClient, factory } from '@/lib/dedust'
import { useTonAddress } from '@tonconnect/ui-react';
import { DeDustClient } from '@dedust/sdk';
import SwapComponent from '@/components/Swap'

export default function TonScaleSwap() {
    const userAddress = useTonAddress();
    const rawUserAddress = useTonAddress(false);
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')
    const [allPools, setAllPools] = useState<any[]>([])

    const dedustClient = new DeDustClient({ endpointUrl: 'https://api.dedust.io' });

    const listAllPools = async () => {
        const pools = await dedustClient.getPools();
        // console.log('Pools:', pools);
        setAllPools(pools);
        return pools;
    }

    listAllPools();

    // listAllPools gives array of pools in this format - {
    //     "address": "EQAUlzQPu1QE7H9NiUIpsTOSq_OveXfeU8nLjFdGwOeBeGc6",
    //     "lt": "47679934000001",
    //     "totalSupply": "9000000000000001000",
    //     "type": "volatile",
    //     "tradeFee": "0.25",
    //     "assets": [
    //         {
    //             "type": "native",
    //             "metadata": {
    //                 "name": "Toncoin",
    //                 "symbol": "TON",
    //                 "image": "https://assets.dedust.io/images/ton.webp",
    //                 "decimals": 9
    //             }
    //         },
    //         {
    //             "type": "jetton",
    //             "address": "EQCIzSUwVaYwuK0iFraED--8awETZVC9VyLVzsXV9COW1RLs",
    //             "metadata": null
    //         }
    //     ],
    //     "lastPrice": null,
    //     "reserves": [
    //         "56045095",
    //         "82155766840929579571808"
    //     ],
    //     "stats": {
    //         "fees": [
    //             "0",
    //             "0"
    //         ],
    //         "volume": [
    //             "0",
    //             "0"
    //         ]
    //     }
    // }

    // console.log('Pools:', listAllPools);

    // const handleSwap = async () => {
    //     setStatus('loading')
    //     setMessage('')

    //     try {
    //         // Step 1: Find the Vault (TON)
    //         const tonVault = tonClient.open(await factory.getNativeVault())

    //         // Step 2: Find the Pool (TON, SCALE)
    //         const SCALE_ADDRESS = Address.parse('EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE')
    //         const TON = Asset.native()
    //         const SCALE = Asset.jetton(SCALE_ADDRESS)
    //         const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [TON, SCALE]))

    //         // Step 3: Check if Vault (TON) and Pool (TON, SCALE) are deployed
    //         if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
    //             throw new Error('Pool (TON, SCALE) does not exist.')
    //         }

    //         if ((await tonVault.getReadinessStatus()) !== ReadinessStatus.READY) {
    //             throw new Error('Vault (TON) does not exist.')
    //         }

    //         // Step 4: Send a message to Vault (TON)
    //         const amountIn = toNano(amount)
    //         // @ts-ignore
    //         const sender: Sender = { address: Address.parse(userAddress) } // Adjusted to match Sender type

    //         await tonVault.sendSwap(sender, {
    //             poolAddress: pool.address,
    //             amount: amountIn,
    //             gasAmount: toNano('0.25'),
    //         })

    //         setStatus('success')
    //         setMessage(`Successfully swapped ${amount} TON to SCALE`)
    //     } catch (error) {
    //         setStatus('error')
    //         console.log({ "error": error })
    //         setMessage(error instanceof Error ? error.message : 'An unknown error occurred')
    //     }
    // }

    return (
        <div className='flex h-screen p-10'>
            <div className='flex h-screen p-10'>
                <SwapComponent />
            </div>
            {/* <Card className="w-[600px] h-[500px]">

                <CardHeader>
                    <CardTitle>Swap TON to SCALE</CardTitle>
                    <CardDescription>Enter the amount of TON you want to swap</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="number"
                            placeholder="Amount of TON"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button onClick={handleSwap} disabled={status === 'loading'}>
                            {status === 'loading' ? 'Swapping...' : 'Swap'}
                        </Button>
                        {status === 'success' && (
                            <Alert>
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}
                        {status === 'error' && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>
            </Card> */}
        </div>

    )
}

