export interface TrainingDto {
    id: number;
    messageDateTime: Date;
    messageText: string;
    requestMessageTranslatedText?: string;
    responseMessage?: string;
    responseType?: string;
    replyMessage?: string;
    embeddedId?: number;
    embeddedPrompt?: string;
    embeddedCompletion?: string;
    otherData?: string;
    databaseStatus: boolean;
    internetStatus: boolean;
    updateStatus: boolean;
    trainingStatus?: string;
}
