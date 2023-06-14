import { EventEmitter, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { DataTable } from 'src/models/data-table';

@Component({
  selector: 'table-value',
  templateUrl: './table-value.component.html',
  styleUrls: ['./table-value.component.css'],
})
export class TableValueComponent {
  @Input() value: string = '';
  @Input() index: number = 0;
  @Output() valueOutput: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;

  previousValue: string = '';

  constructor() {}

  startEdit() {
    this.isEditing = true;
    this.previousValue = this.value;
  }

  cancelEdit(event: any) {
    this.isEditing = false;
    this.value = this.previousValue;
    this.previousValue = '';
  }

  submitEdit() {
    this.isEditing = false;
    this.valueOutput.emit({ index: this.index, value: this.value });
  }

  removeItem(event: any) {
    event.stopPropagation();
    this.valueOutput.emit({
      index: this.index,
      value: this.value,
      delete: true,
    });
  }
}
