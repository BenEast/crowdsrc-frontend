import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';
import { ImageService } from 'app/services/image.service';
import { faUndoAlt, faRedoAlt, faUpload, faSave } from '@fortawesome/fontawesome-pro-regular';
import fontawesome from '@fortawesome/fontawesome';

fontawesome.library.add(faUndoAlt);
fontawesome.library.add(faRedoAlt);
fontawesome.library.add(faUpload);
fontawesome.library.add(faSave);

@Component({
  selector: 'app-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.css']
})
export class UploadProfileImageComponent implements OnInit {
  @Input() username: string;
  @Output() uploadedImage: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

  croppedImage = '';
  image = '';
  cropperOptions: any;

  constructor(private _imageService: ImageService) { }

  ngOnInit() {
    this.cropperOptions = {
      viewMode: 2,
      background: true,
      aspectRatio: 1,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
      modal: true,
      guides: false,
      center: false,
      autoCrop: true,
      responsive: true,
      checkCrossOrigin: true,
      toggleDragModeOnDblclick: false,
      dragMode: 'none',
      minCanvasWidth: 400,
      minCanvasrHeight: 400,
      minCropBoxWidth: 200,
      minCropBoxHeight: 200,
    }
  }

  onFileChange(event) {
    this.image = '';
    // Only continue with the image if it's less than 5MB
    if (event.target.size <= 5242880) { this.readFile(event.target.files[0]); }
    clearFileInput();
  }

  private readFile(file) {
    const reader: FileReader = new FileReader;
    const that = this;
    reader.onloadend = function (e) { that.image = reader.result; };
    reader.readAsDataURL(file);
  }

  private saveImage() {
    this.croppedImage = this.angularCropper.cropper.getCroppedCanvas({ width: 400, height: 400 }).toDataURL(1);

    if (this.croppedImage) {
      this._imageService.updateUserImage(this.username, this.croppedImage).subscribe(
        image => {
          this.uploadedImage.emit(image);
          this.image = '';
          this.croppedImage = '';
          clearFileInput();
        },
        error => console.log(error));
    }
  }
}

function clearFileInput() {
  const ctrl = <HTMLInputElement>document.getElementById('add-image');
  try { ctrl.value = null; } catch (ex) { }
  if (ctrl.value) { ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl); }
}
