import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;
  @Input() itemsPerPage: number = 10;
  @Input() maxPokemon: number = 1008;

  
  maxButtons: number = 6;
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

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getDisplayedPages(): number[] {
    const halfMaxButtons = Math.floor(this.maxButtons / 2);
    const startPage = Math.max(1, this.currentPage - halfMaxButtons);
    const endPage = Math.min(this.totalPages, startPage + this.maxButtons - 1);
  
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }
  

  disable(){
    this.isDisabled = true;
  }

  reset(){
    this.isDisabled = false;

  }
}
