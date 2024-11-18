import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { DEFAULT_AVATAR_URL, HINT_SHOW_DELAY } from '../../constants/constants'
import { Book } from '../../interfaces/data-interfaces'
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, DatePipe],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY

  book = input.required<Book>()

  @Output() bookClick = new EventEmitter<void>()
  @Output() bookEdit = new EventEmitter<void>()
  @Output() bookDelete = new EventEmitter<void>()

  get avatarUrl(): string {
    const url = this.book().avatar_url || DEFAULT_AVATAR_URL
    return `url(${url})`
  }
}
