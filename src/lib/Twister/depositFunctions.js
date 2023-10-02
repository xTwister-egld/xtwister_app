import { utils } from 'ffjavascript';
import crypto from 'crypto-browserify';
import axios from 'axios';
import {getStats} from '../../apiRequests';
import {chain_ID} from 'config';
const keccak256 = require('keccak256');

const rbigint = (nbytes) => utils.leBuff2int(crypto.randomBytes(nbytes));

//TODO: AÑADIR PARAMETROS ENTRADA
export const Test = async (user_token, set_msg_error) => {
    const CHAIN_ID = chain_ID;
    const TOKEN = user_token.token;
    const AMOUNT = user_token.amount;
    const EPOCH = await (await getStats()).data.epoch;

    // console.log('rbigint');
    // console.log(rbigint)
    // console.log('cahin_id', CHAIN_ID);
    // console.log('epo', EPOCH)

    if (EPOCH) {
        const deposit = createDeposit(rbigint(32), EPOCH.toString());
        const note = `xTwister-${TOKEN}-${AMOUNT}-${CHAIN_ID}-` + Buffer.from(deposit.preimage.toString('hex'), 'ascii').toString('base64');
        const body = {
            "note" : note,
            "tx" : deposit.commitment.toString('hex')
        };
        return body;
    }else{
        set_msg_error('MultiversX Api Error')
    }
}

//COPY PASTE DEL FICHERO TORANDOFUNCTIONS/NETLIFY/FUNCTIONS/DEPOSIT.JS
function createDeposit(nullifier, secret) {
    let deposit = { nullifier, secret }
    // let epochBuffer = Buffer.from(deposit.secret);
    const epochBuffer = keccak256(Buffer.from(deposit.secret));
    // deposit.preimage = Buffer.concat([utils.leInt2Buff(deposit.nullifier,32), epochBuffer])
    deposit.preimage = Buffer.concat([Buffer.from(utils.leInt2Buff(deposit.nullifier,32)), epochBuffer]);;
    // console.log(deposit.preimage);
    deposit.nullifierHash = keccak256(Buffer.from(utils.leInt2Buff(deposit.nullifier, 32)));

    deposit.commitment = keccak256(Buffer.concat([deposit.nullifierHash, epochBuffer]));
    // console.log(deposit.commitment);
    deposit.nullifierHex = Buffer.from(utils.leInt2Buff(deposit.nullifier, 32)).toString('hex');
    
    return deposit
}