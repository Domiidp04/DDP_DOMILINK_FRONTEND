import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkEventService {

  private linkAddedSource = new Subject<void>();
  linkAdded$ = this.linkAddedSource.asObservable();

  notifyLinkAdded() {
    this.linkAddedSource.next();
  }
}
