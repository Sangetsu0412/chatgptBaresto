// src/app/components/register/register.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Define the user object
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('User Registered:', this.user);
    const payload = { 
      username: this.user.username, 
      email: this.user.email, 
      password: this.user.password 
    };
    this.http.post('http://localhost:3000/register', payload)
      .subscribe(response => {
        console.log('User registered', response);
      }, error => {
        console.error('Registration error', error);
      });
  }
}
