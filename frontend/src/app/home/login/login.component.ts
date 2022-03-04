import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerLogin: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  vertitalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerLogin = {};
  }

  loginUser(){
    if(!this.registerLogin.email || !this.registerLogin.password){
      this.message='Incomplete Data';
      this.openSnackBarError();
    }else{
      this._userService.loginUser(this.registerLogin)
      .subscribe({
        next:(v)=>{
          localStorage.setItem("token",v.token);
          this._router.navigate(['/books']);
          this.message ='Success Login';
          this.openSnackBarSuccessfull();
        },
        error:(e)=>{
          this.message=e.error.message;
          this.openSnackBarError();
        },
      })
    }
  }

  openSnackBarSuccessfull() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.vertitalPosition,
      duration: this.durationInSeconds,
      panelClass:['styleSnackBarSuccesfull']
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.vertitalPosition,
      duration: this.durationInSeconds,
      panelClass:['styleSnackBarError']
    });
  }

  ngOnInit(): void {
  }

}
