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
import {debounceTime, distinctUntilChanged } from 'rxjs';


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

  @Output() isBlurred = new EventEmitter<boolean>(false)
  @Output() searchChange = new EventEmitter<string>();

  search = new FormControl<string>('', {nonNullable: true});

  constructor() {
    effect(() => {
      this.searchInput.nativeElement.focus()
    })

    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.searchChange.next(value);
      });
  }

  clearSearch(event: MouseEvent) {
    event.preventDefault();

    if (this.search.getRawValue()) {
      this.search.patchValue('', { emitEvent: false})
      this.searchChange.next('');
    }
  }

  onBlur() {
    if (!this.search.getRawValue()) {
      this.isBlurred.next(true)
    }
  }
}
