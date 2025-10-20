import React from 'react';

export const DollarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" fill="none" viewBox="0 0 13 20">
        <path fill="#9EBBBD" d="M12.408 8.441c.144-.384.216-1.008.216-1.872 0-1.872-.54-3.348-1.62-4.428C9.918 1.061 8.442.521 6.576.521c-1.224 0-2.268.305-3.132.914-.864.61-1.44 1.49-1.728 2.64-.18.72-.216 1.425-.09 2.115l2.232-.465c-.09-.465-.09-.855 0-1.17.18-.705.576-1.23 1.188-1.575.612-.345 1.356-.525 2.232-.525 1.296 0 2.268.45 2.916 1.35.648.9.972 2.1.972 3.6 0 .54-.072.99-.216 1.35L.312 11.129l2.256 8.358 2.436-.615-2.016-7.422L12.408 8.44Z"/>
    </svg>
);

export const PersonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="none" viewBox="0 0 14 16">
        <path fill="#9EBBBD" d="M13.017 14.123c-.15-2.028-1.07-3.57-2.763-4.625-1.693-1.055-3.64-1.583-5.84-1.583-2.2 0-4.148.528-5.84 1.583C-1.01 10.553-.93 12.095-.78 14.123h13.797ZM6.623 0C5.12 0 3.864.712 2.855 2.137 1.847 3.562 1.343 5.3 1.343 7.35c0 1.933.47 3.563 1.41 4.888 1.033 1.254 2.312 1.88 3.824 1.88 1.512 0 2.78-.626 3.812-1.88.94-1.325 1.41-2.955 1.41-4.888 0-2.05-.504-3.788-1.512-5.213C9.28.712 8.024 0 6.623 0Z"/>
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

// New Icons for Website Layout
export const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-strong-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
export const TipIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
export const AgeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
export const BMIIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
export const CurrencyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 10v1h4v-1m-4-10L8 7v4l4 2 4-2V7l-4-2z" />
    </svg>
);
export const PercentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM8.25 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm8.25 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 8.25L8.25 15.75" />
    </svg>
);
export const LoanIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l-6-2m0 0l-6 2m6 2l6 2M3 6l6-2m6 2l3-1m-3 1l-3 9" />
    </svg>
);
export const CountdownIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const UnitIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M8 7h8m-8 5h8m-8 5h8" />
    </svg>
);
