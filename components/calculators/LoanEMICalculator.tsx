import React, { useState, useMemo, useCallback } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

interface EmiResult {
    emi: number;
    totalInterest: number;
    totalPayment: number;
}

interface EmiHistoryItem {
    id: number;
    principal: string;
    interestRate: string;
    tenure: string;
    emi: number;
}

const LoanEMICalculator: React.FC = () => {
    const [principal, setPrincipal] = useState('100000');
    const [interestRate, setInterestRate] = useState('7.5');
    const [tenure, setTenure] = useState('10');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<EmiHistoryItem>('loanHistory');

    const emiResult = useMemo<EmiResult | null>(() => {
        const p = parseFloat(principal);
        const r = parseFloat(interestRate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayment = emi * n;
            const totalInterest = totalPayment - p;
            return { emi, totalInterest, totalPayment };
        }
        return null;
    }, [principal, interestRate, tenure]);

    const saveCalculation = useCallback(() => {
        if (emiResult) {
            addHistoryEntry({
                id: Date.now(),
                principal,
                interestRate,
                tenure,
                emi: emiResult.emi,
            });
        }
    }, [emiResult, principal, interestRate, tenure, addHistoryEntry]);

    return (
        <div className="space-y-6">
            <div>
                <div className="space-y-4 mt-4">
                    <InputField label="Loan Amount" unit="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} onBlur={saveCalculation} />
                    <InputField label="Annual Interest Rate" unit="%" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} onBlur={saveCalculation} />
                    <InputField label="Loan Tenure" unit="Years" value={tenure} onChange={(e) => setTenure(e.target.value)} onBlur={saveCalculation} />
                </div>

                {emiResult && (
                    <div className="space-y-6 mt-6">
                        <ResultCard label="Monthly EMI" amount={emiResult.emi} isPrimary />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ResultCard label="Total Interest Payable" amount={emiResult.totalInterest} />
                            <ResultCard label="Total Payment" amount={emiResult.totalPayment} />
                        </div>
                    </div>
                )}
            </div>
            {history.length > 0 && (
                <div className="mt-8 pt-6 border-t border-light-grayish-cyan/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-dark-grayish-cyan">Recent History</h3>
                        <button onClick={clearHistory} className="flex items-center space-x-2 text-grayish-cyan hover:text-strong-cyan font-bold transition-colors">
                            <TrashIcon className="h-5 w-5" />
                            <span>Clear</span>
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {history.map((item) => (
                            <li key={item.id} className="bg-very-light-grayish-cyan p-3 rounded-lg flex justify-between items-center text-sm fade-in">
                                <p className="text-dark-grayish-cyan">
                                    ${parseFloat(item.principal).toLocaleString()} @ {item.interestRate}% for {item.tenure} yrs
                                </p>
                                <p className="font-bold text-very-dark-cyan">EMI: {item.emi.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InputField = ({ label, unit, value, onChange, onBlur }: { label: string; unit: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; }) => (
    <div>
        <label className="text-dark-grayish-cyan font-bold mb-2 block">{label}</label>
        <div className="relative">
            <input
                type="number"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="0"
                className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold text-right p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan"
            />
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-2xl font-bold text-grayish-cyan">{unit}</span>
        </div>
    </div>
);

const ResultCard = ({ label, amount, isPrimary = false }: { label: string; amount: number; isPrimary?: boolean }) => {
    const bgColor = isPrimary ? 'bg-very-dark-cyan' : 'bg-very-light-grayish-cyan';
    const textColor = isPrimary ? 'text-white' : 'text-very-dark-cyan';
    const amountColor = isPrimary ? 'text-strong-cyan' : 'text-strong-cyan';

    return (
        <div className={`${bgColor} p-4 rounded-lg text-center`}>
            <p className={`font-bold ${textColor}`}>{label}</p>
            <p className={`text-3xl font-bold mt-1 ${amountColor}`}>
                {amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
        </div>
    );
};

export default LoanEMICalculator;