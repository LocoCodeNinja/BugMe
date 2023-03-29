import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  bug11Enabled: boolean;

  ngOnInit() {
    setTimeout(() => {
      this.checkBug11();
    }, 300);
  }

  showSuccess: boolean = false;
  showError: boolean = false;
  emailCtrl: FormControl = new FormControl(null, [Validators.required, Validators.email]);

  showSuccessMessage(){
    if(this.emailCtrl.valid){
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
    else{
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }

  checkBug11(){
    let bug: Array<any> = JSON.parse(localStorage.getItem('responseArray')!);


    if(bug[0] == null){
      this.bug11Enabled = false;
    }
    else{
      this.bug11Enabled = bug[0];
    }
  }
}
