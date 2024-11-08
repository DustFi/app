import { FC } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorModalProps {
    onClose: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = ({ onClose }) => (
    <Card className="w-full">
        <CardHeader>
            <h2 className="text-xl font-semibold text-red-500">Transaction Failed</h2>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">
                Your transaction could not be completed. Please try again.
            </p>
        </CardContent>
        <CardFooter>
            <Button onClick={onClose} className="w-full">
                Close
            </Button>
        </CardFooter>
    </Card>
);
