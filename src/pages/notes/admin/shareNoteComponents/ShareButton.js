import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const ShareButton = (props) => {
    const [updating, setUpdating] = useState(false);

    const {id, loading, handleShare, alreadyShared} = props;

    const handleClick = async () => {
        setUpdating(true);
        await handleShare(id);
        setUpdating(false);
    };

    return (
        <button
            className={`standard-button ${alreadyShared ? 'revert-button' : ''}`}
            disabled={loading && updating}
            onClick={handleClick}
        >
            {alreadyShared ? 'Revert' : 'Share'}
        </button>
    );
};

ShareButton.propTypes = {
    id: PropTypes.string,
    loading: PropTypes.bool,
    handleShare: PropTypes.func,
    alreadyShared: PropTypes.bool
};