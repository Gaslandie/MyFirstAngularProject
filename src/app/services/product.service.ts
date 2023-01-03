import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product, PageProduct } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private products!:Array<Product>;
  constructor() { 
    this.products=[
      {id:UUID.UUID(),name:'computer',price:6500,promotion:true},
      {id:UUID.UUID(),name:'television',price:7500,promotion:false},
      {id:UUID.UUID(),name:'smart phonee',price:4500,promotion:true}
    ];
    for(let i = 0; i <10;i++){
      this.products.push({id:UUID.UUID(),name:'computer',price:6500,promotion:true}),
      this.products.push({id:UUID.UUID(),name:'television',price:7500,promotion:false}),
      this.products.push({id:UUID.UUID(),name:'smart phonee',price:4500,promotion:true})
    }
  }
  public getAllProducts():Observable<Product[]>{
    let rnd=Math.random();
    if(rnd<0.1) return throwError(()=>new Error('internet is not working'));
    else return of(this.products);
  }

  public getPageProducts(page : number,size : number):Observable<PageProduct>{
    let index=page*size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size==0) totalPages++;
    let pageProducts=this.products.slice(index,index+size);
    return of({page:page,totalPages:totalPages,size:size,products:pageProducts})
  }

  public deleteProduct(id:string):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public changePromotion(id:string):Observable<boolean> {
    let product = this.products.find(p=>p.id==id);
    if(product != undefined){
      product.promotion= !product.promotion;
      return of(true);
    }else return throwError(()=>new Error("Product not found"));
  }
  public searchProducts(keyword:string) : Observable<Product[]>{
    let products = this.products.filter(p=>p.name.includes(keyword));
    return of(products);
  }
}
