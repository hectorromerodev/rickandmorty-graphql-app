import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinnerServ.isLoading$;

  constructor(private spinnerServ: SpinnerService) { }

  ngOnInit(): void {
  }

}
