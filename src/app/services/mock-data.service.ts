import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private http: HttpClient) {}

  getJsonData(): Promise<any[]>{
    return this.http.get<any[]>('http://localhost:4200/assets/mock-data/data.json').toPromise();
  }
}
