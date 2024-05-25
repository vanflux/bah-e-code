import { AuthDto } from 'src/auth/auth.dto';

declare global {
  declare namespace Express {
    declare interface Request {
      user?: AuthDto;
    }
  }
}

export {};
