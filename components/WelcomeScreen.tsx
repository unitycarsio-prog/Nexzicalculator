import React from 'react';
import { LogoIcon } from './icons';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            <LogoIcon />
            <h2 className="text-3xl font-bold text-very-dark-cyan mt-4">Welcome to Handy Calculators</h2>
            <p className="text-dark-grayish-cyan mt-2 max-w-md">
                Your one-stop suite for quick and easy calculations.
                Select a tool from the sidebar to get started.
            </p>
        </div>
    );
};

export default WelcomeScreen;
