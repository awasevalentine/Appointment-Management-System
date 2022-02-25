import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseNotification } from 'src/app/Models/Response/snackBar_response';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router: Router,
     private _authService: AuthService,
     private _response: ResponseNotification,
    ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
   }

  ngOnInit(): void {
  }

   // document.querySelector('.img__btn').addEventListener('click', function() {
  //   document.querySelector('.cont').classList.toggle('s--signup');
  // });
  login(){
    const userData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    //This line of code gets the status of the email and password field to know if it is untouched
    const emailUntouched = this.loginForm.get('email')?.untouched;
    const passwordUntouched = this.loginForm.get('password')?.untouched
    if(emailUntouched && passwordUntouched){
      this._response.Response('Please enter your Email and password!')
    } else{
    this._authService.logInUser(userData).subscribe(
      (data) =>{
        this._authService.saveGeneratedToken(data.data)
        this._response.Response(data.responseDescription);
        this.router.navigateByUrl('dashboard/home')
      },
      (err) => {
        console.log("Error -> ", err.error)
          this._response.Response(err.error.message)
      }
    );
    }
    this.loginForm.reset();

  }

  // Method for getting the input error messages
  errorMessage(formControl:string): any{
    const email = this.loginForm.get(`${formControl}`)
    const password = this.loginForm.get(`${formControl}`)

    if(email?.hasError("required") && email.touched){
      if(`${formControl}` === "email"){
        return `Email is required!`
      }
    }
    if(email?.hasError("email") && email.touched){
      if(`${formControl}` === "email"){
        return `Email must be a valid email`
      }
    }
    if(password?.hasError("required") && password.touched){
      if(`${formControl}` === "password"){
        return `Password is required!`
      }
    }
    if(password?.hasError("minlength") && password.touched){
      if(`${formControl}` === "password"){
        return `Password must not be less than 8 character`
      }
    }
  }

  register(){
    this.router.navigateByUrl("/register")
  }

}
