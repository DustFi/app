"use client";
import { useTonAddress } from '@tonconnect/ui-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tonClient, factory } from '@/lib/dedust';
import { Address } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { Factory, Asset, PoolType, ReadinessStatus, MAINNET_FACTORY_ADDR } from '@dedust/sdk';


interface CreateFormProps {
    tonClient: any;
    factory: Factory;
}

const CreateForm: React.FC<CreateFormProps> = ({ tonClient, factory }) => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const [jettonAddress, setJettonAddress] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    console.log("ton client", tonClient, "factory", factory);

    const createVault = async () => {
        try {
            setIsLoading(true);
            console.log("raw address", rawAddress, "jetton address", jettonAddress, "userFriendlyAddress", userFriendlyAddress);
            // const amountBigInt = BigInt(parseFloat(amount) * 1e9);
            const jettonAdd = Address.parse(jettonAddress);
            console.log("jettonAdd", jettonAdd);

            await factory.sendCreateVault(tonClient, userFriendlyAddress, {
                queryId: BigInt(Date.now()), // Optional: use current timestamp as queryId
                asset: Asset.jetton(jettonAddress),
            });
            setStatus({ type: 'success', message: 'Vault created successfully!' });
            console.log("vault created");
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
            console.log("vault error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createPool = async () => {
        try {
            setIsLoading(true);
            const TON = Asset.native();
            const SCALE = Asset.jetton(jettonAddress);

            console.log("ton", TON, "scale", SCALE);
            const pool = tonClient.open(
                await factory.getPool(PoolType.VOLATILE, [TON, SCALE])
            );
            console.log("pool", pool);

            const poolReadiness = await pool.getReadinessStatus();

            if (poolReadiness === ReadinessStatus.NOT_DEPLOYED) {
                await factory.sendCreateVolatilePool(userFriendlyAddress, {
                    assets: [TON, SCALE],
                });
                setStatus({ type: 'success', message: 'Pool created successfully!' });
                console.log("pool created");
            } else {
                setStatus({ type: 'error', message: 'Pool already exists' });
            }
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl p-4 shadow-2xl bg-gray-900 rounded-3xl">
            <div className="mb-4">
                <p className="text-sm text-gray-600">Connected Address: {userFriendlyAddress}</p>
            </div>

            <Tabs defaultValue="vault" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vault">Create Vault</TabsTrigger>
                    <TabsTrigger value="pool">Create Pool</TabsTrigger>
                </TabsList>

                <TabsContent value="vault">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Vault</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Jetton Address</label>
                                <Input
                                    value={jettonAddress}
                                    onChange={(e) => setJettonAddress(e.target.value)}
                                    placeholder="Enter jetton address"
                                    className="w-full"
                                />
                            </div>
                            <Button
                                onClick={createVault}
                                disabled={isLoading || !jettonAddress || !userFriendlyAddress}
                                className="w-full"
                            >
                                {isLoading ? 'Creating...' : 'Create Vault'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pool">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Volatile Pool</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">SCALE Token Address</label>
                                <Input
                                    value={jettonAddress}
                                    onChange={(e) => setJettonAddress(e.target.value)}
                                    placeholder="Enter SCALE token address"
                                    className="w-full"
                                />
                            </div>
                            <Button
                                onClick={createPool}
                                disabled={isLoading || !jettonAddress || !userFriendlyAddress}
                                className="w-full"
                            >
                                {isLoading ? 'Creating...' : 'Create Pool'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {status.type && (
                <Alert className={`mt-4 text-black ${status.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
                    <AlertDescription>
                        {status.message}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

// page.tsx
export default function CreatePage() {
    return (
        <div className="min-h-screen py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Create Vault or Pool</h1>
            <CreateForm
                tonClient={tonClient}
                factory={factory}
            />
        </div>
    );
}