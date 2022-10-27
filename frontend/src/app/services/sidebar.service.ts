import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _opened = new BehaviorSubject<boolean>(false)

  get opened(){
    return this._opened.asObservable()
  }
  
  public toggle(){
    this._opened.next(!this._opened.value)
  }

  constructor() {

  }
}
