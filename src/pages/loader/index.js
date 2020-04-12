import React, {useState, useEffect} from 'react';
import {Background} from '../../components/background';

const Loader = () => {
    const [dotCount, setDotCount] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevDotCount) => {
                if (prevDotCount.length === 3) return '';
                return prevDotCount + '.';
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="screen-loader">
            <Background />
            <div className="loading-section">
                <div className="loading-text">{`Loading ${dotCount}`}</div>
            </div>
        </div>
    );
};

export default Loader;
