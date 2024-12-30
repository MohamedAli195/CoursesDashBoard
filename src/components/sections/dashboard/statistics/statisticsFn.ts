import axios from "axios";
import i18n from "i18n";

const url = 'https://market-mentor.flexi-code.com/public/api/admin/'


export const fetchStatis = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await axios.get(
      `${url}home-page`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept:'application/json',
          lang:i18n.language
        },
      },
    );

    return response.data;
  };