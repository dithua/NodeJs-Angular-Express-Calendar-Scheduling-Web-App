import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { HttpserviceService } from './httpservice.service';
import { DataserviceService } from './dataservice.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent,
    MenuViewComponent,
    DialogComponentComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [DialogComponentComponent, ConfirmDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    AmazingTimePickerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule

  ],
  providers: [HttpserviceService, DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
