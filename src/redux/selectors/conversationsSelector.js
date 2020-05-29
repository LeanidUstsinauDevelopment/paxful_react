export const getConversations = (state) => state.conversations;

export const getConversationById = (state, id) =>
    state.conversations.find((conversation) => conversation.id === id);