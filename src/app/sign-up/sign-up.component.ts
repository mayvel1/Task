import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../core/models/user';
import { UsersService } from '../core/services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  users: User[]=[];
  userForm:FormGroup;
  constructor(private fb: FormBuilder, private userService:UsersService,private service:MessageService){
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9 ]+$")]],
      password: [null,[Validators.required, Validators.minLength(8), Validators.maxLength(20),Validators.pattern("^[a-zA-Z0-9 ]+$")]],
      // image: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    });
  }
  ngOnInit(): void {
    this.getAllUsers();
}
getAllUsers(){
  this.userService.getUser("1").snapshotChanges().subscribe({
    next:(data) => {
      let user = data.payload.val() as User;
      console.log(user.email);
    },
    });
}

onSubmit(): void {
  console.log(this.userForm);
  if (this.userForm.invalid) {
    // Add an index signature to validationMessages
    const validationMessages: { [key: string]: string } = {
      required: 'This field is required.',
      minlength: 'Please enter at least {0} characters.',
      maxlength: 'Please enter no more than {0} characters.',
      pattern: 'Invalid input. Please use valid characters.',
    };
  
    for (const controlName in this.userForm.controls) {
      if (this.userForm.controls.hasOwnProperty(controlName)) {
        const control = this.userForm.controls[controlName];
        if (control.invalid) {
          let enteredLoopFlag = false;
          for (const errorKey in control.errors) {
            if (control.errors.hasOwnProperty(errorKey)) {
              const errorValue = control.errors[errorKey]['requiredLength'];
              const errorMessage = validationMessages[errorKey];
              if (errorMessage) {
                enteredLoopFlag = true
                this.service.clear();
                let errorMsg = `${errorMessage.replace('{0}', errorValue)} { ${controlName} }`;
                this.service.add({
                  severity: "error",
                  detail: errorMsg,
                });
              }
            }
          }
          if (enteredLoopFlag === false) {
            this.service.clear();
            this.service.add({
              severity: "error",
              detail: "Please fill all fields",
            });
          }
        }
      }
    }
  }else {
    this.service.clear();
    console.log('entered');
    this.userService.addUsers(this.userForm.value);
    this.service.add({
      severity: 'success',
      detail: 'User added successfully',
    });
  }
}
}
