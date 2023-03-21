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
  currentUser: any = {};
  isGood: boolean = false;

  constructor(private router: Router, private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.checkUser();
    if(this.isGood){
      this.getUsers();
    }
  }
  
  checkUser(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    if(this.currentUser != null){
      if(this.currentUser.role != "Teacher"){
        this.appComponent.navigate("/landing");
      }
      else{
        this.isGood = true;
      }
    }
    else{
      this.appComponent.navigate("");
    }
  }
  

  async getUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');

      let responseArray: Array<any> = response.data;

      let loginSuccess: boolean = false;

      for (let i: number = 0; i < responseArray.length; i++) {
        if (
          responseArray[i].role == "User" || responseArray[i].role == "Employee"
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
