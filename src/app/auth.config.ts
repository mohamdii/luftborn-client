import { LogLevel, Configuration } from '@azure/msal-browser';
import { environment } from '../../environment/enivronment';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'your-Test-client-id',
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
  scopes: [`api://your-api-client-id/access_as_user`],
};
