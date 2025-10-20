import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

const exchangeRates = {
    'USD': 1, 'EUR': 0.93, 'GBP': 0.79, 'JPY': 157.25,
    'CAD': 1.37, 'AUD': 1.50, 'INR': 83.54,
};
type Currency = keyof typeof exchangeRates;

interface CurrencyHistoryItem {
    id: number;
    amount: string;
    fromCurrency: Currency;
    toCurrency: Currency;
    convertedAmount: number;
}

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState<Currency>('USD');
    const [toCurrency, setToCurrency] = useState<Currency>('EUR');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<CurrencyHistoryItem>('currencyHistory');

    const convertedAmount = useMemo(() => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount < 0) return 0;
        const rateFrom = exchangeRates[fromCurrency];
        const rateTo = exchangeRates[toCurrency];
        return (numericAmount / rateFrom) * rateTo;
    }, [amount, fromCurrency, toCurrency]);

    const saveCalculation = useCallback(() => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            addHistoryEntry({
                id: Date.now(),
                amount,
                fromCurrency,
                toCurrency,
                convertedAmount,
            });
        }
    }, [amount, fromCurrency, toCurrency, convertedAmount, addHistoryEntry]);

    const handleSwapCurrencies = () => {
        const oldFrom = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(oldFrom);
    };

    useEffect(() => {
        saveCalculation();
    }, [fromCurrency, toCurrency, convertedAmount]); // Auto-save when currencies or result changes

    return (
        <div className="space-y-6">
             <div>
                <div className="mt-4">
                    <InputField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} onBlur={saveCalculation} />
                </div>
                <div className="flex items-end space-x-4 mt-4">
                    <CurrencySelect label="From" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value as Currency)} />
                    <button onClick={handleSwapCurrencies} className="p-3 bg-strong-cyan rounded-md text-very-dark-cyan mb-1 hover:bg-light-grayish-cyan transition-colors" aria-label="Swap currencies">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </button>
                    <CurrencySelect label="To" value={toCurrency} onChange={(e) => setToCurrency(e.target.value as Currency)} />
                </div>

                <div className="bg-very-light-grayish-cyan p-6 rounded-lg text-center mt-6">
                    <p className="text-dark-grayish-cyan font-bold">Converted Amount:</p>
                    <p className="text-4xl sm:text-5xl font-bold text-strong-cyan mt-2">
                        {convertedAmount.toLocaleString('en-US', { style: 'currency', currency: toCurrency, minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </p>
                    <p className="text-grayish-cyan font-bold mt-2">
                        1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
                    </p>
                </div>
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
                                <p className="text-dark-grayish-cyan font-bold">{item.amount} {item.fromCurrency}</p>
                                <p className="text-dark-grayish-cyan mx-2">&rarr;</p>
                                <p className="font-bold text-very-dark-cyan">{item.convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {item.toCurrency}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InputField = ({ label, value, onChange, onBlur }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; }) => (
    <div>
        <label className="text-dark-grayish-cyan font-bold mb-2 block">{label}</label>
        <input
            type="number"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="0.00"
            className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan"
        />
    </div>
);

const CurrencySelect = ({ label, value, onChange }: { label: string; value: Currency; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <div className="flex-1">
        <label className="text-dark-grayish-cyan font-bold mb-2 block">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan appearance-none">
            {Object.keys(exchangeRates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
        </select>
    </div>
);

export default CurrencyConverter;