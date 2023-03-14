import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.scss']
})
export class TeacherPanelComponent implements OnInit{
  errors: Array<any> = [];
  users: Array<any> = [];

  constructor(private router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users');

      let responseArray: Array<any> = response.data;

      let loginSuccess: boolean = false;

      for (let i: number = 0; i < responseArray.length; i++) {
        if (
          responseArray[i].role == "User"
        ) {
          this.users.push(responseArray[i]);
        }
      }
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
    }
  }
}
