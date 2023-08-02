import { Component, OnInit } from '@angular/core';
import { ImageProcessService } from '../Services/image-process.service';
import { MatDialog} from '@angular/material/dialog';
import {trigger,state,style,transition,animate} from '@angular/animations';

import { ImageSelectionDialogComponent } from '../image-selection-dialog/image-selection-dialog.component';
import { NotifyService } from '../Services/notify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
  
})
export class HomePageComponent implements OnInit {
  
  state:boolean = false;
  selectedFile:File | undefined;
  selectedFileName:string ='';
  imageDataList:any[]=[];
  progressBar:boolean = true;
  checkSelect:boolean = false;
  public text:string = 'Images will be displayed here once Image has been Uploaded';
  public letters:string[]=[];
  constructor(private imgService:ImageProcessService,private dialog :MatDialog,private notify:NotifyService) { }

  ngOnInit(): void {
    this.getImageList();
    this.letters = this.text.split(' ');
    // setTimeout(()=>{
    //   this.state = true;
    // },1000);
  }

  

  getImageList(){
   this.imgService.getAllImageFiles().subscribe((res)=>{ this.imageDataList = res},
   (err)=>{this.notify.showNotifications('error',err.error.error);
   this.progressBar = false;
   this.imageDataList = [];
   },
   ()=>{
    
    this.progressBar=false;});
  
  //  this.imgService.getImage(this.imageName).subscribe((res:Blob)=>{
  //    const reader = new FileReader();
  //    reader.onloadend = ()=>{this.imageSrc = reader.result as string;}
  //    reader.readAsDataURL(res);
  //  });

  }

  openDialog(){
   const dialogRef =  this.dialog.open(ImageSelectionDialogComponent,{width:'430px',height:'490px',disableClose:true,restoreFocus:false,autoFocus:false});
    dialogRef.afterClosed().subscribe(()=>{
        this.progressBar = true;
        this.getImageList();
    });
  }


  deleteImage(fileName:string){
    this.progressBar = true;
    this.imgService.deleteImageFile(fileName).subscribe((res:any)=>{
      this.notify.showNotifications('success',res.message);
    },
    (err)=>{this.notify.showNotifications('error',err.error.error)},
    ()=>{ this.progressBar = true;
      this.getImageList();
      if(this.imageDataList.length===0){
        this.imageDataList = [];
      }
    });
  }

  selectionChange(checked:boolean){
    this.checkSelect = checked;
    if(this.checkSelect){
      setTimeout(()=>{
        if(window.confirm("Are you sure about to Delete all images and it's metaData")){
          this.imgService.deleteAllimageFiles().subscribe((res:any)=>{this.notify.showNotifications('success',res.message);},
          (err)=>{this.notify.showNotifications('error',err.error.error)},
          ()=>{ this.imageDataList=[];
                this.getImageList();
                this.checkSelect=false;});
        }
        else{
          this.checkSelect = false;
        }
      },400);
    }
  }



}
