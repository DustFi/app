import { FC } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

export const InProgressModal: FC = () => (
    <Card className="w-full">
        <CardContent className="p-6 text-center">
            <Loader2Icon className="h-12 w-12 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium">Transaction in Progress</h3>
            <p className="text-sm text-gray-500 mt-2">
                Please wait while your transaction is being processed
            </p>
        </CardContent>
    </Card>
);