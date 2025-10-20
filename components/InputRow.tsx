import React from 'react';

interface InputRowProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: boolean;
    errorMessage?: string;
    onBlur?: () => void;
}

const InputRow: React.FC<InputRowProps> = ({ label, icon, value, onChange, placeholder, error = false, errorMessage, onBlur }) => {
    const errorClasses = error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-strong-cyan';
    
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-dark-grayish-cyan font-bold">{label}</label>
                {error && <span className="text-red-500 font-bold">{errorMessage}</span>}
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {icon}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full bg-very-light-grayish-cyan text-very-dark-cyan text-2xl font-bold text-right p-3 rounded-md focus:outline-none ${errorClasses}`}
                />
            </div>
        </div>
    );
};

export default InputRow;