import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  isDisabled: boolean = false;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.isDisabled = false;
  }
  ngOnInit(): void {
    console.log("TotalPages", this.totalPages);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }

  disable(){
    this.isDisabled = true;
  }

  reset(){
    this.isDisabled = false;

  }
}
