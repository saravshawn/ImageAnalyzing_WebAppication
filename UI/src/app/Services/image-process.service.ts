import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {
  serverUrl:string ='http://localhost:3000/api';
  

  constructor(private http:HttpClient) { }

  private setHeaders():HttpHeaders{
    const headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return headers;
  }

  UploadImageFile(imageFile:File){
    const headers = this.setHeaders();
    const formData = new FormData();
    formData.append('image',imageFile);
   return this.http.post(`${this.serverUrl}/uploadImage`,formData,{headers});
  }

  getAllImageFiles():Observable<any[]>{
    const headers = this.setHeaders();
    return this.http.get<any[]>(`${this.serverUrl}/getAllimages`,{headers});
  }


  deleteImageFile(filename:string):Observable<string>{
    const headers = this.setHeaders();
    return this.http.delete<string>(`${this.serverUrl}/deleteImage/${filename}`,{headers});
  }

  deleteAllimageFiles():Observable<string>{
    const headers = this.setHeaders();
    return this.http.delete<string>(`${this.serverUrl}/deleteAllimages`,{headers});
  }

}
