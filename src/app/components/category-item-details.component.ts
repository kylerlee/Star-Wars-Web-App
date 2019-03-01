import { Component, OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MyModel, MyArrayModel, Comment } from './model';
import { Location } from '@angular/common';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-item-details',
  templateUrl: './category-item-details.component.html',
  styleUrls: ['./category-item-details.component.css']
})
export class CategoryItemDetailsComponent implements OnInit {

  cat: string;
  id: string;

  imageID: string;
  imageURL: string;
  comments: Comment = { url: '', comment: '' };
  private ngNavigatorShareService: NgNavigatorShareService;

  myList: MyModel[] = [];
  superList: MyArrayModel[] = [];

  navigationSubscription;

  constructor(ngNavigatorShareService: NgNavigatorShareService,
    private location: Location,
    private starwarsService: StarwarsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.ngNavigatorShareService = ngNavigatorShareService;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {

        let url = this.activatedRoute.snapshot.params.url;
        let tempArr = url.split('/').filter(el => el != "");
        this.cat = tempArr[tempArr.length - 2];
        this.id = this.activatedRoute.snapshot.params.id;
        this.loadComments(this.activatedRoute.snapshot.params.url);
        this.getCharacterDetails(this.activatedRoute.snapshot.params.url);
      }
    });
  }

  ngOnInit() {

  }

  getCharacterDetails(url: string) {
    this.starwarsService.getCharacterDetails(url)
      .then(result => {


        const DATA = result.everything;

        for (let k of Object.keys(DATA)) {
          if (DATA[k] instanceof Array === false
            && k !== "created"
            && k !== "edited"
            && k !== "url"
            && k !== "homeworld") {
            this.myList.push({
              key: k.replace('_', ' ').replace('_', ' '),
              value: DATA[k]
            })
          }
          else if (k === "homeworld") {
            this.starwarsService.getNameFromURL(DATA[k])
              .then((result) => {
                this.myList.push({
                  key: k.replace('_', ' ').replace('_', ' '),
                  value: result
                })
              })
              .catch(err => console.log(err));


          }
          else if (DATA[k] instanceof Array) {
            let tempArray: Array<object> = []

            for (let url of DATA[k]) {
              this.starwarsService.getNameFromURL(url)
                .then((result) => {
                  tempArray.push({ name: result, url: url });
                })
                .catch(err => console.log(err));
            }

            this.superList.push({
              key: k,
              value: tempArray
            })
          }

        }

        let tempURL = (url.split('api/')[1]).split('/');
        if (tempURL[0].toLowerCase() === "people") {
          tempURL[0] = "characters";
        }
        this.imageURL = `https://starwars-visualguide.com/assets/img/${tempURL[0]}/${tempURL[1]}.jpg`;
        console.log(this.imageURL);
        console.log('test array', this.myList);
        console.log('super list', this.superList);


      })
      .catch(error => {
        console.error('Error', error);
      })
  }

  private loadComments(url: string) {
    this.starwarsService.getCommentsWithPromise()
      .then(
        (result: Comment[]) => {
          console.info('url------- >> ', url);
          console.info('Comment >> ', result);
          this.comments = result.filter(x => x.url == url).length == 0 ? this.comments : result.filter(x => x.url == url)[0];
          console.info('Filtered comment >> ', this.comments);
        }
      )
      .catch(error => {
        console.error('Error >> ', error);
      })
  }

  addComment(form: NgForm) {
    const c: Comment = {
      url: this.activatedRoute.snapshot.params.url,
      comment: form.value['comment']
    };
    console.info('Processing form >> ', form);

    this.starwarsService.addcommentWithPromise(c)
      .then((result) => {
        console.info('Inserted >> ', result);
        this.comments = c;
        form.resetForm();
      })
      .catch(error => {
        console.error("Error >> ", error);
      })
  }

  share() {
    this.ngNavigatorShareService.share({
      title: 'Star Wars Guide',
      text: 'Check out Star Wars Guide — it rocks!',
      url: 'https://kylerlee.github.io/SA47StarWars' + this.router.url,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }


  back() {
    this.router.navigate(['/cat', this.cat, this.id]);
  }

  changeItem(thisURL: string) {
    this.router.navigate(['/character/details', thisURL, this.id]);

  }

}
