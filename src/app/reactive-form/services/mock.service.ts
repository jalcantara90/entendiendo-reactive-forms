import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockService {

  constructor(private http: HttpClient) { }

  getMockData(): Observable<Array<{ name: string, email: string}>> {
    return this.http.get<Array<{ name: string, email: string}>>('assets/mock-data.json')
      .pipe(
        delay(1500)
      );
  }
}
