import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmbeddedDto } from 'src/app/models/get-embed-dto';
import { Pagination } from 'src/app/models/pagination';
import { TableDataParams } from 'src/app/models/tableDataParams';
import { EmbedingService } from 'src/app/services/embeding.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-embed-list',
  templateUrl: './embed-list.component.html',
  styleUrls: ['./embed-list.component.scss']
})
export class EmbedListComponent implements OnInit {

  isLoading = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pagination: Pagination | undefined;
  pageNumber: number = 1;

  length: number = 50;
  pageSize: number = 10;
  pageIndex: number = 0;

  embeddedData: GetEmbeddedDto[] = [];
  displayedColumns: string[] = [
    'no',
    'createdAt',
    'category',
    'prompt',
    'completion',
    'nTokens',
    'actions',
  ];

  filterColumns: string[] = [
    'prompt',
  ];

  selectedColumns: string[] = [
    'prompt',
  ];

  dataSource: MatTableDataSource<GetEmbeddedDto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  searchText: string = '';
  sortByField: string = '';
  sortByOrder: string = '';

  constructor(
    private embedingService: EmbedingService,
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
    
    this.embedingService.getAllEmbeddedData(params).subscribe({
      next: (res) => {
        if (res.result && res.pagination) {
          this.embeddedData = res.result;
          this.pagination = res.pagination;

          this.pageIndex = this.pagination.currentPage - 1;
          this.length = this.pagination.totalItems;

          this.dataSource = new MatTableDataSource(this.embeddedData);
          this.isLoading = false;
          console.log('loadData => ', this.pagination);
          console.log(this.embeddedData);
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
      console.log('PageChanged loadData:', this.embeddedData);
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

}
