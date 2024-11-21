import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import {HINT_SHOW_DELAY} from '../../constants/constants'
import {MatIcon} from '@angular/material/icon'
import {MatTooltip} from '@angular/material/tooltip'
import {BookActionNamesEnum} from '../../enums/enums'
import {Book} from '../../api/interfaces';


@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [MatDialogModule, DatePipe, MatDividerModule, MatButtonModule, MatIcon, MatTooltip],
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDialogComponent {
  public readonly data = inject<Book>(MAT_DIALOG_DATA)

  private readonly dialogRef = inject(MatDialogRef<DetailsDialogComponent>)

  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY

  onEditBook(): void {
    this.dialogRef.close(BookActionNamesEnum.edit);
  }

  onDeleteBook(): void {
    this.dialogRef.close(BookActionNamesEnum.delete);
  }
}
