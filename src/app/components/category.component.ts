import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectCat(query: string) {
    this.router.navigate(['/cat', query, '1']);

  }

}
