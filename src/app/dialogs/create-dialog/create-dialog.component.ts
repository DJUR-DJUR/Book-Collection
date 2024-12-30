import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../notification/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {clearSelection, imageUrlValidator} from '../../utils/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageStyle } from '../../notification/notification.api';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {BOOK_FORM_FIELDS, MAX_DATE} from '../../constants/constants'
import {BooksService} from "../../services/books.service";
import {Book} from '../../api/interfaces';

@Component({
  selector: 'app-create-book-dialog',
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
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDialogComponent implements OnInit {
  saving = signal<boolean>(false);

  bookCreationForm!: FormGroup<{
    avatar_url: FormControl<string | null>;
    title: FormControl<string | null>;
    author: FormControl<string | null>;
    createdDate: FormControl<Date | null>;
    description: FormControl<string | null>;
  }>;

  private readonly dialogRef = inject(MatDialogRef<CreateDialogComponent>);
  private readonly apiService = inject(BooksService);
  private readonly notification = inject(NotificationService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly BOOK_FORM_FIELDS = BOOK_FORM_FIELDS;
  protected readonly MAX_DATE = MAX_DATE;

  ngOnInit(): void {
    this.initForm();
  }

  async createNewBook(): Promise<void> {
    if (this.bookCreationForm.invalid) {
      return;
    }

    this.saving.set(true);
    this.disableForm();

    const formValue = this.bookCreationForm.value;
    const bookData: Omit<Book, 'id'> = {
      avatar_url: formValue.avatar_url ?? '',
      title: formValue.title ?? '',
      author: formValue.author ?? '',
      createdDate: formValue.createdDate ?? new Date(),
      description: formValue.description ?? '',
    };

    await this.apiService.createBook(bookData);

    if (this.apiService.postError()) {
      this.saving.set(false);
      this.notification.showNotification({
        message: 'An error occurred while creating the book',
        style: MessageStyle.Error
      });
      this.enabledForm();
    } else {
      this.notification.showNotification({
        message: 'The book has been successfully created',
        style: MessageStyle.Success
      });
      this.dialogRef.close();
    }
  }

  private initForm(): void {
    this.bookCreationForm = this.formBuilder.group({
      avatar_url: new FormControl<string | null>(null, [Validators.maxLength(300), imageUrlValidator()]),
      title: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
      author: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(100)]),
      createdDate: new FormControl<Date | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(300)]),
    });
  }

  private disableForm (): void {
    this.dialogRef.disableClose = true;
    clearSelection();
    this.bookCreationForm.disable();
  }

  private enabledForm (): void {
    this.dialogRef.disableClose = false;
    this.bookCreationForm.enable();
  }
}
