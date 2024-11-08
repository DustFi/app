// import { FC } from 'react';
// import { useSwapStore } from '@/store/useSwapStore';
// import { useWalletStore } from '@/store/useWalletStore';

// export const SwapButton: FC = () => {
//     const { wallet, connect } = useWalletStore();
//     const { payToken, receiveToken, payAmount, isLoading } = useSwapStore();

//     const handleSwap = async () => {
//         if (!wallet) {
//             await connect();
//             return;
//         }
//         // Implement swap logic
//     };

//     const getButtonText = () => {
//         if (!wallet) return 'Connect Wallet';
//         if (!payToken || !receiveToken) return 'Select Tokens';
//         if (!payAmount) return 'Enter Amount';
//         return 'Swap';
//     };

//     return (
//         <button
//             className="w-full mt-4 text-lg"
//             disabled={isLoading}
//             onClick={handleSwap}
//         >
//             {isLoading ? 'Loading...' : getButtonText()}
//         </button>
//     );
// };