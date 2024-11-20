import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core'
import { HINT_SHOW_DELAY } from '../../constants/constants'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { SearchComponent } from '../search/search.component'
import { MatDividerModule } from '@angular/material/divider'
import { MatMenuModule,  } from '@angular/material/menu'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { TitleCasePipe } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ErrorSettingsEnum } from '../../interfaces/data-interfaces'
import {FakeApiService} from '../../api/fake-api.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    SearchComponent,
    MatDividerModule,
    MatSlideToggleModule,
    TitleCasePipe,
    MatMenuModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() reloadData = new EventEmitter<void>()
  @Output() searchChange = new EventEmitter<string>();
  @Output() createNewBook = new EventEmitter<void>();

  showSearch = signal<boolean>(false)
  errorSettingsControlNames = signal<string[]>([])

  private readonly formBuilder = inject(FormBuilder)
  protected readonly apiService = inject(FakeApiService)
  protected readonly HINT_SHOW_DELAY = HINT_SHOW_DELAY

  errorSettingsForm!: FormGroup

  async ngOnInit(): Promise<void> {
    this.initForm()
  }

  onSearch(event: string): void {
    this.searchChange.next(event);
  }

  onSearchBlur(): void {
    this.showSearch.set(false)
  }

  getFormControl(controlName: string): FormControl {
    return this.errorSettingsForm.get(controlName) as FormControl
  }

  private initForm(): void {
    this.errorSettingsForm = this.formBuilder.group({
      [ErrorSettingsEnum.get]: new FormControl(false),
      [ErrorSettingsEnum.post]: new FormControl(false),
      [ErrorSettingsEnum.put]: new FormControl(false),
      [ErrorSettingsEnum.delete]: new FormControl(false),
    })

    this.errorSettingsControlNames.set(Object.keys(this.errorSettingsForm.controls))
    this.initSubscription()
  }

  private initSubscription(): void {
    Object.values(ErrorSettingsEnum).forEach((controlName) => {
      this.errorSettingsForm.get(controlName)?.valueChanges.subscribe((value) => {
        this.apiService.errorSettings[controlName] = value
      })
    })

    this.errorSettingsForm.get(ErrorSettingsEnum.get)?.valueChanges.subscribe((value) => {
      if (value) {
        void this.reloadData.next()
      }
    })
  }
}
