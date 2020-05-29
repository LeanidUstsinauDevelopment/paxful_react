export const getMessages = (state) => state.messages
    .sort((a, b) => a.time - b.time);
