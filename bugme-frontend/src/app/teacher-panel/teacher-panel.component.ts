import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AppComponent } from '../app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface ToggleValue {
  severity: string;
  bugId: number;
  enabled: boolean;
}

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
  constructor(private router: Router, private appComponent: AppComponent) {
    this.initializeToggleValues();
  }

  initializeToggleValues() {
    for (const severity of this.severity) {
      for (const bugId of this.bugId) {
        this.toggleValues.push({
          severity,
          bugId,
          enabled: false,
        });
      }
    }
  }

  generateScript(userId: number) {
    let sqlScript = '';

    for (const toggleValue of this.toggleValues) {
      const enabledValue = toggleValue.enabled ? 1 : 0;
      sqlScript += `UPDATE accountBugs SET bug_enabled = ${enabledValue} WHERE account_id = ${userId} AND bug_id = (SELECT id FROM bugs WHERE severity = '${toggleValue.severity}' AND id = '${toggleValue.bugId}');\n`;
    }

    this.downloadSQLScript(sqlScript, `update_accountBugs_user${userId}.sql`);
  }

  downloadSQLScript(script: string, fileName: string) {
    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  //testing bugs
  severity = ['Critical', 'High', 'Medium', 'Low'];
  bugId = [1, 2, 3, 4, 5];
  toggleValues: ToggleValue[] = [];
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

  createNewUser() {
    this.router.navigate(['/register']);
  }

  async deleteUser(userId: number) {
    const confirmation = window.confirm(
      'Are you sure you want to delete this user?'
    );

    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/users/${userId}`
        );
        console.log('User deleted:', response.data);
        // Remove the deleted user from the users array
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
}
