import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  public answersSubject: BehaviorSubject<{ [k: string]: any }>;
  public allServiceSubject: BehaviorSubject<string[]>;

  constructor() {
    this.answersSubject = new BehaviorSubject<{ [p: string]: any }>(void 0);
    this.allServiceSubject = new BehaviorSubject<string[]>(void 0);
  }

  get answers(): Observable<{ [k: string]: any }> {
    return this.answersSubject;
  }

  get allServices(): Observable<string[]> {
    return this.allServiceSubject;
  }
}
