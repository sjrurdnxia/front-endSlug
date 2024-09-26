// src/app/auth/google-login-config.ts
import {
    SocialAuthServiceConfig,
    GoogleLoginProvider,
  } from '@abacritt/angularx-social-login';
  
  export const googleLoginOptions = {
    provider: GoogleLoginProvider.PROVIDER_ID,
    clientId: '144307599807-i3voi09b5cpf43b15u9r7qbiogl4pqoe.apps.googleusercontent.com',
  };
  
  export const socialLoginConfig: SocialAuthServiceConfig = {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(googleLoginOptions.clientId),
      },
    ],
  };
  