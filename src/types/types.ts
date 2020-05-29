export interface IConversation {
  id: number;
  amount: number;
  buyerId: number;
  sellerId: number;
  status: "paid" | "not paid";
  paymentMethod: string;
  tradeHash: string;
  sellerHasNewMessages: boolean;
  buyerHasNewMessages: boolean;
}

export interface IUser {
  id: number;
  goodRating: number;
  badRating: number;
  name: string;
  current: boolean;
  avatar: string;
}

export interface IMessages {
  conversationId: number;
  senderId: number;
  text: string;
  time: number;
}

export interface IState {
  messages: IMessages[];
  conversations: IConversation[];
  users: IUser[];
  bitcoin: {
    bitcoinRate: number;
  };
}