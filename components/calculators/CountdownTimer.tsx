import React, { useState, useEffect, useMemo } from 'react';

const CountdownTimer: React.FC = () => {
    const defaultDate = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0, 16);
    }, []);

    const [targetDate, setTargetDate] = useState(defaultDate);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        if (!isCounting) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsCounting(false);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, isCounting]);

    const handleStart = () => {
        if (new Date(targetDate) > new Date()) {
            setIsCounting(true);
        } else {
            alert("Please select a future date and time.");
        }
    };
    
    const handleReset = () => {
        setIsCounting(false);
        setTargetDate(defaultDate);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="targetDate" className="text-dark-grayish-cyan font-bold mb-2 block">Target Date & Time</label>
                <input
                    id="targetDate"
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    disabled={isCounting}
                    className="w-full bg-very-light-grayish-cyan text-very-dark-cyan text-xl font-bold p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-strong-cyan disabled:opacity-50"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={handleStart} disabled={isCounting} className="w-full bg-strong-cyan text-very-dark-cyan text-xl font-bold uppercase py-3 rounded-md transition-colors duration-200 hover:bg-light-grayish-cyan disabled:bg-dark-grayish-cyan/20 disabled:cursor-not-allowed">
                    Start
                </button>
                <button onClick={handleReset} className="w-full bg-very-dark-cyan text-white text-xl font-bold uppercase py-3 rounded-md transition-colors duration-200 hover:bg-dark-grayish-cyan">
                    Reset
                </button>
            </div>
            
            <div className="bg-very-dark-cyan p-6 rounded-lg text-white">
                <div className="flex justify-around text-center">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div>
        <p className="text-4xl sm:text-5xl font-bold text-strong-cyan">{String(value).padStart(2, '0')}</p>
        <p className="text-sm text-grayish-cyan uppercase tracking-widest">{label}</p>
    </div>
);

export default CountdownTimer;