import { SET_BITCOIN_RATE } from "../../constants/actionTypes";

export const getBitcoinData = () => async (dispatch) => {
  const url = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
  const result = await fetch(url).then((response) => response.json());

  dispatch({
    type: SET_BITCOIN_RATE,
    payload: result.bpi.USD.rate_float,
  });
};
