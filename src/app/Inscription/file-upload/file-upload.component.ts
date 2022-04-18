import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadServiceService } from 'src/app/service/file-upload-service.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile!: File;
    retrievedImage: any;
  
    base64Data: any;
    retrieveResonse: any;
    message!: string;
    imageName: any;
    constructor(private httpClient: HttpClient) { }
    //Gets called when the user selects an image
/* public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
     
    //Gets called when the user clicks on submit to upload the image
       onUpload() {

         console.log(this.selectedFile);
  } 
  */
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
//const uploadImageData = new FormData();

 /* uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

//Make a call to the Spring Boot Application to save the image

this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })

  .subscribe((response) => {

    if (response.status === 200) {

      this.message = 'Image uploaded successfully';

    } else {

      this.message = 'Image not uploaded successfully';
 }

  }

  );

}*/
  //Gets called when the user clicks on retieve image button to get the image from back end
  
  getImage() {

  //Make a call to Sprinf Boot to get the Image Bytes.

  this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)

    .subscribe(

      res => {

        this.retrieveResonse = res;

        this.base64Data = this.retrieveResonse.picByte;

        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

      }

    );

}

















  /* selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  constructor(private uploadService:FileUploadServiceService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }
  }*/


}
