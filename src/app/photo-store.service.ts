import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Photo } from './photo';

@Injectable()
export class PhotoStoreService {
  dataStore: Photo[];
  dataStoreSubject: Subject<Photo[]>;
  constructor() {
    this.dataStoreSubject = new Subject();
    this.dataStore = [];
  }

  insert(photo: Photo) {
    this.dataStore.push(photo);
    this.dataStoreSubject.next(this.dataStore);
  }
}
