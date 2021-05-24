import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  charactersFav$ = this.localStgServ.charactersFav$;
  constructor(private localStgServ: LocalStorageService) { }

  ngOnInit(): void {
  }

}
