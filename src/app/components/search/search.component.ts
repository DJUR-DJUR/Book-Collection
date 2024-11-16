import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, MatTooltipModule, MatButtonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  @Output()
  isBlurred = new EventEmitter<boolean>(false)

  search = new FormControl<string>('')

  constructor() {
    effect(() => {
      this.searchInput.nativeElement.focus()
    })
  }

  clearSearch(event: MouseEvent) {
    event.preventDefault();
    this.search.patchValue('', { emitEvent: false})
  }
}
