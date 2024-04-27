import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { User } from '../core/models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  binaryImage:string="";
  user!: User;
  uploadedImage:any='Drag image here or upload' ;
  key:string;
  constructor(private userService:UsersService,private service:MessageService){
    this.key = localStorage.getItem("key") as string;
    this.userService.getUser(this.key).snapshotChanges().subscribe({
      next:(data) => {
        this.user = data.payload.val() as User;
        console.log(this.user.image);
        console.log(this.user.image);
        console.log(this.user.image);
        this.binaryImage=this.user.image==null?"":this.user.image;
      },
      });
  }
  editUser() {
    console.log(this.user);
    this.userService.updateUser(this.key,this.user);
    this.service.clear();
    this.service.add({
      severity: "success",
      detail: "user updated successfully",
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = ()=>{
      this.binaryImage = reader.result as string;
      this.user.image=this.binaryImage;
    }
    if (file) {
      reader.readAsDataURL(file);
      this.uploadedImage = 'Successfully uploaded image'
    }else{
      this.uploadedImage = 'Failed to uploaded image'
    }
  }
}