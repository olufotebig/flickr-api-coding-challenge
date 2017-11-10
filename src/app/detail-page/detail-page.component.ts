import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
  providers: [GalleryService]
})
export class DetailPageComponent implements OnInit {
  tag: string;
  photos;
  currentlyDisplayedPhotos;
  constructor(
    private activatedRoute: ActivatedRoute,
    private galleryService: GalleryService
  ) {
    this.galleryService.photosSubject.subscribe({
      next: photos => this.setPhotos(photos)
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tag = params['tag'];
      this.loadPage('1');
    });
  }

  loadPage(page: string) {
    this.galleryService.getPage(page, this.tag);
  }

  setPhotos(photos) {
    this.photos = photos;
    this.currentlyDisplayedPhotos = this.photos['photo'].slice(0, 10);
  }
}
