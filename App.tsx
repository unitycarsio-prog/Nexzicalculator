import React, { useState } from 'react';
import TipCalculator from './components/calculators/TipCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import CurrencyConverter from './components/calculators/CurrencyConverter';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import LoanEMICalculator from './components/calculators/LoanEMICalculator';
import CountdownTimer from './components/calculators/CountdownTimer';
import UnitConverter from './components/calculators/UnitConverter';
import WelcomeScreen from './components/WelcomeScreen';
import {
    LogoIcon, TipIcon, AgeIcon, BMIIcon, CurrencyIcon,
    PercentIcon, LoanIcon, CountdownIcon, UnitIcon
} from './components/icons';

const CALCULATORS = {
    'Tip': { component: <TipCalculator />, icon: <TipIcon /> },
    'Age': { component: <AgeCalculator />, icon: <AgeIcon /> },
    'BMI': { component: <BMICalculator />, icon: <BMIIcon /> },
    'Currency': { component: <CurrencyConverter />, icon: <CurrencyIcon /> },
    'Percentage': { component: <PercentageCalculator />, icon: <PercentIcon /> },
    'Loan EMI': { component: <LoanEMICalculator />, icon: <LoanIcon /> },
    'Countdown': { component: <CountdownTimer />, icon: <CountdownIcon /> },
    'Unit Converter': { component: <UnitConverter />, icon: <UnitIcon /> },
};

type CalculatorName = keyof typeof CALCULATORS;

const App: React.FC = () => {
    const [activeCalculator, setActiveCalculator] = useState<CalculatorName | null>(null);

    const NavLink: React.FC<{ name: CalculatorName }> = ({ name }) => (
        <button
            onClick={() => setActiveCalculator(name)}
            className={`flex items-center w-full space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-strong-cyan/50 ${
                activeCalculator === name
                    ? 'bg-strong-cyan text-very-dark-cyan'
                    : 'text-light-grayish-cyan hover:bg-dark-grayish-cyan'
            }`}
        >
            <span className="w-6 h-6">{CALCULATORS[name].icon}</span>
            <span className="font-bold">{name}</span>
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-very-dark-cyan">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 p-6 space-y-8 bg-very-dark-cyan border-r border-dark-grayish-cyan/20">
                <header className="flex items-center space-x-2">
                    <LogoIcon />
                    <h1 className="text-2xl font-bold tracking-widest text-white uppercase">
                        Calculators
                    </h1>
                </header>
                <nav className="flex-1 space-y-2">
                    {(Object.keys(CALCULATORS) as CalculatorName[]).map((name) => (
                        <NavLink key={name} name={name} />
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 bg-light-grayish-cyan/50 md:rounded-l-3xl overflow-y-auto">
                {/* Header for Mobile */}
                <header className="md:hidden flex items-center justify-between p-4 bg-very-dark-cyan">
                    <div className="flex items-center space-x-2">
                        <LogoIcon />
                        <h1 className="text-lg font-bold tracking-widest text-white uppercase">Calculators</h1>
                    </div>
                </header>
                
                {/* Mobile Navigation */}
                <div className="md:hidden p-4 bg-very-dark-cyan">
                    <div className="overflow-x-auto pb-2 -mb-2">
                         <nav className="flex space-x-2">
                            {(Object.keys(CALCULATORS) as CalculatorName[]).map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setActiveCalculator(name)}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-strong-cyan/50 ${
                                        activeCalculator === name
                                            ? 'bg-strong-cyan text-very-dark-cyan'
                                            : 'bg-dark-grayish-cyan text-light-grayish-cyan hover:bg-strong-cyan/20'
                                    }`}
                                >
                                    {name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <main className="p-6 sm:p-10">
                    <div key={activeCalculator} className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 fade-in">
                        {activeCalculator ? (
                            <>
                                <h2 className="text-2xl font-bold text-very-dark-cyan mb-6">{activeCalculator}</h2>
                                {CALCULATORS[activeCalculator].component}
                            </>
                        ) : (
                            <WelcomeScreen />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
