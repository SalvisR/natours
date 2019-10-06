/* eslint-disable */
import axios from 'axios';
import {
  showAlert
} from './alerts';

// type is eather 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' ? '/api/v1/users/updatemypassword' : '/api/v1/users/updateme';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type === 'password' ? 'Password' : 'Data'} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
