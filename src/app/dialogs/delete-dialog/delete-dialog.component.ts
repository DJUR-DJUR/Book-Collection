import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import * as dataInterfaces from '../../interfaces/data-interfaces'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NotificationService } from '../../notification/notification.service'
import { MessageStyle } from '../../notification/notification.api'
import {BookCollectionService} from '../../services/book-collection.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  saving = signal<boolean>(false)

  private readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>)
  public readonly data = inject(MAT_DIALOG_DATA) as dataInterfaces.Book
  private readonly apiService = inject(BookCollectionService)
  private readonly notification = inject(NotificationService)

  public async confirmDelete(): Promise<void> {
    this.saving.set(true)
    this.dialogRef.disableClose = true
    await this.apiService.deleteBook(this.data.id)

    if (this.apiService.deleteError()) {
      this.saving.set(false)
      this.notification.showNotification({
        message: 'An error occurred while deleting the book',
        style: MessageStyle.Error
      })
      this.dialogRef.disableClose = false
    } else {
      this.notification.showNotification({
        message: 'The book has been successfully deleted',
        style: MessageStyle.Success
      })
      this.dialogRef.close()
    }
  }
}
