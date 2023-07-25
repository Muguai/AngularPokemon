import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
