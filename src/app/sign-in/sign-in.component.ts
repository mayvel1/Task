import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { MessageService } from 'primeng/api';
import { User } from '../core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  users: User[]=[];
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService, private service: MessageService,private router: Router) {
    this.userForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    this.getUserByEmail();
}
 getUserByEmail(){
  this.userService.getUser("1").snapshotChanges().subscribe({
    next:(data) => {
      let user = data.payload.val() as User;
      console.log(user.email);
    },
    });
}
  onSubmit(): void {
    this.service.clear();
    console.log(this.userForm);
    if (this.userForm.invalid) {
      console.log("invalid");
    }

    console.log(this.userForm.value.email);
    this.userService
    .getUserByEmail(this.userForm.value.email)
    .snapshotChanges()
    .subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          const firstSnapshot = data[0];
          const user = firstSnapshot.payload.val() as User;
          
          if (user && user.password === this.userForm.value.password) {
            localStorage.setItem('key',firstSnapshot.key);
            this.router.navigate(['/user-profile']);
          } else {
            this.service.add({
                severity: "error",
                detail: "Invalid email or password",
              });
          }
        } else {
          console.error('No user found with the specified email');
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }
}
