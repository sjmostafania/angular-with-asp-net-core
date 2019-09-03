import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Users } from '../models/users';
import { TicketService } from '../shared/ticket_service/ticket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private service: UserService, private _ticketService: TicketService) { }

  userDetails;
  selection = new SelectionModel<Element>(true, []);
  columns = this._ticketService.getTableColummn();
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getTickets();
    this.service.getUserProfile().subscribe(res => {
      this.userDetails = res;
      console.log('UserDetails', this.dataSource);
    },
      err => {
        console.log(err);
      });
  }
  getTickets() {
    this._ticketService.loadAllTickets()
      .subscribe((data: any) => {
        debugger;
        this.dataSource = data
      });

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

 //         ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  //        ▌ Table Sorting Section ▌
  //         ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

  sortData(sort: Sort) {
    debugger;
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }
    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'title': return this.compare(a.title, b.title, isAsc);
        case 'assignedTo': return this.compare(a.assignedTo, b.assignedTo, isAsc);
        case 'description': return this.compare(a.description, b.description, isAsc);
        case 'percentageComplete': return this.compare(a.percentageComplete, b.percentageComplete, isAsc);
        default: return 0;
      }
    });
  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  //        ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  //------- ▌ Table Paging Section ▌------------------------------------------
  //        ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  length = 5;
  pageSize = 2;
  pageSizeOptions: number[] = [2, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  //--------[End Paging Section]------------------------------------------------

}
