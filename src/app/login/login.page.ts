import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../home/home.page';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: string;
  private myClientId = '48119150430-87dj9t81g9h1erfkibhtr7vva07kov0j.apps.googleusercontent.com';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController,
    public googlePlus: GooglePlus
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    const data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    const credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials)
      .then(
        () => this.router.navigate(['/home']),
        error => this.loginError = error.message
      );
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().catch(
      error => console.log(error.message)
    );
  }
}
