import {Component, OnInit} from '@angular/core';
import {MockDataService} from "./services/mock-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-file-upload-with-progress-bar';
  private data = [];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit(): void {
    this.data = [];
    this.mockDataService.getJsonData()
      .then( result => {
        console.log('ALL Data: ', result);
        this.data = result;
      })
      .catch( error => {
        console.log('Error Getting Data: ', error);
      });
  }
}
