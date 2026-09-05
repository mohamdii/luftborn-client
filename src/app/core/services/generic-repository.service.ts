import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../../environments/enivronment';

export abstract class GenericRepository<T> {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string,
  ) {}

  getAll(): Observable<T[]> {
    return this.http
      .get<ApiResponse<T[]>>(this.baseUrl)
      .pipe(map((response) => response.data ?? []));
  }

  getById(id: number): Observable<T | null> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  create(dto: T): Observable<T | null> {
    return this.http.post<ApiResponse<T>>(this.baseUrl, dto).pipe(map((response) => response.data));
  }

  update(id: number, dto: T): Observable<T | null> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}/${id}`, dto)
      .pipe(map((response) => response.data));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<object>>(`${this.baseUrl}/${id}`)
      .pipe(map(() => undefined));
  }
}
