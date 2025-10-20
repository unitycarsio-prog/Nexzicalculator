
import React from 'react';

interface TipButtonProps {
    percentage: number;
    isActive: boolean;
    onClick: () => void;
}

const TipButton: React.FC<TipButtonProps> = ({ percentage, isActive, onClick }) => {
    const activeClasses = isActive 
        ? 'bg-strong-cyan text-very-dark-cyan' 
        : 'bg-very-dark-cyan text-white hover:bg-strong-cyan/80 hover:text-very-dark-cyan';

    return (
        <button
            onClick={onClick}
            className={`w-full py-3 text-2xl font-bold rounded-md transition-colors duration-200 ${activeClasses}`}
        >
            {percentage}%
        </button>
    );
};

export default TipButton;
