import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@app/shared/services/data.service';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl('');
  constructor(private dataServ: DataService) {
    this.search.valueChanges.pipe(
      map(search => search?.toLowerCase().trim()),
      debounceTime(300),
      distinctUntilChanged(),
      filter(search => search !== '' && search?.length > 2),
      tap(search => this.dataServ.filterData(search))
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
