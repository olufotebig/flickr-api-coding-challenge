import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Photo } from './photo';

const FLICKR_API_KEY = '19405ffdf5ac89d797429f64455e3b1a';
const FLICKR_API_BASE_URL = 'https://api.flickr.com/services/rest';

@Injectable()
export class SearchService {
  tagPhotoSubject: Subject<Photo>;
  tagPhotoErrorSubject: Subject<string>;

  constructor(private http: HttpClient) {
    this.tagPhotoSubject = new Subject();
    this.tagPhotoErrorSubject = new Subject();
  }
  searchTag(tag: string, user_id) {
    let params = new HttpParams();
    params = params.append('api_key', FLICKR_API_KEY);
    params = params.append('method', 'flickr.photos.search');
    params = params.append('sort', 'interestingness-desc');
    params = params.append('per_page', '1');
    params = params.append(
      'extras',
      ' date_upload,date_taken,owner_name,views,url_q'
    );
    params = params.append('format', 'json');
    params = params.append('nojsoncallback', '1');

    params = params.append('tags', tag);
    if (user_id) {
      params = params.append('user_id', user_id);
    }
    this.http.get(FLICKR_API_BASE_URL, { params }).subscribe(
      data => {
        if (data['stat'] === 'fail') {
          this.tagPhotoErrorSubject.next(`An internal error occured`); // 'invalid api request' check data['code'], data['message']
        } else if (data['stat'] === 'ok') {
          // check for results
          if (data['photos']['total'] * 1 === 0) {
            this.tagPhotoErrorSubject.next(`No images found for tag: ${tag}`);
          } else {
            let photo: Photo;
            photo = data['photos']['photo'][0];
            photo['tag'] = tag;
            this.tagPhotoSubject.next(photo);
          }
        } else {
          this.tagPhotoErrorSubject.next(`An internal error occured`);
        }
      },
      (err: HttpErrorResponse) => {
        // TODO: get error message for debugging
        this.tagPhotoErrorSubject.next(
          `App cannot connect to API, please check your network.`
        );
      }
    );
  }
}
