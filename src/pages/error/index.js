import React from 'react';
import {Background} from '../../components/background';

const Error = () => {
    return (
        <div className="screen-loader">
            <Background />
            <div className="loading-section">
                <div className="loading-user-details">
                    <div>Oh, Snap !</div>
                    <div className="button-wrapper">
                        <button
                            className="standard-button"
                            onClick={() => window.location.reload()}
                        >
							Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
