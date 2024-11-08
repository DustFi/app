import { FC } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
