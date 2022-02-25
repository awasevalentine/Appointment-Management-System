import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { account_type } from 'src/app/Models/Data/user_account_type';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AuthService } from 'src/app/Services/Auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  hide!: boolean;
  cHide!: boolean;
  confirmPasswordCheck: boolean = false;
  progressBar: boolean = false;
  

  acct_types = account_type;
  constructor(private authService: AuthService, 
    private response: ResponseNotification, private _router: Router
    ) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        cPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }),
      account_type: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.confirmPasswordValidation();
    
  }


  Register(){
    const userData ={
      fullName: this.registerForm.get('fullName')?.value,
      email: this.registerForm.get('email')?.value,
      account_type: this.registerForm.get('account_type')?.value,
      password: this.registerForm.get('passwords')?.get('password')?.value
    }
    this.progressBar = true;
    this.authService.createUser(userData).subscribe(
      (data) => {
        this.progressBar = false;
        this.response.Response(data.data);
      this.authService.userLogin();
      },
      (err) => {
        this.progressBar = false;
        this.response.Response(err.error.data);
      }
    )

  }

  //Register using Gmail
  resiterUsingGmail(){
    return this.authService.createUserWithGmail().subscribe(
      (data) => {
        return data
        console.log("Returnedn data: ", data);
      },
      (error) => {
        console.log("Error message: ", error);
      }
    )
  }

  //Method for validating input fields for valid entries
  formValidationMessage(formControl: any): any{
      if(this.registerForm.get(formControl)?.hasError('required') && this.registerForm.get(formControl)?.touched){
        if(formControl ==="fullName"){
          return `Name is required!`
        }
        if(formControl ==="email"){
          return `Email is required!`
        }
        if(formControl ==="account_type"){
          return `Account type is required!`
        }
      }
      if(this.registerForm.get(formControl)?.hasError('email') && this.registerForm.get(formControl)?.touched){
        return `Email is not valid!`
      }
  }

  //Method for validating password input fields for valid entries
  passwordValidationMessage(formControl: any): any {
    if(this.registerForm.get(formControl)?.hasError('required') && this.registerForm.get(formControl)?.touched){
      if(formControl ==="passwords.password"){
      return `Password is required!`
      }
    }
    if(this.registerForm.get(formControl)?.hasError('required') && this.registerForm.get(formControl)?.touched){
      if(formControl ==="passwords.cPassword"){
      return `Confirm Password is required!`
      }
    }
    if(this.registerForm.get(formControl)?.hasError('minlength') && this.registerForm.get(formControl)?.touched){
      if(formControl ==="passwords.password"){
        return `Password must not be less than 8 characters`
      }
    }
    if(this.registerForm.get(formControl)?.hasError('minlength') && this.registerForm.get(formControl)?.touched){
      if(formControl ==="passwords.cPassword"){
        return `Confirm password must not be less than 8 characters`
      }
    }
  }

  //This method checks that the input value of the password and confirm password are the same
  confirmPasswordValidation(): any{
    let enteredPassword: any // used to hold the input value of the entered password
    let enteredConfirmPassword: any; // used to hold the input value of the entered confirm password
    const password = this.registerForm.get('passwords')?.get('password');
    const cPassword = this.registerForm.get('passwords')?.get('cPassword');
    password?.valueChanges.pipe(
      debounceTime(500)).subscribe(
        (data: any) =>{
          enteredPassword = data;
          if(!cPassword?.untouched){
            if(enteredPassword !== enteredConfirmPassword){
              this.confirmPasswordCheck = true;
          }
          if(enteredPassword === enteredConfirmPassword){
            this.confirmPasswordCheck = false;
        }
          }
        }
      );
    cPassword?.valueChanges.pipe(
      debounceTime(500)).subscribe(
        (data):any =>{
          enteredConfirmPassword = data
        if(data !== enteredPassword){
          this.confirmPasswordCheck = true;
        }
        if(data === enteredPassword){
          this.confirmPasswordCheck = false;
        }
      }
      )
  }

}

