import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for optional HTTP options
interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean };
}

// Environment configuration (replace with your actual environment setup)
const API_BASE_URL = 'http://localhost:3000'; // Update with your API base URL

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Perform a GET request
   * @param endpoint The API endpoint (e.g., '/users')
   * @param options Optional headers or query params
   * @returns Observable of the response
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    return this.http.get<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a POST request
   * @param endpoint The API endpoint (e.g., '/users')
   * @param body The request payload
   * @param options Optional headers or query params
   * @returns Observable of the response
   */
  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    return this.http.post<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a DELETE request
   * @param endpoint The API endpoint (e.g., '/users/123')
   * @param options Optional headers or query params
   * @returns Observable of the response
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    return this.http.delete<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a PATCH request
   * @param endpoint The API endpoint (e.g., '/users/123')
   * @param body The request payload
   * @param options Optional headers or query params
   * @returns Observable of the response
   */
  patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    return this.http.patch<T>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   * @param error The HTTP error response
   * @returns Observable with the error message
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      console.log('Server error:', error);
      errorMessage = error.error.errorResponse.message;
    }
    console.error(error.error.errorResponse.message);
    return throwError(() => new Error(errorMessage));
  }
}