import axios from 'axios';
import { apiUrl, apiUrlTwister } from 'config';
import { Iuser_token } from 'pages/Dashboard/components/Deposit/deposit';

/* GET NOTE, VALUE FOR TX */
async function getNoteDeposit(user_token: Iuser_token, set_msg_error: any) {
  try {
    const data = JSON.stringify({ 'amount': user_token.amount, 'token': user_token.token });
    console.log(`${apiUrlTwister}/functions/deposit`);
    const response = await axios.post(`${apiUrlTwister}/functions/deposit`, data);
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      set_msg_error(err.message);
    } else {
      set_msg_error(err.response.data ? err.response.data : 'Network error');
    }
    return null;
  }
}

async function getNoteClaim(note: string, donar:boolean,address: string, set_msg_error: any) {
  try {
    const data = JSON.stringify({ 'note': note, 'donate':donar, 'address': address });
    // const response = await axios.get(`${apiUrlTwister}/functions/claim?note=${note}`);
    const response = await axios.post(`${apiUrlTwister}/functions/claim`, data,  {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
  });
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      set_msg_error(err.message);
    } else {
      set_msg_error(err.response.data ? err.response.data : 'Network error');
    }
    return null;
  }
}


export { getNoteDeposit, getNoteClaim };
