import { Injectable } from '@angular/core';
import {BehaviorSubject, mergeMap, Observable, of, switchMap, throwError, timer} from 'rxjs';
import { delay } from 'rxjs/operators';
import {Book, ErrorSettings} from '../interfaces/data-interfaces';
import { booksMock } from './api-service-mocks';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

const REQUEST_DELAY = 2000

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  private readonly STORAGE_KEY = 'book_collection'
  private requestSubject = new BehaviorSubject<string>('');

  errorSettings: ErrorSettings = {
    get: false,
    delete: false,
    post: false,
    put: false,
  }

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(booksMock))
    }
  }

  getBooks(filter = ''): Observable<Book[] | HttpErrorResponse> {
    const normalizedFilter = filter.trim().toLowerCase();
    this.requestSubject.next(normalizedFilter);

    return this.requestSubject.pipe(
      switchMap(currentFilter => {
        const filteredBooks = this.getBooksFromStorage().filter(
          book =>
            book.title.toLowerCase().includes(currentFilter) ||
            book.author.toLowerCase().includes(currentFilter)
        );

        if (this.errorSettings.get) {
          return timer(REQUEST_DELAY).pipe(
            mergeMap(() =>
              throwError(
                () =>
                  new HttpErrorResponse({
                    status: 500,
                    statusText: 'Internal Server Error',
                    error: 'Failed to fetch books',
                  })
              )
            )
          );
        }

        return of(filteredBooks).pipe(delay(REQUEST_DELAY));
      })
    );
  }

  createBook(newBook: Partial<Book>): Observable<HttpResponse<Book> | HttpErrorResponse> {
    const currentBooks = this.getBooksFromStorage();
    const createdBook: Book = {
      id: this.generateUniqueId(),
      avatar_url: newBook.avatar_url ?? '',
      title: newBook.title ?? 'Untitled',
      author: newBook.author ?? 'Unknown Author',
      createdDate: new Date(),
      description: newBook.description ?? '',
    };
    const updatedBooks = [...currentBooks, createdBook];

    if (this.errorSettings.post) {
      return timer(REQUEST_DELAY).pipe(
        mergeMap(() =>
          throwError(
            () =>
              new HttpErrorResponse({
                status: 500,
                statusText: 'Internal Server Error',
                error: 'Failed to create book',
              })
          )
        )
      );
    }

    this.saveBooksToStorage(updatedBooks);

    return of(
      new HttpResponse<Book>({
        status: 201,
        statusText: 'Created',
        body: createdBook,
      })
    ).pipe(delay(REQUEST_DELAY));
  }

  updateBook(bookId: string, updatedData: Partial<Book>): Observable<HttpResponse<Book> | HttpErrorResponse> {
    const currentBooks = this.getBooksFromStorage();
    const bookToUpdate = currentBooks.find(book => book.id === bookId);

    if (!bookToUpdate) {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        error: { message: 'Book not found' }
      });
      return of(errorResponse);
    }

    const updatedBook = { ...bookToUpdate, ...updatedData };

    if (this.errorSettings.put) {
      return timer(REQUEST_DELAY).pipe(
        mergeMap(() => {
          const error = new HttpErrorResponse({
            status: 500,
            statusText: 'Internal Server Error',
            error: { message: 'Failed to update book' }
          });
          return throwError(() => error);
        })
      );
    }

    const updatedBooks = currentBooks.map(book =>
      book.id === bookId ? updatedBook : book
    );

    this.saveBooksToStorage(updatedBooks);

    return of(
      new HttpResponse<Book>({
        status: 200,
        body: updatedBook
      })
    ).pipe(delay(REQUEST_DELAY));
  }

  deleteBook(bookId: string): Observable<HttpResponse<{ id: string }> | HttpErrorResponse> {
    const currentBooks = this.getBooksFromStorage();
    const updatedBooks = currentBooks.filter(book => book.id !== bookId);

    if (this.errorSettings.delete) {
      return timer(REQUEST_DELAY).pipe(
        mergeMap(() =>
          throwError(
            () =>
              new HttpErrorResponse({
                status: 500,
                statusText: 'Internal Server Error',
                error: 'Failed to delete book',
              })
          )
        )
      );
    }

    this.saveBooksToStorage(updatedBooks);

    return of(
      new HttpResponse<{ id: string }>({
        status: 200,
        statusText: 'OK',
        body: { id: bookId },
      })
    ).pipe(delay(REQUEST_DELAY));
  }

  private getBooksFromStorage(): Book[] {
    const data = localStorage.getItem(this.STORAGE_KEY)
    return data ? JSON.parse(data) : []
  }

  private saveBooksToStorage(books: Book[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books))
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).slice(2, 11);
  }
}
