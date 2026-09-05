import { LogLevel, Configuration } from '@azure/msal-browser';
import { environment } from '../../environments/enivronment';

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.entra.clientId,
    authority: `https://login.microsoftonline.com/${environment.entra.tenantId}`,
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: () => {},
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
    },
  },
};

export const apiScopes = {
  scopes: [`api://${environment.entra.apiClientId}/access_as_user`],
};
