import { FC } from 'react';
import { Card } from './Card';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from 'lucide-react';
import { useSwapStore } from '@/store/useSwapStore';
import { useOptionsStore } from '@/store/useOptionsStore';

export const SwapCard: FC = () => {
    const { changeDirection } = useSwapStore();
    const { options } = useOptionsStore();

    const shouldShowChangeDirection = options?.ui_preferences?.show_change_direction;
    const isDisabled = options?.lock_pay_token || options?.lock_receive_token;

    return (
        <div className="relative space-y-2">
            <Card type="pay" />

            {shouldShowChangeDirection && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={changeDirection}
                        disabled={isDisabled}
                        className="rounded-full bg-white shadow hover:shadow-md"
                    >
                        <ArrowDownIcon className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <Card type="receive" />
        </div>
    );
};