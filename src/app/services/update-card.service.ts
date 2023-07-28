import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateCardService {

  public isPixel: boolean = true;
  private eventSubject = new Subject<any>();

  emitEvent(eventData: any) {
    this.isPixel = eventData;
    this.eventSubject.next(eventData);
  }

  getEvent() {
    return this.eventSubject.asObservable();
  }

  getIsPixel(){
    return this.isPixel;
  }
}
