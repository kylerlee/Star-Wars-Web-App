import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarwarsService } from '../starwars.service';
import { itemNames } from './model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  itemNames: itemNames[] = []

  constructor(private router: Router, private starwarsService: StarwarsService) { }

  ngOnInit() {
    this.starwarsService.AllCategory()
      .then((result) => {
        for (let k of Object.keys(result)) {
          let m = k == "people" ? "characters" : k
          this.itemNames.push({
            name: m,
            url: result[k]
          });
        }
console.log(this.itemNames);
      })
      .catch((error) => console.log(error));

  }

  selectCat(query: string) {
    this.router.navigate(['/cat', query, '1']);

  }

}
