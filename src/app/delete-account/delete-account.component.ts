import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
 @Input() deleteAcno:any;
 //user defined event
  @Output() onCancel=new EventEmitter();
  @Output() onDelete=new EventEmitter();
 cancel(){
  this.onCancel.emit()
 }
 deleteFromChild(){
  this.onDelete.emit()
 }
}
