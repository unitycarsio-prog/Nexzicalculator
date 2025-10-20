import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

type CalcMode = 'percentOf' | 'isWhatPercent' | 'change';

interface PercentageHistoryItem {
    id: number;
    mode: CalcMode;
    val1: string;
    val2: string;
    result: number;
}

const PercentageCalculator: React.FC = () => {
    const [mode, setMode] = useState<CalcMode>('percentOf');
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<PercentageHistoryItem>('percentageHistory');

    const result = useMemo<number | null>(() => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);
        if (isNaN(v1) || isNaN(v2)) return null;

        switch (mode) {
            case 'percentOf': return (v1 / 100) * v2;
            case 'isWhatPercent': return v2 === 0 ? Infinity : (v1 / v2) * 100;
            case 'change': return v1 === 0 ? (v2 > 0 ? Infinity : -Infinity) : ((v2 - v1) / v1) * 100;
            default: return null;
        }
    }, [mode, val1, val2]);

    const saveCalculation = useCallback(() => {
        if (result !== null && isFinite(result)) {
            addHistoryEntry({ id: Date.now(), mode, val1, val2, result });
        }
    }, [result, mode, val1, val2, addHistoryEntry]);
    
    useEffect(() => {
        setVal1('');
        setVal2('');
    }, [mode]);

    const labels = {
        percentOf: { val1: 'Percentage (%)', val2: 'Value', result: `Result` },
        isWhatPercent: { val1: 'Value 1', val2: 'Value 2', result: `Percentage (%)` },
        change: { val1: 'Initial Value', val2: 'Final Value', result: `Change (%)` },
    };

    const formatHistory = (item: PercentageHistoryItem) => {
        switch (item.mode) {
            case 'percentOf': return `${item.val1}% of ${item.val2} = ${item.result.toFixed(2)}`;
            case 'isWhatPercent': return `${item.val1} is ${item.result.toFixed(2)}% of ${item.val2}`;
            case 'change': return `Change from ${item.val1} to ${item.val2} is ${item.result.toFixed(2)}%`;
            default: return '';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="mt-4">
                    <label className="text-dark-grayish-cyan font-bold mb-2 block">Calculation Type</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value as CalcMode)} className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan appearance-none">
                        <option value="percentOf">What is X% of Y?</option>
                        <option value="isWhatPercent">X is what percent of Y?</option>
                        <option value="change">Percentage change from X to Y</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <InputField label={labels[mode].val1} value={val1} onChange={(e) => setVal1(e.target.value)} onBlur={saveCalculation} />
                    <InputField label={labels[mode].val2} value={val2} onChange={(e) => setVal2(e.target.value)} onBlur={saveCalculation} />
                </div>

                {result !== null && (
                    <div className="bg-very-dark-cyan p-6 rounded-lg text-center mt-6">
                        <p className="text-white font-bold">{labels[mode].result}</p>
                        <p className="text-4xl sm:text-5xl font-bold text-strong-cyan mt-2">
                            {isFinite(result) ? result.toFixed(2) : 'N/A'}
                        </p>
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
                             <li key={item.id} className="bg-very-light-grayish-cyan p-3 rounded-lg text-sm fade-in">
                                <p className="text-dark-grayish-cyan font-bold">{formatHistory(item)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InputField = ({ label, value, onChange, onBlur }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void }) => (
    <div>
        <label className="text-dark-grayish-cyan font-bold mb-2 block">{label}</label>
        <input
            type="number"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="0"
            className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan"
        />
    </div>
);

export default PercentageCalculator;