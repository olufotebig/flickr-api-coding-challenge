import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const FLICKR_API_KEY = '19405ffdf5ac89d797429f64455e3b1a';
const FLICKR_API_BASE_URL = 'https://api.flickr.com/services/rest';

@Injectable()
export class GalleryService {
  photosSubject: Subject<object>;

  constructor(private http: HttpClient) {
    this.photosSubject = new Subject();
  }

  getPage(tag: string, page: string) {
    let params = new HttpParams();
    params = params.append('api_key', FLICKR_API_KEY);
    params = params.append('method', 'flickr.photos.search');
    params = params.append('sort', 'interestingness-desc');
    params = params.append('per_page', '500');
    params = params.append('format', 'json');
    params = params.append('nojsoncallback', '1');
    params = params.append('tags', tag);

    this.http.get(FLICKR_API_BASE_URL, { params }).subscribe(
      data => {
        if (data['stat'] === 'fail') {
        } else if (data['stat'] === 'ok') {
          this.photosSubject.next(data['photos']);
        } else {
          console.log('data format error');
        }
      },
      (err: HttpErrorResponse) => {
        // TODO: get error message for debugging
        console.log('error');
      }
    );
  }
}
