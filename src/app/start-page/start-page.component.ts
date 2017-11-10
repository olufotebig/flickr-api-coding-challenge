import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
  providers: [SearchService]
})
export class StartPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
