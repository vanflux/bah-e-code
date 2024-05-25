import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) return next();
    const skipIndex = authorization.indexOf(' ') + 1;
    const accessToken = authorization.substring(skipIndex);
    req.user = await this.authService.decodeUser(accessToken);
    next();
  }
}
