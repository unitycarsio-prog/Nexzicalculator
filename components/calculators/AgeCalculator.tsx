import React, { useState, useMemo, useCallback } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

interface Age {
    years: number;
    months: number;
    days: number;
    error: string | null;
}

interface AgeHistoryItem {
    id: number;
    birthDate: string;
    age: Age;
}

const AgeCalculator: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<AgeHistoryItem>('ageHistory');

    const age = useMemo<Age | null>(() => {
        if (!birthDate) return null;

        const today = new Date();
        const birth = new Date(birthDate);
        if (birth > today) return { years: 0, months: 0, days: 0, error: "Birth date cannot be in the future." };

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        return { years, months, days, error: null };
    }, [birthDate]);

    const saveCalculation = useCallback(() => {
        if (age && !age.error) {
            addHistoryEntry({
                id: Date.now(),
                birthDate,
                age,
            });
        }
    }, [age, birthDate, addHistoryEntry]);

    return (
        <div className="space-y-6">
            <div>
                <div>
                    <label htmlFor="birthDate" className="text-dark-grayish-cyan font-bold mb-2 block">Your Date of Birth</label>
                    <input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        onBlur={saveCalculation}
                        className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan"
                    />
                </div>
                {age && (
                    <div className="bg-very-light-grayish-cyan p-6 rounded-lg text-center mt-6">
                        {age.error ? (
                            <p className="text-red-500 font-bold">{age.error}</p>
                        ) : (
                            <div>
                                <p className="text-dark-grayish-cyan font-bold">You are:</p>
                                <div className="flex justify-center items-baseline space-x-4 mt-2">
                                    <div>
                                        <span className="text-4xl sm:text-5xl font-bold text-strong-cyan">{age.years}</span>
                                        <span className="text-dark-grayish-cyan ml-2">Years</span>
                                    </div>
                                    <div>
                                        <span className="text-4xl sm:text-5xl font-bold text-strong-cyan">{age.months}</span>
                                        <span className="text-dark-grayish-cyan ml-2">Months</span>
                                    </div>
                                    <div>
                                        <span className="text-4xl sm:text-5xl font-bold text-strong-cyan">{age.days}</span>
                                        <span className="text-dark-grayish-cyan ml-2">Days</span>
                                    </div>
                                </div>
                                <p className="text-dark-grayish-cyan font-bold mt-4">old</p>
                            </div>
                        )}
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
                                <p className="text-dark-grayish-cyan">
                                    DOB: <span className="font-bold">{new Date(item.birthDate).toLocaleDateString()}</span>
                                    <span className="mx-2">&rarr;</span>
                                    Age: <span className="font-bold">{item.age.years}Y {item.age.months}M {item.age.days}D</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AgeCalculator;