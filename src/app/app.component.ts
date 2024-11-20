import { Component, inject, OnInit, signal } from '@angular/core'
import { Book } from './interfaces/data-interfaces'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { HINT_SHOW_DELAY, MAX_WIDTH_POPUP_DESKTOP } from './constants/constants'
import { MatDialog } from '@angular/material/dialog'
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component'
import { HeaderComponent } from './components/header/header.component'
import { BookComponent } from './components/book/book.component'
import {CreateDialogComponent} from './dialogs/create-dialog/create-dialog.component';
import {EditDialogComponent} from './dialogs/edit-dialog/edit-dialog.component';
import {NgTemplateOutlet} from '@angular/common';
import {BookCollectionService} from './services/book-collection.service';
import {DetailsDialogComponent} from './dialogs/details-dialog/details-dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltip,
    HeaderComponent,
    BookComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly apiService = inject(BookCollectionService)
  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY
  private readonly dialog = inject(MatDialog)

  loading = signal<boolean>(false)
  error = this.apiService.getError
  bookList = this.apiService.bookList

  async ngOnInit(): Promise<void> {
    await this.loadData()
  }

  async loadData(searchValue = ''): Promise<void> {
    this.loading.set(true)
    await this.apiService.getBookList(searchValue)
    this.loading.set(false)
  }

  onBookClick(book: Book): void {
    this.dialog.open(DetailsDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })
  }

  onEditBook(book: Book): void {
    this.dialog.open(EditDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })
  }

  createNewBook(): void {
    this.dialog.open(CreateDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
    })
  }

  onDeleteBook(book: Book): void {
    this.dialog.open(DeleteDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })
  }
}
