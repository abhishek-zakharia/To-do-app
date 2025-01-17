import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditDataService {

  dataEmitter = new EventEmitter<any>();

  raiseDataEmitterEvent(data: any) {
    this.dataEmitter.emit(data);
  }
}
