import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import * as dataInterfaces from '../../interfaces/data-interfaces';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {HINT_SHOW_DELAY, MAX_WIDTH_POPUP_DESKTOP} from '../../constants/constants';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule, DatePipe, MatDividerModule, MatButtonModule, MatIcon, MatTooltip],
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA) as dataInterfaces.Book

  private readonly dialogRef = inject(MatDialogRef<DetailsDialogComponent>)
  private readonly dialog = inject(MatDialog);

  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY

  onEditBook(book: dataInterfaces.Book): void {
    this.dialogRef.close();
    this.dialog.open(EditDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    });
  }

  onDeleteBook(book: dataInterfaces.Book): void {
    this.dialogRef.close();
    this.dialog.open(DeleteDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    });
  }
}
