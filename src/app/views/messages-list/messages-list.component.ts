import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageTransaction } from 'src/app/models/messages-transaction';
import { Pagination } from 'src/app/models/pagination';
import { TableDataParams } from 'src/app/models/tableDataParams';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pagination: Pagination | undefined;
  pageNumber: number = 1;

  length: number = 50;
  pageSize: number = 10;
  pageIndex: number = 0;

  messageTrans: MessageTransaction[] = [];
  displayedColumns: string[] = [
    'no',
    // 'id',
    // 'userId',
    'messageDateTime',
    'messageText',
    // 'responseType',
    // 'isResponseMessageTranslate',
    // 'responseTimestamp',
    'replyMessage',
    
    // 'promptTokens',
    // 'completionTokens',
    // 'totalTokens',
    // 'questionLevel',
    // 'questionNo',
    // 'questionRef',
    // 'success',
    // 'errorMessage',
    // 'updatedAt',
    'actions',
  ];

  filterColumns: string[] = [
    'messageText',
    // 'responseType',
    // 'replyMessage',
  ];

  selectedColumns: string[] = [
    'messageText',
    // 'responseType',
    // 'replyMessage',
  ];

  dataSource: MatTableDataSource<MessageTransaction> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  searchText: string = '';
  sortByField: string = '';
  sortByOrder: string = '';

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    //Load initial data
    this.loadData();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(
      (res:any) => {
        console.log('sortChange =>',res);
        this.pageNumber = 1;
        this.sortByField = res.active;
        this.sortByOrder = res.direction;
        console.log("sortByOrder =",this.sortByOrder);
        this.loadData();        
      }
    );
  }

  ngAfterViewChecked() {
    if (this.pagination) {
      const list = document.getElementsByClassName('mat-paginator-range-label');
      let htmlText: string = `Page: ${this.pagination?.currentPage} of ${this.pagination?.totalPages}`;
      let startItem: number = this.pageIndex * this.pageSize + 1;
      let endItem: number = startItem + this.pageSize - 1;
      htmlText += ` | Items: ${startItem} - ${endItem} of ${this.pagination?.totalItems}`;
      list[0].innerHTML = htmlText;
    }
  }

  loadData() {
    this.isLoading = true;
    let params: TableDataParams = {
      page: this.pageNumber,
      itemsPerPage: this.pageSize,
      searchText: this.searchText,
      selectedColumns: this.selectedColumns,
      sortByField: this.sortByField,
      sortByOrder: this.sortByOrder
    };
    
    this.messageService.getMessages(params).subscribe({
      next: (res) => {
        if (res.result && res.pagination) {
          this.messageTrans = res.result;
          this.pagination = res.pagination;

          this.pageIndex = this.pagination.currentPage - 1;
          this.length = this.pagination.totalItems;

          this.dataSource = new MatTableDataSource(this.messageTrans);
          this.isLoading = false;
          console.log('loadData => ', this.pagination);
          console.log(this.messageTrans);
        }
      },
      error: (err) => {
        console.log('loadData Error :', err);
        this.isLoading = false;
      },
    });
  }

  pageChanged(event: PageEvent) {
    console.log('PageEvent =>', { event });
    let isLoadData: boolean = false;
    if (this.pageIndex !== event.pageIndex) {
      this.pageNumber = event.pageIndex + 1;
      isLoadData = true;
    }

    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      isLoadData = true;
    }

    if (isLoadData) {
      this.loadData();
      console.log('PageChanged loadData:', this.messageTrans);
    }
  }

  filterData(event: any){
    this.searchText = event.target.value;
    this.pageNumber = 1;
    this.loadData();
  }

  applyFilter(filterValue: string) {
    this.searchText = filterValue;
    this.pageNumber = 0;
    this.loadData();
  }

  donothing(row: any){

  }

  // addCustomer() {
  //   const dialogRef = this.dialog.open(CustomerDetailComponent, {
  //     width: '50%',
  //     data: null,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //     if (result === 'add') {
  //       this.loadData();
  //     }
  //   });
  // }

  // updateCustomer(row: any) {
  //   const dialogRef = this.dialog.open(MessageDetailComponent, {
  //     width: '50%',
  //     data: row,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //     if (result === 'update') {
  //       this.loadData();
  //     }
  //   });
  // }

  // deleteCustomer(row: Customer): void {
  //   let confirmMessage: string = `Do you want to delete ${row.firstName+"  "+row.lastName}?`;
  //   const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
  //     width: '350px',
  //     data: confirmMessage,
  //     // data: row,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //     if (result) {
  //       this.messageService.deleteCustomer(row.id).subscribe({
  //         next: (res) => {
  //           console.log("DeleteCustomer Info:",res);
  //           this.loadData();
  //         },
  //         error: (err) => {
  //           // alert('Error while deleting the customer!!');
  //           console.log("DeleteCustomer Error:",err);
  //         },
  //       });
  //     }
  //   });
  // }
}
