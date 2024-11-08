export const ZERO_BIGINT = BigInt(0);
export const ONE_BIGINT = BigInt(1);

export const toBigInt = (value: string | number): bigint => {
    if (typeof value === 'string') {
        // Remove any commas and handle decimal points
        value = value.replace(/,/g, '');
        if (value === '' || value === '.') return ZERO_BIGINT;
        return BigInt(Math.floor(Number(value)));
    }
    return BigInt(Math.floor(value));
};

export const fromBigInt = (value: bigint): string => {
    return value.toString();
};

export function toNano(amount: string | number, decimals: number = 9): bigint {
    if (typeof amount === 'string') {
        amount = parseFloat(amount);
    }
    return BigInt(Math.floor(amount * Math.pow(10, decimals)));
}

export function fromNano(amount: bigint, decimals: number = 9): string {
    return (Number(amount) / Math.pow(10, decimals)).toString();
}

export function formatNumber(
    num: number,
    decimals: number = 2,
    includeCommas: boolean = true
): string {
    if (isNaN(num)) return '0';

    const fixed = num.toFixed(decimals);
    if (!includeCommas) return fixed;

    const [whole, fraction] = fixed.split('.');
    return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${fraction}`;
}

// Safe comparison utilities
export const isGreaterThan = (a: bigint, b: bigint): boolean => {
    return a > b;
};

export const isLessThan = (a: bigint, b: bigint): boolean => {
    return a < b;
};

export const isEqual = (a: bigint, b: bigint): boolean => {
    return a === b;
};

// export function toNano(src: number | string | bigint, decimals: number = 9): bigint {
//     if (typeof src === 'bigint') {
//         return src * 10n ** BigInt(decimals);
//     } else {
//         if (typeof src === 'number') {
//             if (!Number.isFinite(src)) {
//                 throw Error('Invalid number');
//             }

//             if (Math.log10(src) <= 6) {
//                 src = src.toLocaleString('en', {
//                     minimumFractionDigits: decimals,
//                     useGrouping: false,
//                 });
//             } else if (src - Math.trunc(src) === 0) {
//                 src = src.toLocaleString('en', { maximumFractionDigits: 0, useGrouping: false });
//             } else {
//                 throw Error('Not enough precision for a number value. Use string value instead');
//             }
//         }
//         // Check sign
//         let neg = false;
//         while (src.startsWith('-')) {
//             neg = !neg;
//             src = src.slice(1);
//         }

//         // Split string
//         if (src === '.') {
//             throw Error('Invalid number');
//         }
//         let parts = src.split('.');
//         if (parts.length > 2) {
//             throw Error('Invalid number');
//         }

//         // Prepare parts
//         let whole = parts[0];
//         let frac = parts[1];
//         if (!whole) {
//             whole = '0';
//         }
//         if (!frac) {
//             frac = '0';
//         }
//         if (frac.length > decimals) {
//             throw Error('Invalid number');
//         }
//         while (frac.length < decimals) {
//             frac += '0';
//         }

//         // Convert
//         let r = BigInt(whole) * 10n ** BigInt(decimals) + BigInt(frac);
//         if (neg) {
//             r = -r;
//         }
//         return r;
//     }
// }

// export function fromNano(src: bigint | number | string, decimals: number = 9) {
//     let v = BigInt(src);
//     let neg = false;
//     if (v < 0) {
//         neg = true;
//         v = -v;
//     }

//     // Convert fraction
//     let frac = v % 10n ** BigInt(decimals);
//     let facStr = frac.toString();
//     while (facStr.length < decimals) {
//         facStr = '0' + facStr;
//     }
//     facStr = facStr.match(/^([0-9]*[1-9]|0)(0*)/)![1];

//     // Convert whole
//     let whole = v / 10n ** BigInt(decimals);
//     let wholeStr = whole.toString();

//     // Value
//     let value = `${wholeStr}${facStr === '0' ? '' : `.${facStr}`}`;
//     if (neg) {
//         value = '-' + value;
//     }

//     return value;
// }
