import { inject, Injectable } from '@angular/core'
import { BookActionNamesEnum } from '../enums/enums'
import { Book } from '../api/interfaces'
import {DialogsService} from './dialogs.service';


@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private readonly dialogsService = inject(DialogsService)

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
    const result: BookActionNamesEnum = await this.dialogsService.openBook(book)

    if (result === BookActionNamesEnum.edit) {
      this.editBook(book)
    }

    if (result === BookActionNamesEnum.delete) {
      this.deleteBook(book)
    }
  }

  private createBook(): void {
    void this.dialogsService.createBook()
  }

  private editBook(book: Book | null): void {
    if (!book) return
    void this.dialogsService.editBook(book)
  }

  private deleteBook(book: Book | null): void {
    if (!book) return
    void this.dialogsService.deleteBook(book)
  }
}
