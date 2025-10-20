
import React from 'react';

interface ResultDisplayProps {
    label: string;
    subtext: string;
    amount: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, subtext, amount }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-white font-bold">{label}</p>
                <p className="text-grayish-cyan text-sm">{subtext}</p>
            </div>
            <p className="text-strong-cyan text-3xl sm:text-4xl lg:text-5xl font-bold">
                ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
    );
};

export default ResultDisplay;
