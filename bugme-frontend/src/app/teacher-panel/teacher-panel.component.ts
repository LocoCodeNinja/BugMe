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
  getBugColor(severity: string): string {
    switch (severity) {
      case 'Low':
        return '#e6ffe6'; // light green
      case 'Medium':
        return '#fff2cc'; // light yellow
      case 'High':
        return '#ffe6e6'; // light red
      case 'Critical':
        return '#ffcccc'; // light pink
      default:
        return 'transparent';
    }
  }

  async getUsers(): Promise<string> {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all');
      let responseArray: Array<any> = response.data;
      let sqlQuery: string = '';

      for (let i: number = 0; i < responseArray.length; i++) {
        const user = responseArray[i];

        // Check if the user ID is not 1 before creating the insert query
        this.users.push(user);
        if (user.role !== 'Teacher') {
          sqlQuery += `\nINSERT INTO account (username, password, role) VALUES ('${user.username}', '${user.password}', '${user.role}');\n`;
        }
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

    IF EXISTS (SELECT name FROM sys.databases WHERE name = 'Team13_BugMe')
    BEGIN
        ALTER DATABASE [Team13_BugMe] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
        DROP DATABASE [Team13_BugMe];
    END

    CREATE DATABASE Team13_BugMe;
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
    ('Succulent', 'assets/StockPhotos/Succulent.jpg', 14.99, 'A quirky plant that''s all the rage with millennials. With plump leaves and spiky personalities, succulents add a fun touch of greenery to any space.', 'Water every 2-3 weeks when the soil is completely dry. Keep in bright, indirect light and avoid direct sunlight. Prefer warmer temperatures.', 'Tiny'),
    ('Sunflower', 'assets/StockPhotos/Sunflower.jpg', 19.99, 'A symbol of optimism and sunshine. They turn their heads to follow the sun throughout the day, making them the ultimate plant-based sun worshippers.', 'Require at least 6-8 hours of direct sunlight per day. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Aloe Vera', 'assets/StockPhotos/AloeVera.jpg', 14.99, 'A plant that doubles as a skincare secret weapon. With its cooling, soothing gel that can help heal sunburns and other skin irritations, this spiky succulent is a must-have for any green-thumbed beauty enthusiast.', 'Thrive in bright, indirect sunlight. Allow the soil to dry out completely between waterings. Sensitive to cold temperatures.', 'Small'),
    ('Hosta', 'assets/StockPhotos/Hosta.jpg', 24.99, 'As graceful as it is tough. With elegant leaves in shades of green, blue, and even yellow, hostas can thrive in shady spots. A favorite snack of deer.', 'Prefer shaded areas and soil that is consistently moist but well-drained. Water deeply once a week. Remove dead leaves and flowers regularly.', 'Large'),
    ('Rose', 'assets/StockPhotos/Rose.jpg', 11.99, 'The queen of the flower world. With delicate petals and heavenly scent, roses have been revered for centuries as a symbol of love and beauty. Whether you prefer classic red roses or more unexpected hues like peach or lavender, these blooms are always in style.', 'Need at least 6 hours of direct sunlight per day. Water deeply once a week and make sure the soil drains well. Prune regularly to promote healthy growth and remove any dead or damaged branches.', 'Small'),
    ('Hydrangea', 'assets/StockPhotos/Hydrangea.jpg', 11.99, 'As showy as it is hardy. With fluffy clusters of flowers in shades of pink, blue, and white, hydrangeas are the ultimate garden statement piece. And if you''re lucky enough to live in an area with acidic soil, you can even play around with the color of their blooms.', 'Prefer partial shade and moist, well-drained soil. Water deeply once a week and avoid letting the soil dry out completely. Prune after blooming to encourage new growth.', 'Small'),
    ('Tulip', 'assets/StockPhotos/Tulip.jpg', 9.99, 'Few flowers can match the elegance of a tulip. With their long, slender stems and softly rounded petals, tulips add a touch of grace to any bouquet or garden bed. And with their wide range of colors and varieties, there''s a tulip for every taste and occasion.', 'Plant tulips in the fall, at least 6-8 weeks before the ground freezes. Choose a spot with well-draining soil and full sun. Water the bulbs thoroughly after planting, and keep the soil moist but not waterlogged. After the tulips have finished blooming, allow the leaves to yellow and wither before removing them.', 'Medium'),
    ('Windflower', 'assets/StockPhotos/Windflower.jpg', 14.99, 'With their delicate, feathery blooms and whimsical, wind-blown appearance, windflowers add a touch of magic to any garden or bouquet. Also known as anemones, these flowers come in a wide range of colors and varieties, from classic white to bold pink and purple.', 'Plant windflowers in the fall or spring, in a spot with partial to full sun and well-draining soil. Water them deeply once a week and make sure the soil doesn''t dry out completely. After the flowers have finished blooming, remove the dead blooms to encourage new growth.', 'Tiny'),
    ('Geranium', 'assets/StockPhotos/Geranium.jpg', 14.99, 'If you''re looking for a plant that''s as tough as it is pretty, the geranium is your go-to. With their bright, colorful blooms and hardy nature, geraniums are a favorite of gardeners worldwide. Plus, they''re relatively easy to care for, making them a great option for beginners.', 'Geraniums prefer full sun to partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Small'),
    ('Lavender', 'assets/StockPhotos/Lavender.jpg', 19.99, 'Looking for a plant that can help you relax and unwind after a long day? Look no further than the lavender plant. With its soothing fragrance and delicate purple blooms, lavender is a favorite of aromatherapy enthusiasts and gardeners alike. Plus, it''s relatively low-maintenance, making it a great option for busy folks.', 'Lavender prefers full sun and well-drained soil. Water it deeply once a week and avoid letting the soil dry out completely. Prune the plant regularly to encourage bushy growth.', 'Medium'),
    ('Orchid', 'assets/StockPhotos/Orchid.jpg', 29.99, 'If you''re looking for a plant that''s as exotic as it is beautiful, the orchid is your pick. With its intricate blooms and delicate, arching stems, the orchid is a favorite of plant collectors and interior designers alike. And while orchids can be a bit finicky, with the right care they can thrive for years to come.', 'Orchids prefer bright, indirect sunlight and well-drained soil. Water them once a week and avoid letting the soil dry out completely. Mist the plant regularly to increase humidity around it.', 'Medium'),
    ('Parrot Flower', 'assets/StockPhotos/ParrotFlower.jpg', 9.99, 'Looking for a plant that''s as showy as it is unique? Say hello to the parrot flower. With its vibrant, tropical blooms and long, trailing stems, this plant is a favorite of gardeners who love to make a statement. And while it may look fussy, the parrot flower is actually relatively easy to care for.', 'Parrot flowers prefer partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Fertilize the plant regularly to encourage blooming.', 'Medium'),
    ('Strawflower', 'assets/StockPhotos/Strawflower.jpg', 7.99, 'If you''re looking for a plant that''s as hardy as it is pretty, the strawflower is a great choice. With its daisy-like blooms and long, sturdy stems, the strawflower is a favorite of gardeners who love to create their own bouquets. Plus, it''s relatively low-maintenance, making it a great option for busy folks.', 'Strawflowers prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Tiny'),
    ('Caradonna', 'assets/StockPhotos/Caradonna.jpg', 17.99, 'Caradonna is a perennial plant that blooms in the summer with striking dark purple flowers on tall spikes. The plant itself has dark green leaves that provide a nice contrast to the purple flowers. This plant is great for attracting pollinators like bees and butterflies to your garden.', 'Caradonna prefers full sun but can tolerate some shade. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Cosmos', 'assets/StockPhotos/Cosmos.jpg', 14.99, 'Cosmos are annual plants that produce beautiful daisy-like flowers in shades of pink, white, and red. They are easy to grow and require little maintenance, making them a great choice for beginner gardeners.', 'Cosmos prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Dahlia', 'assets/StockPhotos/Dahlia.jpg', 19.99, 'Dahlias are a favorite among gardeners for their large, showy blooms in a wide range of colors and shapes. They are perennials that bloom from mid-summer to fall and can add a touch of drama to any garden.', 'Dahlias prefer full sun and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Daisy', 'assets/StockPhotos/Daisy.jpg', 9.99, 'Daisies are perennial plants that produce charming white or yellow flowers with a yellow center. They are easy to grow and can brighten up any garden with their cheerful blooms.', 'Daisies prefer full sun but can tolerate some shade. Keep the soil moist but not waterlogged. Deadhead spent blooms regularly to encourage new growth.', 'Tiny'),
    ('Moonfire', 'assets/StockPhotos/Moonfire.jpg', 24.99, 'Moonfire is a stunning perennial plant that produces fiery orange-red blooms on tall, sturdy stems. This plant is a favorite of gardeners who love to create bold, eye-catching displays in their garden or cut flower arrangements.', 'Moonfire prefers full sun to partial shade and well-drained soil. Water deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Large'),
    ('Day Lily', 'assets/StockPhotos/Daylily.jpg', 14.99, 'Daylilies are perennial plants that bloom in a wide range of colors, from yellow and orange to pink and red. They are easy to grow and can add a pop of color to any garden.', 'Daylilies prefer full sun to partial shade and well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Medium'),
    ('Forget Me Not', 'assets/StockPhotos/ForgetMeNot.jpg', 7.99, 'Forget-me-nots are charming little plants that produce small blue or pink flowers in the spring. They are great for adding a touch of whimsy to any garden.', 'Forget-me-nots prefer partial shade and moist, well-drained soil. Water them deeply once a week and avoid letting the soil dry out completely. Deadhead spent blooms regularly to encourage new growth.', 'Tiny');

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
    (44, 'Critical');

    \n\n`;
  }
}
