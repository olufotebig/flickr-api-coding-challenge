import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PhotoStoreService } from '../photo-store.service';
import { SearchService } from '../search.service';

import { Photo } from '../photo';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  form: NgForm;
  searchTagInput: string;
  userIdInput: string;
  searchServiceErrorMsg: string;
  constructor(
    private searchService: SearchService,
    private photoStoreService: PhotoStoreService
  ) {
    // subscribe to Error Subject: triggered if something goes wrong with api request
    this.searchService.tagPhotoErrorSubject.subscribe({
      next: v => this.onServiceError(v)
    });

    this.searchService.tagPhotoSubject.subscribe({
      next: photo => this.onPhotoResult(photo)
    });
  }

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.form = form;
    this.clearErrorMessage();
    this.searchService.searchTag(this.searchTagInput, this.userIdInput);
    // TODO show api is working
  }

  onCancel() {
    this.searchTagInput = '';
    this.userIdInput = '';
    this.clearErrorMessage();
  }

  clearErrorMessage() {
    this.searchServiceErrorMsg = '';
  }

  onServiceError(msg: string) {
    this.searchServiceErrorMsg = msg;
  }

  onPhotoResult(photo: Photo) {
    this.photoStoreService.insert(photo);
    this.form.reset();
  }
}
