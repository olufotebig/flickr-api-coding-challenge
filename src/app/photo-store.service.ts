import { Injectable } from '@angular/core';
import { Photo } from './photo';
@Injectable()
export class PhotoStoreService {
  dataStore: Photo[];
  constructor() {}

  insert(photo: Photo) {
    this.dataStore.push(photo);
  }
}
