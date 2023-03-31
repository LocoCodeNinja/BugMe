import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe-panel',
  templateUrl: './subscribe-panel.component.html',
  styleUrls: ['./subscribe-panel.component.scss'],
})
export class SubscribePanelComponent {
  showSuccess: boolean = false;
  showError: boolean = false;
  emailCtrl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  showSuccessMessage() {
    if (this.emailCtrl.valid) {
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }
  }
}
