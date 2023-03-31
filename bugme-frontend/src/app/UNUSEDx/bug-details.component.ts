import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],
})
export class BugDetailsComponent {
  bugs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBugs();
  }

  getBugs() {
    this.http.get<any[]>('http://localhost:8080/api/bugs/all').subscribe(
      (response) => {
        this.bugs = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
