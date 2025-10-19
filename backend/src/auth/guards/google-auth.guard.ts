import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const prompt = request.query.prompt;
    
    const options: any = {};
    
    if (prompt === 'select_account') {
      options.prompt = 'select_account';
      options.access_type = 'offline';
    }
    
    return options;
  }
}