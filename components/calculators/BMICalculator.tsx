import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

type UnitSystem = 'metric' | 'imperial';

interface BmiResult {
    value: string;
    category: string;
}

interface BmiHistoryItem {
    id: number;
    height: string;
    weight: string;
    heightInches?: string;
    unitSystem: UnitSystem;
    bmi: BmiResult;
}

const BMICalculator: React.FC = () => {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<BmiHistoryItem>('bmiHistory');

    const bmiResult = useMemo<BmiResult | null>(() => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const hIn = parseFloat(heightInches);

        if ((unitSystem === 'metric' && h > 0 && w > 0) || (unitSystem === 'imperial' && h > 0 && w > 0 && hIn >= 0)) {
            let bmi;
            if (unitSystem === 'metric') {
                bmi = w / ((h / 100) ** 2);
            } else {
                const totalHeightInInches = h * 12 + (hIn || 0);
                bmi = (w / (totalHeightInInches ** 2)) * 703;
            }

            let category = '';
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal weight';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obesity';

            return { value: bmi.toFixed(1), category };
        }
        return null;
    }, [unitSystem, height, weight, heightInches]);

    const saveCalculation = useCallback(() => {
        if (bmiResult) {
            addHistoryEntry({
                id: Date.now(),
                unitSystem,
                height,
                weight,
                heightInches: unitSystem === 'imperial' ? heightInches : undefined,
                bmi: bmiResult,
            });
        }
    }, [bmiResult, unitSystem, height, weight, heightInches, addHistoryEntry]);

    const handleUnitChange = (system: UnitSystem) => {
        setUnitSystem(system);
        setHeight('');
        setWeight('');
        setHeightInches('');
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="grid grid-cols-2 gap-2 bg-light-grayish-cyan rounded-lg p-1">
                    <button onClick={() => handleUnitChange('metric')} className={`py-2 font-bold rounded-md transition-colors ${unitSystem === 'metric' ? 'bg-strong-cyan text-very-dark-cyan' : 'text-dark-grayish-cyan'}`}>Metric</button>
                    <button onClick={() => handleUnitChange('imperial')} className={`py-2 font-bold rounded-md transition-colors ${unitSystem === 'imperial' ? 'bg-strong-cyan text-very-dark-cyan' : 'text-dark-grayish-cyan'}`}>Imperial</button>
                </div>

                <div className="space-y-4 mt-6">
                    {unitSystem === 'metric' ? (
                        <>
                            <InputField label="Height" unit="cm" value={height} onChange={(e) => setHeight(e.target.value)} onBlur={saveCalculation} />
                            <InputField label="Weight" unit="kg" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={saveCalculation} />
                        </>
                    ) : (
                        <>
                            <div className="flex space-x-4">
                                <InputField label="Height" unit="ft" value={height} onChange={(e) => setHeight(e.target.value)} onBlur={saveCalculation} />
                                <InputField label=" " unit="in" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} onBlur={saveCalculation} />
                            </div>
                            <InputField label="Weight" unit="lbs" value={weight} onChange={(e) => setWeight(e.target.value)} onBlur={saveCalculation} />
                        </>
                    )}
                </div>
                {bmiResult && (
                    <div className="bg-very-dark-cyan text-white p-6 rounded-lg flex justify-between items-center mt-6">
                        <div>
                            <p className="font-bold text-grayish-cyan">Your BMI is</p>
                            <p className="text-4xl font-bold">{bmiResult.value}</p>
                        </div>
                        <p className="font-bold text-right">You are considered<br/><span className="text-strong-cyan">{bmiResult.category}</span></p>
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
                                    {item.unitSystem === 'metric' ? `H: ${item.height}cm, W: ${item.weight}kg` : `H: ${item.height}ft ${item.heightInches}in, W: ${item.weight}lbs`}
                                </p>
                                <p className="font-bold text-very-dark-cyan">BMI: {item.bmi.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const InputField = ({ label, unit, value, onChange, onBlur }: { label: string; unit: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: () => void; }) => (
    <div className="flex-1">
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
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-2xl font-bold text-strong-cyan">{unit}</span>
        </div>
    </div>
);

export default BMICalculator;