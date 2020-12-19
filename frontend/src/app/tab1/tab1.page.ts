import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  imageChangedEvent: any = '';
  originalImgName:string;
  buffCroppedImageBase64:string;
  croppedImageBase64: any = '';
  croppedFileObject:any;
  show:any=false;

  constructor(
    public loadingController: LoadingController,
  ) {}

  fileChangeEvent(event: any): void {
    console.log(event,'abcde');
    this.show = true;
    this.read(event).subscribe(()=>{
      console.log('done');
      this.show = false;
    });
  }

  read(event: any):Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        this.imageChangedEvent = event;
        this.originalImgName = event.target.files[0].name;
        observer.next('e');
      }, 500);
    })
  }


  imageCropped(event: ImageCroppedEvent) {
      this.buffCroppedImageBase64 = event.base64;
  }
  imageLoaded(image: HTMLImageElement) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  onButtonClicked(){
    this.croppedImageBase64 = this.buffCroppedImageBase64;
    console.log(this.croppedImageBase64,'this.croppedImageBase64');

    var bin = atob(this.buffCroppedImageBase64.replace(/^.*,/, ''));
    // バイナリデータ化
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    this.croppedFileObject = new File([buffer.buffer], "heihei.jpg",{type: "image/jpeg"});
    console.log(this.croppedFileObject,'this.croppedFileObject');
  }


}
