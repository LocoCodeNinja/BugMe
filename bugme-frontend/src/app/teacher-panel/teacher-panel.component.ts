import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AppComponent } from '../app.component';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';

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
  sqlRoot: string = '';
  sqlUsers: string = '';
  sqlUserBugs: string = '';
  bugs = [
    { id: 11, severity: 'Low', title: 'Wrong Store Hours' },
    { id: 12, severity: 'Low', title: 'Description Loads Twice' },
    { id: 13, severity: 'Low', title: 'Employee Buttons Overlap' },
    { id: 14, severity: 'Low', title: 'Wrong Product Image' },
    { id: 21, severity: 'Medium', title: 'One Product Slow Load' },
    { id: 22, severity: 'Medium', title: 'No Hover Interaction' },
    { id: 23, severity: 'Medium', title: 'Search Malfunction' },
    { id: 24, severity: 'Medium', title: 'Category Tab Wont Open' },
    { id: 31, severity: 'High', title: 'Null Names' },
    { id: 32, severity: 'High', title: 'Cart Slow Load' },
    { id: 33, severity: 'High', title: 'Null Icons' },
    { id: 34, severity: 'High', title: 'Same Image All Products' },
    { id: 41, severity: 'Critical', title: 'Dead Links' },
    { id: 42, severity: 'Critical', title: 'Employee Panel Bad Gateway' },
    { id: 43, severity: 'Critical', title: 'Cart Infinite Load' },
    { id: 44, severity: 'Critical', title: 'Subscribe Unloads All Products' },
  ];

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private http: HttpClient
  ) {
    this.initializeToggleValues();
  }

  initializeToggleValues() {
    for (const bug of this.bugs) {
      this.toggleValues.push({
        severity: bug.severity,
        bugId: bug.id,
        enabled: false,
      });
    }
  }

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

  async getUsers(): Promise<string> {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');
      let responseArray: Array<any> = response.data;
      let sqlQuery: string = '';

      for (let i: number = 0; i < responseArray.length; i++) {
        const user = responseArray[i];
        this.users.push(user);
        sqlQuery += `\nINSERT INTO account (username, password, role) VALUES ('${user.username}', '${user.password}', '${user.role}');\n`;
      }

      this.sqlUsers = sqlQuery;

      return sqlQuery;
    } catch (error) {
      this.errors.push(error);
      console.log(this.errors);
      return '';
    }
  }

  async checkUserExists(username: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users?username=${username}`
      );
      const user = response.data;
      return user !== null;
    } catch (error) {
      console.log(error);
      return false;
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

  toggleBug(checked: boolean, bugId: number) {
    const toggleValue = this.toggleValues.find((tv) => tv.bugId === bugId);
    if (toggleValue) {
      toggleValue.enabled = checked;
    }
  }

  async generateScript(userId: number) {
    let sqlScript = '';

    // Split existing SQL script by newlines
    const sqlUserBugsArray = this.sqlUserBugs.split('\n');

    // Filter out existing lines for the given userId
    const existingLines = sqlUserBugsArray.filter(
      (line) => line.includes(`VALUES (`) && line.includes(`, ${userId - 1},`)
    );

    // If existing lines were found, remove them
    if (existingLines.length > 0) {
      const indicesToRemove = [];

      // Find the indices of the existing lines
      for (const existingLine of existingLines) {
        const existingIndex = sqlUserBugsArray.indexOf(existingLine);
        indicesToRemove.push(existingIndex);
      }

      // Remove the existing lines starting from the last index
      for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        sqlUserBugsArray.splice(indicesToRemove[i], 1);
      }
    }

    // Append any new insert values for the given userId
    for (const toggleValue of this.toggleValues) {
      const enabledValue = toggleValue.enabled ? 1 : 0;

      sqlScript += `\nINSERT INTO accountBug (bug_id, account_id, bug_enabled) VALUES (${
        toggleValue.bugId
      }, ${userId - 1}, ${enabledValue});\n`;
    }

    // Join the updated SQL script array back into a string
    this.sqlUserBugs = sqlUserBugsArray.join('\n') + sqlScript;
    console.log(this.sqlUserBugs);
  }

  downloadRootScript() {
    this.sqlRoot = this.getSqlFoundation();
    this.sqlRoot += this.sqlUsers;
    this.sqlRoot += this.sqlUserBugs;
    this.downloadSQLScript(this.sqlRoot, `student_script.sql`);
    window.location.reload();
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

  getSqlFoundation() {
    return `USE master;
    GO

    IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Team13_BugMe')
    BEGIN
    CREATE DATABASE Team13_BugMe;
    END
    GO

    USE Team13_BugMe;
    GO

    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[account]') AND type in (N'U'))
    BEGIN
    CREATE TABLE account (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) NOT NULL
    );
    END
    GO

    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[product]') AND type in (N'U'))
    BEGIN
    CREATE TABLE product (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    path NVARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description_plant NVARCHAR(MAX) NULL,
    description_care NVARCHAR(MAX) NULL,
    category NVARCHAR(20) NOT NULL
    );
    END
    GO

    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[bug]') AND type in (N'U'))
    BEGIN
    CREATE TABLE bug (
    id INT PRIMARY KEY,
    severity VARCHAR(10) NOT NULL,
    title VARCHAR(100)
    );
    END
    GO

    IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[accountBug]') AND type in (N'U'))
    BEGIN
    CREATE TABLE accountBug (
    id INT IDENTITY(1,1) PRIMARY KEY,
    bug_id INT NOT NULL,
    account_id INT NOT NULL,
    bug_enabled BIT,
    FOREIGN KEY (bug_id) REFERENCES bug(id),
    FOREIGN KEY (account_id) REFERENCES account(id)
    );
    END
    GO

    INSERT INTO product (name, path, price, description_plant, description_care, category)
    VALUES
    ('Succulent', 'assets/StockPhotos/Succulent.jpg', 14.99, 'Meet the succulent, the quirky plant that''s all the rage with millennials. With their plump leaves and spiky personalities, succulents add a fun touch of greenery to any space. Just be careful not to overwater them - they''re desert dwellers, after all.', 'Water your succulent every 2-3 weeks or when the soil is completely dry. Keep them in bright, indirect light and avoid exposing them to direct sunlight. Succulents prefer warmer temperatures but can survive in cooler conditions as well.', 'Tiny'),
    ('Sunflower', 'assets/StockPhotos/Sunflower.jpg', 19.99, 'This flower is more than just a pretty face. With their cheerful yellow petals and towering stalks, sunflowers are a symbol of optimism and sunshine. They turn their heads to follow the sun throughout the day, making them the ultimate plant-based sun worshippers.', 'Sunflowers require a lot of sunlight - at least 6-8 hours of direct sunlight per day. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Aloe Vera', 'assets/StockPhotos/AloeVera.jpg', 14.99, 'Looking for a plant that doubles as a skincare secret weapon? Look no further than the aloe vera. With its cooling, soothing gel that can help heal sunburns and other skin irritations, this spiky succulent is a must-have for any green-thumbed beauty enthusiast.', 'Aloe vera plants thrive in bright, indirect sunlight. Allow the soil to dry out completely between waterings, and be careful not to overwater as this can lead to root rot. Aloe vera plants are sensitive to cold temperatures, so keep them in a warm area.', 'Small'),
    ('Hosta', 'assets/StockPhotos/Hosta.jpg', 24.99, 'If you''re looking for a plant that''s as graceful as it is tough, the hosta is your gal. With its elegant leaves that come in shades of green, blue, and even yellow, hostas can thrive in shady spots where other plants might struggle. Plus, they''re a favorite snack of deer, so you know they''re delicious.', 'Hostas prefer shaded areas and soil that is consistently moist but well-drained. Water them deeply once a week and make sure the soil doesn''t dry out completely. Remove dead leaves and flowers regularly to keep the plant healthy.', 'Large'),
    ('Rose', 'assets/StockPhotos/Rose.jpg', 11.99, 'Ah, the rose - the queen of the flower world. With their delicate petals and heavenly scent, roses have been revered for centuries as a symbol of love and beauty. Whether you prefer classic red roses or more unexpected hues like peach or lavender, these blooms are always in style.', 'Roses need at least 6 hours of direct sunlight per day. Water them deeply once a week and make sure the soil drains well. Prune your rose bushes regularly to promote healthy growth and remove any dead or damaged branches.', 'Small'),
    ('Hydrangea', 'assets/StockPhotos/Hydrangea.jpg', 11.99, 'Looking for a plant that''s as showy as it is hardy? Meet the hydrangea. With their fluffy clusters of flowers in shades of pink, blue, and white, hydrangeas are the ultimate garden statement piece. And if you''re lucky enough to live in an area with acidic soil, you can even play around with the color of their blooms. Now that''s what we call plant magic.', 'Hydrangeas prefer partial shade and moist, well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Prune your hydrangeas after they have finished blooming to encourage new growth.', 'Small');

    INSERT INTO bug (id, severity) VALUES
    (11, 'Low'),
    (12, 'Low'),
    (13, 'Low'),
    (14, 'Low'),
    (21, 'Medium'),
    (22, 'Medium'),
    (23, 'Medium'),
    (24, 'Medium'),
    (31, 'High'),
    (32, 'High'),
    (33, 'High'),
    (34, 'High'),
    (41, 'Critical'),
    (42, 'Critical'),
    (43, 'Critical'),
    (44, 'Critical');\n\n`;
  }
}
