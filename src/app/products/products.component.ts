import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!:Array <any>;

  constructor() { }

  ngOnInit(): void {
    this.products=[
      {id:1,name:'computer',price:6500},
      {id:2,name:'television',price:7500},
      {id:3,name:'smart phonee',price:4500}
    ]
  }

}
