import 'express';

declare module "express-serve-static-core" {
  export interface Response {
    sendFormattedResponse: (
      statusCode?: number,
      success?: boolean,
      message?: string | null,
      data?: any,
      error?: any
    ) => void;
  }
}
