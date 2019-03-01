import { Component, OnInit, OnDestroy } from '@angular/core';
import { StarwarsService } from '../starwars.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { itemNames } from './model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit, OnDestroy {

  DATA: Array<object> = [];

  currentID: number;
  currentCate: string;

  itemnames: itemNames[];
  categoryTitle: string;
  namessss: string;

  navigationSubscription;
  previosPage: string;
  nxtPage: string;
  count: number;
  paginationNo: string[];

  constructor(private location: Location, private starwarsService: StarwarsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentID = this.activatedRoute.snapshot.params.id;
        this.currentCate = this.activatedRoute.snapshot.params.cat;
        this.getCatItems(this.currentCate, this.currentID)
      }
    });
  }

  ngOnInit() {
    //for displaying the type of category on the sub-header
    if (this.currentCate == 'people')
      this.categoryTitle = 'Character'
    else
      this.categoryTitle = this.currentCate;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getCatItems(query: string, id: number) {
    this.starwarsService.getCatItem(query, id)
      .then(result => {
        console.info(result)

        // to retrieve the links for previous and next page (pagination url)
        this.previosPage = result.previous;
        this.nxtPage = result.next;

        // to retrieve the total count, and no of pages required for this category
        this.count = Math.ceil((result.count) / 10);
        this.paginationNo = [];
        for (var i = 1; i <= this.count; i++) {
          this.paginationNo.push(i.toString());
        }

        // to retrieve the list of items of a particular category
        this.DATA = result.cList;
        console.log(this.DATA);
      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  previousPage() {
    if (this.currentID != 0) {
      this.currentID -= 1
    }
    this.router.navigate(['/cat', this.currentCate, this.currentID]);
  }

  nextPage() {
    if (this.currentID != this.count + 1) {
      this.currentID = +this.currentID + 1;
    }
    this.router.navigate(['/cat', this.currentCate, this.currentID]);
  }

  goToPage(idd: number) {
    this.router.navigate(['/cat', this.currentCate, idd]);
  }

  back() {
    this.router.navigate(['/home']);
  }

  retrieveDetails(url: string) {
    // to change it to 6 different components for routing to each category
    this.router.navigate(['/character/details', url, this.currentID]);
  }

}