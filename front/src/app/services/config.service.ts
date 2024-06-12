import { Injectable } from '@angular/core';
import { IRootConfiguration } from '../interfaces/root-configuration.interface';
import { environment } from '../../environments/environment';
import { catchError, mergeMap, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) {}

  public getConfig(): Observable<any> {
    return this.httpClient
      .get(this.getConfigFile(), {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        }),
        mergeMap((response) => {
          console.log('response: ' + response);
          if (response && response.body) {
            return of(<IRootConfiguration>response.body);
          } else {
            throw 'empty config.json';
          }
        })
      );
  }

  private getConfigFile(): string {
    return environment.configFile;
  }
}
