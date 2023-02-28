export interface MessageTransaction {
    id: number;
    groupId?: string;
    userId: string;
    replyToken: string;
    messageId: string;
    messageText: string;
    messageDateTime: Date;
    requestMessage?: string;
    requestMessageLanguage?: string;
    isRequestMessageTranslate: boolean;
    requestMessageTranslatedText?: string;
    prompt?: string;
    responseMessage?: string;
    responseType?: string;
    responseMessageLanguage?: string;
    isResponseMessageTranslate: boolean;
    responseMessageTranslatedText?: string;
    responseMessageTranslatedTextLanguage?: string;
    replyMessage?: string;
    responseTimestamp: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    questionLevel: number;
    questionNo: string;
    questionRef?: string;
    success: boolean;
    errorMessage?: string;
    createdAt: number;
    updatedAt: number;
    embeddedId?: number;
    otherData?: string;
  }
  