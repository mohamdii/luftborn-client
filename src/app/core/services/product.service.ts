import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { map, Observable } from 'rxjs';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../models/product.model';
import { environment } from '../../../../environments/enivronment';
import { GenericRepository } from './generic-repository.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService extends GenericRepository<ProductDto> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/product`);
  }
}
