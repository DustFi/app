import { FC, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useSwapStore } from '@/store/useSwapStore';
import { useWalletStore } from '@/store/useWalletStore';
import { useOptionsStore } from '@/store/useOptionsStore';
import { ModalState } from '@/constants/types';
import { Loader2Icon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { ConfirmationModal } from '../modals/ConfirmationModal';
import { WaitingForWallet } from '../modals/WaitingForWallet';
import { ErrorModal } from '../modals/ErrorModal';
import { InProgressModal } from '../modals/InProgressModal';
import { DoneModal } from '../modals/DoneModal';

export const SwapButton: FC = () => {
    const {
        payAmount,
        payToken,
        receiveToken,
        bestRoute,
        swapModal,
        setModalState,
        isSelectingToken,
    } = useSwapStore();

    const { balance } = useWalletStore();
    const { tonConnectInstance } = useOptionsStore();

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => setModalState(ModalState.NONE));

    const getSwapText = () => {
        if (isSelectingToken) {
            return (
                <span className="flex items-center gap-2">
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Loading...
                </span>
            );
        }

        if (!tonConnectInstance?.wallet) {
            return 'Connect Wallet';
        }

        if (!receiveToken || !payToken) {
            return 'Choose a Token';
        }

        if (payAmount === 0n) {
            return 'Enter Amount';
        }

        if (bestRoute && !bestRoute.pool_data.status) {
            return 'Price Impact Too High';
        }

        const tokenBalance = balance.get(payToken.address)?.balance ?? 0n;
        if (payAmount > tokenBalance) {
            return 'Insufficient Balance';
        }

        return 'Swap';
    };

    const isButtonDisabled = () => {
        if (!tonConnectInstance?.wallet) return false;
        if (!payAmount || !receiveToken) return true;
        if (bestRoute && !bestRoute.pool_data.status) return true;

        const tokenBalance = balance.get(payToken!.address)?.balance ?? 0n;
        if (payAmount > tokenBalance) return true;

        return false;
    };

    const handleSwap = () => {
        if (!tonConnectInstance?.wallet) {
            tonConnectInstance?.openModal();
        } else {
            setModalState(ModalState.CONFIRM);
        }
    };

    return (
        <>
            <AnimatePresence>
                {swapModal !== ModalState.NONE && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
                        >
                            {swapModal === ModalState.CONFIRM && (
                                <ConfirmationModal onClose={() => setModalState(ModalState.NONE)} />
                            )}
                            {swapModal === ModalState.WAITING && (
                                <WaitingForWallet />
                            )}
                            {swapModal === ModalState.ERROR && (
                                <ErrorModal onClose={() => setModalState(ModalState.NONE)} />
                            )}
                            {swapModal === ModalState.IN_PROGRESS && (
                                <InProgressModal />
                            )}
                            {swapModal === ModalState.DONE && (
                                <DoneModal onClose={() => setModalState(ModalState.NONE)} />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                className={`w-full mt-4 ${bestRoute && !bestRoute.pool_data.status ? 'bg-red-500 hover:bg-red-600' : ''
                    }`}
                size="lg"
                disabled={isButtonDisabled()}
                onClick={handleSwap}
            >
                {getSwapText()}
            </Button>
        </>
    );
};
