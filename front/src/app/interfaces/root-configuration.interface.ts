import { IKeycloakConfiguration } from './keycloak-configuration.interface';
import { IKeycloakInitOptions } from './keycloak-init-options.interface';
import { IBrowserSettings } from './browser-settings.interface';

export interface IRootConfiguration {
  keycloak: IKeycloakConfiguration;

  keycloakInitOptions: IKeycloakInitOptions;

  browserSettings: IBrowserSettings;
}
