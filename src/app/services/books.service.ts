import { inject, Injectable, signal } from '@angular/core'
import { FakeApiService } from '../api/fake-api.service';
import { firstValueFrom } from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Book} from '../api/interfaces';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private bookListSignal = signal<Book[]>([]);
  private getErrorSignal = signal<boolean>(false);
  private deleteErrorSignal = signal<boolean>(false);
  private postErrorSignal = signal<boolean>(false);
  private putErrorSignal = signal<boolean>(false);

  bookList = this.bookListSignal.asReadonly();
  getError = this.getErrorSignal.asReadonly();
  deleteError = this.deleteErrorSignal.asReadonly();
  postError = this.postErrorSignal.asReadonly();
  putError = this.putErrorSignal.asReadonly();

  private apiService = inject(FakeApiService);

  async getBookList(filter = ''): Promise<void> {
    this.getErrorSignal.set(false);
    try {
      const books = await firstValueFrom(this.apiService.getBooks(filter));
      this.bookListSignal.set(books as Book[]);
    } catch {
      this.getErrorSignal.set(true);
    }
  }

  async createBook(bookData: Omit<Book, 'id'>): Promise<void> {
    this.postErrorSignal.set(false);
    try {
      const response = await firstValueFrom(this.apiService.createBook(bookData));
      if (response instanceof HttpResponse) {
        const createdBook: Book | null = response.body;
        if (createdBook) {
          const currentBooks: Book[] = this.bookListSignal();
          this.bookListSignal.set([...currentBooks, createdBook]);
        }
      }
    } catch {
      this.postErrorSignal.set(true);
    }
  }

  async updateBook(bookId: string, updatedData: Partial<Book>): Promise<void> {
    this.putErrorSignal.set(false);
    try {
      const response = await firstValueFrom(this.apiService.updateBook(bookId, updatedData));
      if (response instanceof HttpResponse) {
        const updatedBook = response.body;
        if (updatedBook) {
          const currentBooks = this.bookListSignal();
          const updatedBooks = currentBooks.map(book =>
            book.id === bookId ? updatedBook : book
          );
          this.bookListSignal.set(updatedBooks);
        }
      }
    } catch {
      this.putErrorSignal.set(true);
    }
  }

  async deleteBook(bookId: string): Promise<void> {
    this.deleteErrorSignal.set(false);
    try {
      const response = await firstValueFrom(this.apiService.deleteBook(bookId));
      if (response instanceof HttpResponse && response.status === 200) {
        const deletedBookId: string | undefined = response.body?.id;
        const updatedBooks: Book[] = this.bookListSignal().filter(book => book.id !== deletedBookId);
        this.bookListSignal.set(updatedBooks);
      }
    } catch {
      this.deleteErrorSignal.set(true);
    }
  }
}
