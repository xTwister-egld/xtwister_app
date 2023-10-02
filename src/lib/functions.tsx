import BigNumber from 'bignumber.js';

function formatTokenIdentifier(tokenIdentifier: string) {
    tokenIdentifier.split('-');
    return tokenIdentifier.split('-').length > 1
        ? tokenIdentifier.split('-')[0]
        : tokenIdentifier;
}

function decimalToHex(data: string) {
    const bn = new BigNumber(data, 10);
    let bnStr = bn.toString(16);
    if (bnStr.length % 2 !== 0) {
        bnStr = '0' + bnStr;
    }
    return bnStr;
}

function stringToHex(data: string) {
    return Buffer.from(data, 'ascii').toString('hex');
}

function hexToDecimal(data: string) {
    return parseInt(new BigNumber(data, 16).toString(10));
}

function base64ToHex(data: string) {
    return Buffer.from(
        data,
        'base64'
    ).toString('hex').toString();
}

export {
    stringToHex,
    decimalToHex,
    formatTokenIdentifier,
    hexToDecimal,
    base64ToHex
};
