const DEFAULT_STATE = {
  bitcoinRate: 0,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_BITCOIN_RATE":
      return { ...state, bitcoinRate: action.payload };
    default:
      return state;
  }
};
