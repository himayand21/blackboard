import {getPlural} from './getPlural';

export const getRelativeTime = (previous, current = Date.now()) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) return 'A few seconds ago';
    if (elapsed < msPerHour) {
        const minutes = Math.round(elapsed / msPerMinute);
        return `${minutes} minute${getPlural(minutes)} ago`;
    }
    if (elapsed < msPerDay) {
        const hours = Math.round(elapsed / msPerHour);
        return `${hours} hour${getPlural(hours)} ago`;
    }
    if (elapsed < msPerMonth) {
        const days = Math.round(elapsed / msPerDay);
        return `${days} day${getPlural(days)} ago`;
    }
    if (elapsed < msPerYear) {
        const months = Math.round(elapsed / msPerMonth);
        return `${months} month${getPlural(months)} ago`;
    }
    const years = Math.round(elapsed / msPerYear);
    return `${years} year${getPlural(years)} ago`;
};