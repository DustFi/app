"use client";   
import { Factory, Asset, PoolType, ReadinessStatus, TonClient } from '@dedust/sdk';
import { useTonAddress } from '@tonconnect/ui-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tonClient, factory } from '@/lib/dedust';

interface CreateFormProps {
    tonClient: TonClient;
    factory: Factory;
}

export const CreateForm: React.FC<CreateFormProps> = ({ tonClient, factory }) => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const [jettonAddress, setJettonAddress] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const createVault = async () => {
        try {
            setIsLoading(true);
            await factory.sendCreateVault(rawAddress, {
                asset: Asset.jetton(jettonAddress),
            });
            setStatus({ type: 'success', message: 'Vault created successfully!' });
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const createPool = async () => {
        try {
            setIsLoading(true);
            const TON = Asset.native();
            const SCALE = Asset.jetton(jettonAddress);

            const pool = tonClient.open(
                await factory.getPool(PoolType.VOLATILE, [TON, SCALE])
            );

            const poolReadiness = await pool.getReadinessStatus();

            if (poolReadiness === ReadinessStatus.NOT_DEPLOYED) {
                await factory.sendCreateVolatilePool(rawAddress, {
                    assets: [TON, SCALE],
                });
                setStatus({ type: 'success', message: 'Pool created successfully!' });
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
                                disabled={isLoading || !jettonAddress || !rawAddress}
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
                                disabled={isLoading || !jettonAddress || !rawAddress}
                                className="w-full"
                            >
                                {isLoading ? 'Creating...' : 'Create Pool'}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {status.type && (
                <Alert className={`mt-4 ${status.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
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
        <div className="min-h-screen bg-black py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Create Vault or Pool</h1>
            <CreateForm
                tonClient={tonClient}
                factory={factory}
            />
        </div>
    );
}