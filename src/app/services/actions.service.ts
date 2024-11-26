import { inject, Injectable } from '@angular/core'
import { BookActionNamesEnum } from '../enums/enums'
import { Book } from '../api/interfaces'
import {DetailsDialogComponent} from '../dialogs/details-dialog/details-dialog.component';
import {MAX_WIDTH_POPUP_DESKTOP} from '../constants/constants';
import {firstValueFrom} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CreateDialogComponent} from '../dialogs/create-dialog/create-dialog.component';
import {EditDialogComponent} from '../dialogs/edit-dialog/edit-dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private readonly dialog = inject(MatDialog)

  public executeFileAction(actionName: BookActionNamesEnum, book: Book | null): void {
    switch (actionName) {
      case BookActionNamesEnum.open: {
        void this.openBook(book)
        break
      }
      case BookActionNamesEnum.create: {
        this.createBook()
        break
      }
      case BookActionNamesEnum.edit: {
        this.editBook(book)
        break
      }
      case BookActionNamesEnum.delete: {
        this.deleteBook(book)
        break
      }
    }
  }

  private async openBook(book: Book | null): Promise<void> {
    if (!book) return
    const result: BookActionNamesEnum = await firstValueFrom(
      this.dialog.open(DetailsDialogComponent, {
        maxWidth: MAX_WIDTH_POPUP_DESKTOP,
        minWidth: MAX_WIDTH_POPUP_DESKTOP,
        data: book,
      }).afterClosed()
    )

    if (result === BookActionNamesEnum.edit) {
      this.editBook(book)
    }

    if (result === BookActionNamesEnum.delete) {
      this.deleteBook(book)
    }
  }

  private createBook(): void {
    this.dialog.open(CreateDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
    })
  }

  private editBook(book: Book | null): void {
    if (!book) return
    this.dialog.open(EditDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })
  }

  private deleteBook(book: Book | null): void {
    if (!book) return
    this.dialog.open(DeleteDialogComponent, {
      maxWidth: MAX_WIDTH_POPUP_DESKTOP,
      minWidth: MAX_WIDTH_POPUP_DESKTOP,
      data: book,
    })
  }
}
