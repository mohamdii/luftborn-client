import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { map, Observable } from 'rxjs';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../models/product.model';
import { environment } from '../../../../environment/enivronment';
@Service()
export class Product {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/product`;
  contstructor() {}

  getAll(): Observable<ProductDto[]> {
    return this.http
      .get<ApiResponse<ProductDto[]>>(`${this.baseUrl}`)
      .pipe(map((response) => response.data ?? []));
  }

  getById(id: number): Observable<ProductDto | null> {
    return this.http
      .get<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data ?? null));
  }

  create(dto: CreateProductDto): Observable<ProductDto | null> {
    return this.http
      .post<ApiResponse<ProductDto>>(this.baseUrl, dto)
      .pipe(map((response) => response.data));
  }

  update(id: number, dto: UpdateProductDto): Observable<void> {
    return this.http
      .put<ApiResponse<object>>(`${this.baseUrl}/${id}`, dto)
      .pipe(map(() => undefined));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<object>>(`${this.baseUrl}/${id}`)
      .pipe(map(() => undefined));
  }
}
