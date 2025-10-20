import { useState, useEffect, useCallback } from 'react';

const useCalculationHistory = <T,>(key: string, limit: number = 5) => {
    const [history, setHistory] = useState<T[]>([]);

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem(key);
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to parse history from localStorage", error);
        }
    }, [key]);

    const addHistoryEntry = useCallback((entry: T) => {
        setHistory(prevHistory => {
            const newHistory = [entry, ...prevHistory].slice(0, limit);
            try {
                localStorage.setItem(key, JSON.stringify(newHistory));
            } catch (error) {
                console.error("Failed to save history to localStorage", error);
            }
            return newHistory;
        });
    }, [key, limit]);

    const clearHistory = useCallback(() => {
        setHistory([]);
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Failed to clear history from localStorage", error);
        }
    }, [key]);

    return { history, addHistoryEntry, clearHistory };
};

export default useCalculationHistory;
