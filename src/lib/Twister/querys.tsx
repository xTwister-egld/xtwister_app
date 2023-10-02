import {
    Address,
    ContractFunction,
    BytesValue,
    Query,
    U64Value,
} from '@multiversx/sdk-core/out';
import { apiUrl, contractAddress, IMarks, marks } from 'config';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { base64ToHex, hexToDecimal } from 'lib/functions';
import { Iuser_token } from 'pages/Dashboard/components/Deposit/deposit';



/* Get Number of deposit per token/amount */
const getDepositsPerTokenAmount = async function (
    user_token: Iuser_token
) {
    const amount_int = parseInt(user_token.amount) * 10 ** 18;

    const query = new Query({
        address: new Address(contractAddress),
        func: new ContractFunction('getDepositsPerTokenAmount'),
        args: [BytesValue.fromUTF8(user_token.token), new U64Value(amount_int)],
    });
    const proxy = new ProxyNetworkProvider(apiUrl);
    const returnData = await proxy.queryContract(query);
    const [encoded] = returnData.returnData;
    if (encoded === undefined || encoded === '') return 0;

    const decoded = base64ToHex(encoded);
    return (hexToDecimal(decoded));
};

const getAmountsByToken = async function (
    token: string,
    marks: IMarks[],
) {
    const query = new Query({
        address: new Address(contractAddress),
        func: new ContractFunction('getAmountsByToken'),
        args: [BytesValue.fromUTF8(token)],
    });
    const proxy = new ProxyNetworkProvider(apiUrl);
    const returnData = await proxy.queryContract(query);

    returnData.returnData.forEach(element => {
        element = base64ToHex(element);
        const values = hexToDecimal(element) / 10 ** 18;
        marks.filter((mark) => {
            if (mark.value.toString() === values.toString()) {
                mark.disabled = false;
            }
            return null;
        });
    });

    return marks;
};





export {
    getDepositsPerTokenAmount,
    getAmountsByToken
};
