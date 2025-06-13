import { Request, Response, NextFunction } from "express";

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  res.sendFormattedResponse = (
    statusCode = 200,
    success = true,
    message = "Success",
    data = null,
    error = null
  ) => {
    res.status(statusCode).json({
      status: statusCode,
      success,  
      message,
      data,
      error,
    });
  };

  next();
};

export default responseFormatter;
