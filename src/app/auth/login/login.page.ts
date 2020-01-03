import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from './login.service';
import { Login, User } from '../login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login = new Login();
  public user = new User();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    this.loginService.signIn(this.login).subscribe(async (res) => {
      this.router.navigateByUrl('menu/home');
    });
  }

  // login(form){
  //   this.authService.login().subscribe((res)=>{
  //     this.router.navigateByUrl('home');
  //   });
  // }

}
