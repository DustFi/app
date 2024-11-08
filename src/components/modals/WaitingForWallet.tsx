import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2Icon } from 'lucide-react';

export const WaitingForWallet: FC = () => (
    <Card className="w-full">
        <CardContent className="p-6 text-center">
            <Loader2Icon className="h-12 w-12 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium">Waiting for Wallet Confirmation</h3>
            <p className="text-sm text-gray-500 mt-2">
                Please confirm the transaction in your wallet
            </p>
        </CardContent>
    </Card>
);
