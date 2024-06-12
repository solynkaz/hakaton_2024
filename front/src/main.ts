import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { IBrowserSettings } from './app/interfaces/browser-settings.interface';
import { IRootConfiguration } from './app/interfaces/root-configuration.interface';
import { httpClientService } from './app/services/http-client.service';
import { environment } from './environments/environment';

function bootstrapMain(): void {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

function load() {
  httpClientService<IRootConfiguration>(
    location.origin + environment.configFile
  ).then((res) => {
    const config = res && res.parsedBody ? res.parsedBody : null;
    console.dir(config);
    if (!config) {
      return;
    }

    bootstrapMain();
  });
}

function loadBrowserSettings(browserSettings: IBrowserSettings): void {
  if (browserSettings && browserSettings.title) {
    document.title = browserSettings.title;
  }
  if (browserSettings && browserSettings.favicon) {
    const favicon = document.head.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.setAttribute('href', browserSettings.favicon);
    } else {
      document.querySelector('link[rel="icon"]');
      const link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('type', 'image/x-icon');
      link.setAttribute('href', browserSettings.favicon);
      document.head.append(link);
    }
  }
}

load();
