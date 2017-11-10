import { Component, OnInit } from '@angular/core';

import { PhotoStoreService } from '../photo-store.service';

import { Photo } from '../photo';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.css']
})
export class SearchResultListComponent implements OnInit {
  photoData: Photo[];
  sortedPhotoData: Photo[];

  sortBy: string;
  constructor(private photoStoreService: PhotoStoreService) {
    this.sortBy = 'views';
    this.sortedPhotoData = [];
    this.photoStoreService.dataStoreSubject.subscribe({
      next: photos => this.nextPhotos(photos)
    });
  }

  nextPhotos(photos: Photo[]) {
    this.photoData = photos;
    this.sortPhoto();
  }

  sortPhoto() {
    // Valid sort options: views, datetaken, dateupload, ownername
    this.sortedPhotoData = Object.assign(this.photoData, {});
    let sortFunction;

    if (this.sortBy === 'ownername') {
      sortFunction = (a: Photo, b: Photo) => {
        const x = a.ownername.toLowerCase();
        const y = b.ownername.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      };
    } else if (this.sortBy === 'datetaken') {
      sortFunction = (a: Photo, b: Photo) => {
        return (
          new Date(b.datetaken).getTime() - new Date(a.datetaken).getTime()
        );
      };
    } else if (this.sortBy === 'dateupload') {
      sortFunction = (a: Photo, b: Photo) => {
        return parseInt(b.dateupload, 10) - parseInt(a.dateupload, 10);
      };
    } else {
      sortFunction = (a: Photo, b: Photo) => {
        return parseInt(b.views, 10) - parseInt(a.views, 10);
      };
    }
    this.sortedPhotoData.sort(sortFunction);
  }
  onSort(by: string) {
    this.sortBy = by;
    this.sortPhoto();
  }
  ngOnInit() {}
}
