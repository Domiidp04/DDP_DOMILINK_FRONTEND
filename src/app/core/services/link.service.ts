import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LinkResponse } from '../models/linkResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  public apiUrl: string = 'http://localhost:8080/links'

  constructor(private http: HttpClient) { }

  public getLinks(id: number): Promise<LinkResponse[]>{
    return firstValueFrom(this.http.get<LinkResponse[]>(`${this.apiUrl}/${id}`))
  }

  public createShortLink(clientId: number, originalUrl: string): Promise<LinkResponse>{
    return firstValueFrom(this.http.post<LinkResponse>(`${this.apiUrl}/${clientId}`, {originalUrl: originalUrl}));
  }

  public getOriginalUrl(shortUrl: string): Promise<any>{
    return firstValueFrom(this.http.get(`${this.apiUrl}/redirect/${shortUrl}`));
  }
}
