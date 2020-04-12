export const getSpan = (length) => {
    if (!length) {
        return ({
            span: 1,
            toBeDisplayed: 0
        });
    }
    if (length > 4) {
        return ({
            span: 2,
            toBeDisplayed: length >= 8 ? 8 : length
        });
    }
    return ({
        span: 1,
        toBeDisplayed: 2
    });
};