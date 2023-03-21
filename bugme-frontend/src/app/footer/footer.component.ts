import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
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
}
