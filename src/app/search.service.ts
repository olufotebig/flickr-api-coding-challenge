import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
  constructor() {}
  searchTag(tag: string) {
    console.log('search tag', tag);
  }
}
