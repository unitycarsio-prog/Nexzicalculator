import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useCalculationHistory from '../../hooks/useCalculationHistory';
import { TrashIcon } from '../icons';

type ConversionType = 'length' | 'weight' | 'temperature';

const conversionFactors = {
    length: { meter: 1, kilometer: 1000, feet: 0.3048, mile: 1609.34 },
    weight: { gram: 1, kilogram: 1000, pound: 453.592, ounce: 28.3495 },
};

interface UnitHistoryItem {
    id: number;
    value: string;
    fromUnit: string;
    toUnit: string;
    result: string;
}

const UnitConverter: React.FC = () => {
    const [type, setType] = useState<ConversionType>('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('feet');
    const [value, setValue] = useState('1');
    const { history, addHistoryEntry, clearHistory } = useCalculationHistory<UnitHistoryItem>(`unitHistory_${type}`);

    const unitConfig = useMemo(() => ({
        length: { units: ['meter', 'kilometer', 'feet', 'mile'], factors: conversionFactors.length },
        weight: { units: ['gram', 'kilogram', 'pound', 'ounce'], factors: conversionFactors.weight },
        temperature: { units: ['Celsius', 'Fahrenheit', 'Kelvin'], factors: {} },
    }), []);

    const result = useMemo(() => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return '';

        if (type === 'temperature') {
            if (fromUnit === toUnit) return numValue.toFixed(2);
            if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') return ((numValue * 9/5) + 32).toFixed(2);
            if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') return ((numValue - 32) * 5/9).toFixed(2);
            if (fromUnit === 'Celsius' && toUnit === 'Kelvin') return (numValue + 273.15).toFixed(2);
            if (fromUnit === 'Kelvin' && toUnit === 'Celsius') return (numValue - 273.15).toFixed(2);
            if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') return (((numValue - 32) * 5/9) + 273.15).toFixed(2);
            if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') return (((numValue - 273.15) * 9/5) + 32).toFixed(2);
        } else {
            const factors = unitConfig[type].factors;
            const fromFactor = factors[fromUnit as keyof typeof factors];
            const toFactor = factors[toUnit as keyof typeof factors];
            return ((numValue * fromFactor) / toFactor).toFixed(4);
        }
        return '';
    }, [value, type, fromUnit, toUnit, unitConfig]);

    const saveCalculation = useCallback(() => {
        if (value && result) {
            addHistoryEntry({ id: Date.now(), value, fromUnit, toUnit, result });
        }
    }, [value, fromUnit, toUnit, result, addHistoryEntry]);

    useEffect(() => {
        if(value && result) saveCalculation();
    }, [fromUnit, toUnit]);
    
    const handleTypeChange = (newType: ConversionType) => {
        setType(newType);
        setValue('1');
        setFromUnit(unitConfig[newType].units[0]);
        setToUnit(unitConfig[newType].units[1]);
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="grid grid-cols-3 gap-2 bg-light-grayish-cyan rounded-lg p-1">
                    <TabButton label="Length" isActive={type === 'length'} onClick={() => handleTypeChange('length')} />
                    <TabButton label="Weight" isActive={type === 'weight'} onClick={() => handleTypeChange('weight')} />
                    <TabButton label="Temperature" isActive={type === 'temperature'} onClick={() => handleTypeChange('temperature')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <UnitInput value={value} onChange={e => setValue(e.target.value)} onBlur={saveCalculation} unit={fromUnit} onUnitChange={e => setFromUnit(e.target.value)} units={unitConfig[type].units} />
                    <UnitInput value={result} readOnly unit={toUnit} onUnitChange={e => setToUnit(e.target.value)} units={unitConfig[type].units} />
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
                                <p className="text-dark-grayish-cyan">{item.value} {item.fromUnit}</p>
                                <p className="text-dark-grayish-cyan mx-2">&rarr;</p>
                                <p className="font-bold text-very-dark-cyan">{item.result} {item.toUnit}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`py-2 font-bold rounded-md transition-colors ${isActive ? 'bg-strong-cyan text-very-dark-cyan' : 'text-dark-grayish-cyan'}`}>{label}</button>
);

const UnitInput = ({ value, onChange, onBlur, unit, onUnitChange, units, readOnly=false }: any) => (
    <div className="space-y-2">
        <input type="number" value={value} onChange={onChange} onBlur={onBlur} readOnly={readOnly} className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan read-only:bg-light-grayish-cyan/50" />
        <select value={unit} onChange={onUnitChange} className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-md font-bold p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan appearance-none">
            {units.map((u: string) => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
        </select>
    </div>
);

export default UnitConverter;