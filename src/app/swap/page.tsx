import { Swap } from '@/components/Swap';   

export default function SwapPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Swap Tokens</h1>
                <Swap />
            </div>
        </div>
    );
}