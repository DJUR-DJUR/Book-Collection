import {inject, Injectable} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {DetailsDialogComponent} from '../dialogs/details-dialog/details-dialog.component'
import {MAX_WIDTH_POPUP_DESKTOP} from '../constants/constants'
import {Book} from '../api/interfaces'
import {firstValueFrom} from 'rxjs'
import {CreateDialogComponent} from '../dialogs/create-dialog/create-dialog.component';
import {EditDialogComponent} from '../dialogs/edit-dialog/edit-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {BookActionNamesEnum} from '../enums/enums';


@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  private readonly dialog = inject(MatDialog)

  public openBook(book: Book): Promise<BookActionNamesEnum> {
    const ref = this.dialog.open(DetailsDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })

    return firstValueFrom(ref.afterClosed())
  }

  public createBook(): Promise<void> {
    const ref = this.dialog.open(CreateDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
    })

    return firstValueFrom(ref.afterClosed())
  }

  public editBook(book: Book): Promise<void> {
    const ref = this.dialog.open(EditDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })

    return firstValueFrom(ref.afterClosed())
  }

  public deleteBook(book: Book): Promise<void> {
    const ref = this.dialog.open(DeleteDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })

    return firstValueFrom(ref.afterClosed())
  }
}
