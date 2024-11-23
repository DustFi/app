'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Address, toNano } from '@ton/core';
import { Asset, PoolType, ReadinessStatus, Factory } from '@dedust/sdk';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { tonClient, factory } from '@/lib/dedust';
import { DeDustClient } from '@dedust/sdk';
import { useTonAddress } from '@tonconnect/ui-react';
import poolsData from '../../public/filteredDedustPools.json';

const SwapComponent = () => {
    const userAddress = useTonAddress();
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [allPools, setAllPools] = useState<any[]>(poolsData);
    const [selectedPool, setSelectedPool] = useState<any | null>(null);
    const [outputAmount, setOutputAmount] = useState('0.0');

    const handleSwap = async () => {
        setStatus('loading');
        setMessage('');

        try {
            if (!selectedPool) {
                throw new Error('Please select a pool to swap.');
            }

            const tonVault = tonClient.open(await factory.getNativeVault());
            const poolAddress = Address.parse(selectedPool.address);
            const amountIn = toNano(amount);
            const sender = { address: Address.parse(userAddress) };

            const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [Asset.native(), Asset.jetton(poolAddress)]));

            if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
                throw new Error('Selected pool is not ready.');
            }

            await tonVault.sendSwap(sender, {
                poolAddress: pool.address,
                amount: amountIn,
                gasAmount: toNano('0.25'),
            });

            setStatus('success');
            setMessage(`Successfully swapped ${amount} ${selectedPool.assets[0].metadata.symbol} to ${selectedPool.assets[1].metadata.name}`);
        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    const calculateOutput = (inputAmount: string, selectedPool: any) => {
        // Implement the logic to calculate the output amount based on the selected pool and input amount
        // This is a placeholder implementation
        return (parseFloat(inputAmount) * 0.9).toFixed(2); // Example: 90% of input amount
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAmount = e.target.value;
        setAmount(inputAmount);
        if (selectedPool) {
            const output = calculateOutput(inputAmount, selectedPool);
            setOutputAmount(output);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Swap</h3>
                </div>

                {/* Pool Selection */}
                <div className="mb-4 p-5 bg-gray-400">
                    <label className="text-sm text-gray-400">Select Pool</label>
                    <select
                        onChange={(e) => setSelectedPool(allPools.find(pool => pool.address === e.target.value))}
                        className="w-full bg-white/10 rounded-xl px-3 py-2"
                    >
                        <option value="">Select a pool</option>
                        {allPools.map(pool => (
                            <option key={pool.address} value={pool.address}>
                                {pool.assets[0].metadata?.symbol || pool.assets[0].address} / {pool.assets[1].metadata?.symbol || pool.assets[1].address}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Token Input */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-4"
                >
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-400">You pay</span>
                        <span className="text-sm text-gray-400">Balance: 0.0</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="bg-transparent text-2xl font-semibold flex-1 outline-none"
                            placeholder="0.0"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <span className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-2">
                            <span>{selectedPool ? selectedPool.assets[0].metadata.symbol : 'TON'}</span>
                        </span>
                    </div>
                </motion.div>

                {/* Swap Icon */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/10 p-2 rounded-full"
                        onClick={() => {
                            const output = calculateOutput(amount, selectedPool);
                            setOutputAmount(output);
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </motion.button>
                </div>

                {/* Token Output */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-4"
                >
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-400">You receive</span>
                        <span className="text-sm text-gray-400">Balance: 0.0</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="bg-transparent text-2xl font-semibold flex-1 outline-none"
                            placeholder="0.0"
                            value={outputAmount}
                            readOnly
                        />
                        <span className="flex items-center space-x-2 bg-white/10 rounded-xl px-3 py-2">
                            <span>{selectedPool ? selectedPool.assets[1].metadata.symbol : 'DUST'}</span>
                        </span>
                    </div>
                </motion.div>

                {/* Swap Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-xl"
                    onClick={handleSwap}
                >
                    Swap
                </motion.button>

                {/* Status Messages */}
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
        </div>
    );
};

export default SwapComponent;
// Function to calculate output amount based on input amount and selected pool
const calculateOutput = (inputAmount: string, selectedPool: any) => {
    // Implement the logic to calculate the output amount based on the selected pool and input amount
    // This is a placeholder implementation
    return (parseFloat(inputAmount) * 0.9).toFixed(2); // Example: 90% of input amount
}; 