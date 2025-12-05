import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');

    if (!clientID || !clientSecret) {
      console.warn(
        '⚠️  Google OAuth credentials not configured. Google login will not be available.',
      );
      // No lanzar error para permitir que el resto del app funcione
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL:
          callbackURL || 'http://localhost:3000/api/auth/google/callback',
        scope: ['email', 'profile'],
      });
      return;
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      username: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    done(null, user);
  }
}
