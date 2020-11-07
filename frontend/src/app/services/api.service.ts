import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class APIClient {
  public constructor(private http: HttpClient) {}

  public get<T>(
    url: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(environment.apiUrl + url, { headers, params });
  }

  public post<T>(url: string, body: object): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(environment.apiUrl + url, body, { headers });
  }

  public delete<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(environment.apiUrl + url, { headers });
  }

  public put<T>(url: string, body: object): Observable<T>;
  public put<T>(
    url: string,
    body: object,
    reportProgress: boolean
  ): Observable<HttpEvent<T>>;

  public put<T>(
    url: string,
    body: object,
    reportProgress = false
  ): Observable<T> | Observable<HttpEvent<T>> {
    const headers = this.getHeaders();
    return this.http.put<T>(environment.apiUrl + url, body, {
      reportProgress,
      headers
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({});
  }
}
