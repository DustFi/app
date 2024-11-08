import { FC } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSwapStore } from '@/store/useSwapStore';
import { formatNumber } from '@/lib/format';
import { Loader2Icon } from 'lucide-react';

interface ConfirmationModalProps {
    onClose: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ onClose }) => {
    const { payToken, receiveToken, payAmount, bestRoute, setModalState } = useSwapStore();

    const handleConfirm = async () => {
        try {
            setModalState(ModalState.WAITING);
            // Implement swap confirmation logic here
            setModalState(ModalState.IN_PROGRESS);
        } catch (error) {
            console.error('Swap error:', error);
            setModalState(ModalState.ERROR);
        }
    };

    if (!payToken || !receiveToken || !bestRoute) return null;

    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-xl font-semibold">Confirm Swap</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span>You Pay</span>
                    <div className="flex items-center gap-2">
                        <span>{formatNumber(Number(payAmount), payToken.decimal)} {payToken.symbol}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span>You Receive</span>
                    <div className="flex items-center gap-2">
                        <span>{bestRoute.pool_data.receive_show} {receiveToken.symbol}</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    Output is estimated. You will receive at least {bestRoute.pool_data.minimumReceive_show} {receiveToken.symbol} or the transaction will revert.
                </div>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                    Confirm Swap
                </Button>
            </CardFooter>
        </Card>
    );
};

// components/modals/WaitingForWallet.tsx
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

// components/modals/ErrorModal.tsx
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

// components/modals/InProgressModal.tsx
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

// components/modals/DoneModal.tsx
interface DoneModalProps {
    onClose: () => void;
}

export const DoneModal: FC<DoneModalProps> = ({ onClose }) => (
    <Card className="w-full">
        <CardHeader>
            <h2 className="text-xl font-semibold text-green-500">Success!</h2>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">
                Your swap has been completed successfully.
            </p>
        </CardContent>
        <CardFooter>
            <Button onClick={onClose} className="w-full">
                Close
            </Button>
        </CardFooter>
    </Card>
);

// hooks/useOnClickOutside.ts
import { RefObject, useEffect } from 'react';
import { ModalState } from '@/constants/types';

export function useOnClickOutside(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}
