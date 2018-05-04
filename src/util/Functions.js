export const formatCommas = (number) => {
    if (number >= 10000000000) {
       return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (number >= 10000000) {
       return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 100000) {
       return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return number;
}

export const getFormatColor = number => {
    if (number >= 10000000000) {
        return "#FF0000";
    }
    if (number >= 10000000) {
        return "#0000FF";
    }
    if (number >= 100000) {
        return '#FFFFFF';
    }
    return '#FFFF00';
}