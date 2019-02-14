import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from "@angular/common/http";
import {catchError, last, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';

    let req = new HttpRequest('POST', endpoint, fileToUpload, {
      reportProgress: true
    });

    return this.httpClient.request(req).pipe(
      map(event => this.getEventMessage(event, fileToUpload)),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(fileToUpload))
    );
  }

  private getEventMessage(event: HttpEvent<any>, file: File): any {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private showProgress(message: string) {
    console.log("inside show progress - " + message);
  }

  private handleError(fileToUpload: File): any {
    console.log("inside handleError - " + fileToUpload.name);
  }
}
