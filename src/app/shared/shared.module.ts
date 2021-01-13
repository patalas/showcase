import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DayMonthYearPipe } from './pipes/day-month-year.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortComponent } from './sort/sort.component';
import { DateStructToDatePipe } from './pipes/datestruct-to-date.pipe';
import { DeleteComponent } from './delete/delete.component';
import { ValidationComponent } from './validation/validation.component';
import { RequiredComponent } from './required/required.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';


@NgModule({
  declarations: [AlertComponent, LoadingComponent, SortComponent, DayMonthYearPipe,
    DateStructToDatePipe, DeleteComponent, ValidationComponent, RequiredComponent, MessageDialogComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertComponent,
    LoadingComponent,
    NgxDatatableModule,
    DayMonthYearPipe,
    NgbModule,
    CommonModule,
    FormsModule,
    SortComponent,
    LoadingComponent,
    ReactiveFormsModule,
    DateStructToDatePipe,
    ValidationComponent,
    RequiredComponent,
    DeleteComponent,
    MessageDialogComponent
  ],
  providers: [
   DatePipe
  ],
  entryComponents: [DeleteComponent, MessageDialogComponent]
})
export class SharedModule { }
