import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwapStore } from '@/store/useSwapStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { formatNumber } from '@/lib/format';

interface SwapKeyValueProps {
    keyText: string;
    value: React.ReactNode;
    isLoading?: boolean;
}

const SwapKeyValue: FC<SwapKeyValueProps> = ({ keyText, value, isLoading }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-gray-500">{keyText}</span>
        {isLoading ? (
            <div className="flex items-center gap-2">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
            </div>
        ) : (
            <span>{value}</span>
        )}
    </div>
);

export const SwapDetails: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        onePayRoute,
        bestRoute,
        isFindingBestRoute,
        slippage,
        payToken,
        receiveToken
    } = useSwapStore();

    if (!payToken || !receiveToken) return null;

    return (
        <div className="mt-4">
            <Button
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <div className="flex items-center gap-2">
                    {onePayRoute?.pool_data && !isFindingBestRoute ? (
                        <span className="flex items-center gap-1">
                            <span>1 {payToken.symbol} ≈</span>
                            <span>
                                {formatNumber(onePayRoute.pool_data.receive_show, 4)}{' '}
                                {receiveToken.symbol}
                            </span>
                        </span>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            <span>Finding best route...</span>
                        </div>
                    )}
                </div>
                <ChevronDownIcon
                    className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <Card className="mt-2">
                            <div className="p-4 space-y-2">
                                <SwapKeyValue
                                    keyText="Slippage Tolerance"
                                    value={
                                        <div className="flex items-center">
                                            <span>
                                                {slippage === 'auto' ? '1% (auto)' : `${slippage}%`}
                                            </span>
                                        </div>
                                    }
                                />

                                <SwapKeyValue
                                    keyText="Network Fee"
                                    value={bestRoute?.pool_data.blockchainFee ?? '0 TON'}
                                    isLoading={isFindingBestRoute}
                                />

                                <SwapKeyValue
                                    keyText="Price Impact"
                                    value={
                                        <span className={`${bestRoute && parseFloat(bestRoute.pool_data.priceImpact) > 5
                                                ? 'text-red-500'
                                                : ''
                                            }`}>
                                            {bestRoute?.pool_data.priceImpact ?? '0'}%
                                        </span>
                                    }
                                    isLoading={isFindingBestRoute}
                                />

                                <SwapKeyValue
                                    keyText="Minimum Received"
                                    value={`${bestRoute?.pool_data.minimumReceive_show ?? '0'} ${receiveToken.symbol}`}
                                    isLoading={isFindingBestRoute}
                                />

                                <SwapKeyValue
                                    keyText="Route"
                                    value={
                                        bestRoute ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center">
                                                    <Image
                                                        src={
                                                            bestRoute.selected_pool.dex === 'dedust'
                                                                ? 'https://dedust.io/favicon-32x32.png'
                                                                : 'https://ston.fi/images/tild3432-3236-4431-b139-376231383134__favicon.svg'
                                                        }
                                                        alt={bestRoute.selected_pool.dex}
                                                        width={16}
                                                        height={16}
                                                        className="rounded"
                                                    />
                                                    <span className="ml-1">
                                                        {bestRoute.selected_pool.dex === 'dedust' ? 'Dedust' : 'Ston.fi'}
                                                    </span>
                                                </div>
                                                <span className="text-gray-500">
                                                    {bestRoute.pool_data.route_view.join(' > ')}
                                                </span>
                                            </div>
                                        ) : (
                                            'Enter amount'
                                        )
                                    }
                                    isLoading={isFindingBestRoute}
                                />

                                {bestRoute && parseFloat(bestRoute.pool_data.priceImpact) > 5 && (
                                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                        Warning: High price impact! The price impact of your trade is higher than 5%.
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};