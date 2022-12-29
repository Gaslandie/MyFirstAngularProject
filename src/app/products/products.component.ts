import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!:Array <Product>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(private productService:ProductService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control(null)
    });
    this.handleGetAllProducts();
  }
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data)=>{
        this.products=data;
      },
      error:(err)=>{
        this.errorMessage=err;
      }
    });
  }
  HandleDeleteProduct(p:Product){
    let conf=confirm("Are you sure?");
    if(conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }
  handleChangePromotion(p:Product){
    let promo=p.promotion;
    this.productService.changePromotion(p.id).subscribe({
      next:(data)=>{
        p.promotion=!promo;
      },
      error:err=>{
        this.errorMessage=err;
      }
    })
  }
  handlSearchProducts(){
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next:(data)=>{
        this.products=data;
      }
    })
  }

}
