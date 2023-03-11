import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Pagination } from 'src/app/models/pagination';
import { TableDataParams } from 'src/app/models/tableDataParams';
import { TrainingDto } from 'src/app/models/training-dto';
import { TrainingService } from 'src/app/services/training.service';
import { CompletionEditorComponent } from '../completion-editor/completion-editor.component';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pagination: Pagination | undefined;
  pageNumber: number = 1;

  length: number = 50;
  pageSize: number = 10;
  pageIndex: number = 0;

  public messageTrans: TrainingDto[] = [];
  displayedColumns: string[] = [
    'id',
    'messageDateTime',
    // 'messageText',
    'requestMessageTranslatedText',
    'responseMessage',
    // 'embeddedId',
    'embeddedPrompt',
    'embeddedCompletion',
    'otherData',
    // 'questionRef',
    // 'success',
    // 'errorMessage',
    // 'updatedAt',
    'actions',
  ];

  filterColumns: string[] = [
    'ID',
    'UserMessage',
    'DB-Question',
  ];

  selectedColumns: string[] = [
    'UserMessage',
    // 'embeddedPrompt',
    // 'otherData',
  ];

  // dataSource: MatTableDataSource<TrainingDto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  searchText: string = '';
  sortByField: string = '';
  sortByOrder: string = '';

  public isEditAble: boolean = false;

  constructor(
    private messageService: TrainingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Load initial data
    this.loadData();

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.sort?.sortChange.subscribe(
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

          // this.dataSource = new MatTableDataSource(this.messageTrans);
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

  onUpdateStatusChange(element: any) {
    let databaseStatus = JSON.parse(element.databaseStatus ?? true)
    console.log("databaseStatus type:"+typeof(databaseStatus)+ "=" +databaseStatus);

    let internetStatus = JSON.parse(element.internetStatus ?? false)
    console.log("internetStatus type:"+typeof(internetStatus)+ "=" +internetStatus);

    let updateStatus = JSON.parse(element.updateStatus ?? false)
    console.log("updateStatus type:"+typeof(updateStatus)+ "=" +updateStatus);
    console.log("updateStatus type:"+typeof(element.updateStatus)+ "=" +element.updateStatus);
    
    this.isEditAble = false;

    if(element.databaseStatus === undefined && element.internetStatus === undefined && element.updateStatus === undefined){
      element.trainingStatus = "None";
    }
    else if(databaseStatus===true && internetStatus===true && updateStatus==false){
      element.trainingStatus = "Fix";
    }
    else if(databaseStatus===true && internetStatus===false && updateStatus==false){
      element.trainingStatus = "Fix";
    }
    else if(databaseStatus===false && internetStatus===true && updateStatus==false){
      element.trainingStatus = "Update from interneted";
    }
    else if(databaseStatus===false && internetStatus===false && updateStatus==false){
      element.trainingStatus = "Update from human ";
      this.isEditAble = true;
    }
    else if(internetStatus===true && updateStatus===true){
      element.trainingStatus = "Update Everyday";
    }
    else if(internetStatus==false && updateStatus===true){
      element.trainingStatus = "Bug";
      this.isEditAble = true;
    }else{
      element.trainingStatus = "Fix";
    }

   
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

  updateCompletion(row: any) {
    const dialogRef = this.dialog.open(CompletionEditorComponent, {
      width: '50%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === 'update') {
        this.loadData();
      }
    });
  }

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
