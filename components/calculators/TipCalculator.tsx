import React, { useState, useEffect, useCallback } from 'react';
import { DollarIcon, PersonIcon, TrashIcon } from '../icons';
import InputRow from '../InputRow';
import TipButton from '../TipButton';
import ResultDisplay from '../ResultDisplay';
import useCalculationHistory from '../../hooks/useCalculationHistory';

const tipPercentages = [5, 10, 15, 25, 50];

interface TipHistoryItem {
    id: number;
    bill: string;
    people: string;
    tip: string;
    totalPerPerson: number;
}

const TipCalculator: React.FC = () => {
    const [bill, setBill] = useState('');
    const [people, setPeople] = useState('');
    const [tip, setTip] = useState<number | ''>('');
    const [customTip, setCustomTip] = useState('');
    const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
    const [totalPerPerson, setTotalPerPerson] = useState(0);

    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<TipHistoryItem>('tipHistory');

    const isResetEnabled = bill !== '' || people !== '' || tip !== '' || customTip !== '';

    const saveCalculation = useCallback(() => {
        const billValue = parseFloat(bill);
        const peopleValue = parseInt(people, 10);
        const tipValue = typeof tip === 'number' ? tip : parseFloat(customTip);

        if (billValue > 0 && peopleValue > 0 && tipValue >= 0) {
            const totalTip = billValue * (tipValue / 100);
            const totalBill = billValue + totalTip;
            addHistoryEntry({
                id: Date.now(),
                bill,
                people,
                tip: customTip ? `${customTip}% (Custom)` : `${tip}%`,
                totalPerPerson: totalBill / peopleValue,
            });
        }
    }, [bill, people, tip, customTip, addHistoryEntry]);

    const calculateTotals = useCallback(() => {
        const billValue = parseFloat(bill);
        const peopleValue = parseInt(people, 10);
        const tipValue = typeof tip === 'number' ? tip : parseFloat(customTip);

        if (billValue > 0 && peopleValue > 0 && tipValue >= 0) {
            const totalTip = billValue * (tipValue / 100);
            const totalBill = billValue + totalTip;
            setTipAmountPerPerson(totalTip / peopleValue);
            setTotalPerPerson(totalBill / peopleValue);
        } else {
            setTipAmountPerPerson(0);
            setTotalPerPerson(0);
        }
    }, [bill, people, tip, customTip]);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);

    const handleTipSelect = (percentage: number) => {
        setTip(percentage);
        setCustomTip('');
    };

    const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setCustomTip(value);
            setTip('');
        }
    };

    const handleReset = () => {
        setBill('');
        setPeople('');
        setTip('');
        setCustomTip('');
        setTipAmountPerPerson(0);
        setTotalPerPerson(0);
    };

    // Use effect to save after state has been updated from handleTipSelect
    useEffect(() => {
        if (tip !== '') {
            saveCalculation();
        }
    }, [tip, saveCalculation]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="flex flex-col space-y-8">
                    <InputRow
                        label="Bill"
                        icon={<DollarIcon />}
                        value={bill}
                        onChange={(e) => setBill(e.target.value.replace(/[^0-9.]/g, ''))}
                        onBlur={saveCalculation}
                        placeholder="0"
                    />
                    <div>
                        <label className="text-dark-grayish-cyan font-bold mb-2 block">Select Tip %</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {tipPercentages.map((percentage) => (
                                <TipButton
                                    key={percentage}
                                    percentage={percentage}
                                    isActive={tip === percentage}
                                    onClick={() => handleTipSelect(percentage)}
                                />
                            ))}
                            <input
                                type="text"
                                value={customTip}
                                onChange={handleCustomTipChange}
                                onBlur={saveCalculation}
                                placeholder="Custom"
                                className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold text-center rounded-md placeholder-dark-grayish-cyan focus:outline-none focus:ring-2 focus:ring-strong-cyan"
                            />
                        </div>
                    </div>
                    <InputRow
                        label="Number of People"
                        icon={<PersonIcon />}
                        value={people}
                        onChange={(e) => setPeople(e.target.value.replace(/[^0-9]/g, ''))}
                        onBlur={saveCalculation}
                        placeholder="0"
                        error={people === '0'}
                        errorMessage="Can't be zero"
                    />
                </div>
                <div className="bg-very-dark-cyan rounded-2xl p-6 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                        <ResultDisplay label="Tip Amount" subtext="/ person" amount={tipAmountPerPerson} />
                        <ResultDisplay label="Total" subtext="/ person" amount={totalPerPerson} />
                    </div>
                    <button
                        onClick={handleReset}
                        disabled={!isResetEnabled}
                        className="w-full mt-8 bg-strong-cyan text-very-dark-cyan text-xl font-bold uppercase py-3 rounded-md transition-colors duration-200 hover:bg-light-grayish-cyan disabled:bg-dark-grayish-cyan/20 disabled:cursor-not-allowed">
                        Reset
                    </button>
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
                    <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {history.map((item) => (
                            <li key={item.id} className="bg-very-light-grayish-cyan p-3 rounded-lg flex justify-between items-center text-sm fade-in">
                                <div className="text-dark-grayish-cyan">
                                    <p>Bill: <span className="font-bold">${item.bill}</span>, People: <span className="font-bold">{item.people}</span>, Tip: <span className="font-bold">{item.tip}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-grayish-cyan">Total/person</p>
                                    <p className="font-bold text-lg text-very-dark-cyan">${item.totalPerPerson.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TipCalculator;