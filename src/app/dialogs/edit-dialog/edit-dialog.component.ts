import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import { NotificationService } from '../../notification/notification.service'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import {clearSelection, imageUrlValidator} from '../../utils/utils'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MessageStyle } from '../../notification/notification.api'
import {BOOK_FORM_FIELDS, MAX_DATE} from '../../constants/constants'
import * as dataInterfaces from '../../interfaces/data-interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BookCollectionService } from '../../services/book-collection.service';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent implements OnInit {
  saving = signal<boolean>(false)

  bookUpdatingForm!: FormGroup
  initialFormValues!: dataInterfaces.Book

  private readonly dialogRef = inject(MatDialogRef<EditDialogComponent>)
  private readonly apiService = inject(BookCollectionService)
  private readonly notification = inject(NotificationService)
  private readonly formBuilder = inject(FormBuilder)
  public readonly data = inject(MAT_DIALOG_DATA) as dataInterfaces.Book

  protected readonly BOOK_FORM_FIELDS = BOOK_FORM_FIELDS
  protected readonly MAX_DATE = MAX_DATE

  get isDataEqual(): boolean {
    return JSON.stringify(this.initialFormValues) === JSON.stringify(this.bookUpdatingForm.getRawValue())
  }

  ngOnInit(): void {
    this.initForm()
  }

  async updateBook(): Promise<void> {
    if (this.bookUpdatingForm.invalid) return

    this.saving.set(true)
    this.disableForm()

    await this.apiService.updateBook(this.data.id, this.bookUpdatingForm.value)

    if (this.apiService.putError()) {
      this.saving.set(false)
      this.notification.showNotification({
        message: 'An error occurred while updating the book',
        style: MessageStyle.Error,
      })
      this.enabledForm()
    } else {
      this.notification.showNotification({
        message: 'The book has been successfully updated',
        style: MessageStyle.Success,
      })
      this.dialogRef.close()
    }
  }

  private initForm(): void {
    this.bookUpdatingForm = this.formBuilder.group({
      avatar_url: new FormControl(this.data.avatar_url, [Validators.maxLength(300), imageUrlValidator()]),
      title: new FormControl(this.data.title, [Validators.required, Validators.maxLength(100)]),
      author: new FormControl(this.data.author, [Validators.required, Validators.maxLength(100)]),
      createdDate: new FormControl(new Date(this.data.createdDate), [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required, Validators.maxLength(300)]),
    })

    this.initialFormValues = this.bookUpdatingForm.getRawValue()
  }

  private disableForm(): void {
    this.dialogRef.disableClose = true
    clearSelection()
    this.bookUpdatingForm.disable()
  }

  private enabledForm(): void {
    this.dialogRef.disableClose = false
    this.bookUpdatingForm.enable()
  }
}
