import { Component, inject, OnInit, signal } from '@angular/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { HINT_SHOW_DELAY } from './constants/constants'
import { HeaderComponent } from './components/header/header.component'
import { BookComponent } from './components/book/book.component'
import {NgTemplateOutlet} from '@angular/common'
import {BooksService} from './services/books.service'
import {Book} from './api/interfaces'
import {BookActionNamesEnum} from './enums/enums'
import {ActionsService} from './services/actions.service'


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
  protected readonly apiService = inject(BooksService)
  private readonly actionService = inject(ActionsService)
  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY
  protected readonly BookActionNamesEnum = BookActionNamesEnum;

  loading = signal<boolean>(false)
  error = this.apiService.getError
  booksList = this.apiService.bookList

  async ngOnInit(): Promise<void> {
    await this.loadData()
  }

  async loadData(searchValue = ''): Promise<void> {
    this.loading.set(true)
    await this.apiService.getBookList(searchValue)
    this.loading.set(false)
  }

  onActionClick(action: BookActionNamesEnum, book: Book | null) {
    this.actionService.executeFileAction(action, book)
  }
}
