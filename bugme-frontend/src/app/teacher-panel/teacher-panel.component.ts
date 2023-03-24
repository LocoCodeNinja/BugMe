import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AppComponent } from '../app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.scss'],
})
export class TeacherPanelComponent implements OnInit {
  errors: Array<any> = [];
  users: Array<any> = [];
  currentUser: any = {};
  isGood: boolean = false;
  newUsername: string = '';
  newPassword: string = '';
  constructor(private router: Router, private appComponent: AppComponent) {}

  //testing bugs
  severities = ['Severity 1', 'Severity 2', 'Severity 3', 'Severity 4'];
  elements = ['Bug 1', 'Bug 2', 'Bug 3', 'Bug 4', 'Bug 5'];

  ngOnInit(): void {
    this.checkUser();
    if (this.isGood) {
      this.getUsers();
    }
  }

  checkUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    if (this.currentUser != null) {
      if (this.currentUser.role != 'Teacher') {
        this.appComponent.navigate('/landing');
      } else {
        this.isGood = true;
      }
    } else {
      this.appComponent.navigate('');
    }
  }

  async getUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');

      let responseArray: Array<any> = response.data;

      let loginSuccess: boolean = false;

      for (let i: number = 0; i < responseArray.length; i++) {
        if (
          responseArray[i].role == 'User' ||
          responseArray[i].role == 'Employee' ||
          responseArray[i].role == 'Teacher'
        ) {
          this.users.push(responseArray[i]);
        }
      }
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
    }
  }
  isTeacher(userRole: string): boolean {
    return userRole === 'Teacher';
  }

  // async changeCredentials() {
  //   try {
  //     // Check if both fields have values before proceeding
  //     if (this.newUsername && this.newPassword) {
  //       // Replace '{{user.id}}' with the correct user ID from 'this.currentUser'
  //       const response = await axios.put(
  //         `http://localhost:8080/api/users/${this.currentUser.id}`,
  //         {
  //           username: this.newUsername,
  //           password: this.newPassword,
  //         }
  //       );

  //       if (response.status === 200) {
  //         // Update the local storage with the new user information
  //         this.currentUser.username = this.newUsername;
  //         localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

  //         // Clear the input fields after successfully updating the user's credentials
  //         this.newUsername = '';
  //         this.newPassword = '';

  //         // Show a success message or any other action you'd like to perform
  //       } else {
  //         // Handle the error when the API call fails (e.g., show an error message)
  //       }
  //     } else {
  //       // Handle the case when one or both fields are empty (e.g., show an error message)
  //     }
  //   } catch (error) {
  //     this.errors.push(error);
  //     console.log(this.errors);
  //   }
  // }
}
