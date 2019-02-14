import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "../../services/file-upload.service";
import {MockDataService} from "../../services/mock-data.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }
}
