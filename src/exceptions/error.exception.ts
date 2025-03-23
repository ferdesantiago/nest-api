import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(status: number, message: string, details?: string) {
    super(
      {
        title: message,
        status,
        detail: details ?? 'An error occurred',
        errors: [
          {
            message,
          },
        ],
      },
      status,
      {
        cause: new Error(message),
      },
    );
  }
}
