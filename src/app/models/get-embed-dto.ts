export interface GetEmbeddedDto
{
   id: number;

   category: string;

   prompt: string;

   completion: string;

   completionDate: Date;

   createdAt: Date;

   nTokens: number;

}