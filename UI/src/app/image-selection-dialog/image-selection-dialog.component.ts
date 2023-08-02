import { Component, OnInit } from '@angular/core';
import { ImageProcessService } from '../Services/image-process.service';
import { NotifyService } from '../Services/notify.service';

@Component({
  selector: 'app-image-selection-dialog',
  templateUrl: './image-selection-dialog.component.html',
  styleUrls: ['./image-selection-dialog.component.scss']
})
export class ImageSelectionDialogComponent implements OnInit {

  selectedFile:File | undefined;
  selectedFileName:string ='';
  selectedImage:any;

  constructor(private imgService:ImageProcessService,private notify:NotifyService) {
    
   }

  ngOnInit(): void {
  }

  onFileSelection(event:any){
    this.selectedFile = event.target.files[0] as File;
    this.selectedFileName = this.selectedFile?.name || "";
    if(this.selectedFile){
      const reader = new FileReader();
      reader.onload = (val:any)=>{ this.selectedImage = val.target.result;}
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadFile(){
    if(this.selectedFile){
      this.imgService.UploadImageFile(this.selectedFile).subscribe((res:any)=>{
      if(res.message.startsWith('Image')){
          this.notify.showNotifications('success',res.message);
      }
      else{
        this.notify.showNotifications('info',res.message);
      }  
      },
      (err)=>{
        this.notify.showNotifications('error',err.error.error);
      }
      );
      
    }

  }

}
