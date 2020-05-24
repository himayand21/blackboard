import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

export const Container = (props) => {
    const {toast, show, removeToast} = props;

    useEffect(() => {
        const duration = 3000;
        const timer = setTimeout(() => removeToast(), duration);
        return () => clearTimeout(timer);
    }, [removeToast]);

    const renderIcon = (type) => {
        switch (type) {
            case 'error': return <i className="fas fa-skull-crossbones" />;
            case 'info': return <i className="fas fa-info" />;
            case 'success': return <i className="fas fa-check" />;
            case 'warning': return <i className="fas fa-exclamation" />;
            default: return <i className="fas fa-info" />;
        }
    };

    return ReactDOM.createPortal(
        <div className={`toast-container ${show ? 'toast-showing' : 'toast-hiding'} toast-${toast.type}`}>
            <div className="animate-1 toast-wrapper">
                <span className="toast-icon">
                    {renderIcon(toast.type)}
                </span>
                <span className="toast-message">{toast.message}</span>
                <i className="fas fa-times" onClick={removeToast} />
            </div>
        </div>,
        document.getElementById('toast-root')
    );
};
