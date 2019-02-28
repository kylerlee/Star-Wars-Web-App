import { Component, OnInit } from '@angular/core';
import { StarwarsService } from '../starwars.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  imageID: string;
  imageURL: string;
  comments: Comment = { url: '', comment: '' };
  private ngNavigatorShareService: NgNavigatorShareService;

  // character: Character = {
  //   name: "",
  //   height: "",
  //   mass: "",
  //   hair_color: "",
  //   skin_color: "",
  //   eye_color: "",
  //   birth_year: "",
  //   gender: "",
  //   homeworld: "",
  //   films: Array<string>(),
  //   species: Array<string>(),
  //   vehicles: Array<string>(),
  //   starships: Array<string>()
  // }

  // starship: Starship = {
  //   name: "",
  //   model: "",
  //   manufacturer: "",
  //   cost_in_credits: "",
  //   length: "",
  //   max_atmosphering_speed: "",
  //   crew: "",
  //   passengers: "",
  //   cargo_capacity: "",
  //   consumables: "",
  //   hyperdrive_rating: "",
  //   MGLT: "",
  //   starship_class: "",
  //   pilots: Array<Character>(),
  //   films: Array<Film>()
  // }

  // species: Species = {
  //   name: "",
  //   classification: "",
  //   designation: "",
  //   average_height: "",
  //   skin_colors: "",
  //   hair_colors: "",
  //   eye_colors: "",
  //   average_lifespan: "",
  //   homeworld: "",
  //   language: "",
  //   people: Array<Character>(),
  //   films: Array<Film>()
  // }

  // film: Film = {
  //   title: "",
  //   episode_id: "",
  //   opening_crawl: "",
  //   director: "",
  //   producer: "",
  //   release_date: "",
  //   characters: Array<Character>(),
  //   planets: Array<Planet>(),
  //   starships: Array<Starship>(),
  //   vehicles: Array<Vehicle>(),
  //   species: Array<Species>()
  // }

  // planet: Planet = {
  //   name: "",
  //   rotation_period: "",
  //   orbital_period: "",
  //   diameter: "",
  //   climate: "",
  //   gravity: "",
  //   terrain: "",
  //   surface_water: "",
  //   population: "",
  //   residents: Array<Character>(),
  //   films: Array<Film>()
  // }

  // vehicle: Vehicle = {
  //   name: "",
  //   model: "",
  //   manufacturer: "",
  //   cost_in_credits: "",
  //   length: "",
  //   max_atmosphering_speed: "",
  //   crew: "",
  //   passengers: "",
  //   cargo_capacity: "",
  //   consumables: "",
  //   vehicle_class: "",
  //   pilots: Array<Character>(),
  //   films: Array<Film>()
  // }

  myList: MyModel[] = [];
  superList: MyArrayModel[] = [];

  constructor(ngNavigatorShareService: NgNavigatorShareService,
    private location: Location,
    private starwarsService: StarwarsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.loadComments(this.activatedRoute.snapshot.params.url);
    this.getCharacterDetails(this.activatedRoute.snapshot.params.url);

  }

  getCharacterDetails(url: string) {
    this.starwarsService.getCharacterDetails(url)
      .then(result => {


        console.info("checkekee: ", result)
        const DATA = result.everything;
        // need to write a method to check what category this url belongs to 


        for (let k of Object.keys(DATA)) {
          if (DATA[k] instanceof Array === false
            && k !== "created"
            && k !== "edited"
            && k !== "url"
            && k !== "homeworld") {
            this.myList.push({
              key: k.replace('_', ' '),
              value: DATA[k]
            })
          }
          else if (k === "homeworld") {
            this.starwarsService.getNameFromURL(DATA[k])
              .then((result) => {
                this.myList.push({
                  key: k.replace('_', ' '),
                  value: result
                })
              })
              .catch(err => console.log(err));


          }
          else if (DATA[k] instanceof Array) {
            let tempArray: Array<string> = []

            for (let url of DATA[k]) {
              this.starwarsService.getNameFromURL(url)
                .then((result) => {
                  tempArray.push(result)
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

        // this.imageID = url.replace(/[^0-9]/g, '');
        // if (url.includes('people'){
        //   this.imageURL = "https://starwars-visualguide.com/assets/img/characters/" + this.imageID + ".jpg";
        // })

        console.log('test array', this.myList);
        console.log('super list', this.superList);

        //   if (url.includes('people')) {

        //     // this.character.name = DATA['name']
        //     // this.character.height = DATA['height']
        //     // this.character.mass = DATA['mass']
        //     // this.character.hair_color = DATA['hair_color']
        //     // this.character.skin_color = DATA['skin_color']
        //     // this.character.eye_color = DATA['eye_color']
        //     // this.character.birth_year = DATA['birth_year']
        //     // this.character.gender = DATA['gender']
        //     // this.character.homeworld = DATA['homeworld']

        //     // for (let myUrl of DATA['films']) {
        //     //   this.starwarsService.getNameFromURL(myUrl)
        //     //     .then((result) => {

        //     //       this.character.films.push(result);
        //     //       console.log(this.character.films);
        //     //     })
        //     //     .catch(error => console.log(error));
        //     // }

        //     // for (let myUrl of DATA['species']) {
        //     //   this.starwarsService.getNameFromURL(myUrl)
        //     //     .then((result) => {

        //     //       this.character.species.push(result);
        //     //       console.log(this.character.species);
        //     //     })
        //     //     .catch(error => console.log(error));
        //     // }

        //     // for (let myUrl of DATA['vehicles']) {
        //     //   this.starwarsService.getNameFromURL(myUrl)
        //     //     .then((result) => {

        //     //       this.character.vehicles.push(result);
        //     //       console.log(this.character.vehicles);
        //     //     })
        //     //     .catch(error => console.log(error));
        //     // }

        //     // for (let myUrl of DATA['starships']) {
        //     //   this.starwarsService.getNameFromURL(myUrl)
        //     //     .then((result) => {

        //     //       this.character.starships.push(result);
        //     //       console.log(this.character.starships);
        //     //     })
        //     //     .catch(error => console.log(error));
        //     // }

        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/characters/" + this.imageID + ".jpg";
        //   }

        //   if (url.includes('starships')) {
        //     this.starship.name = DATA['name'];
        //     this.starship.model = DATA['model'];
        //     this.starship.manufacturer = DATA['manufacturer'];
        //     this.starship.cost_in_credits = DATA['cost_in_credits'];
        //     this.starship.length = DATA['length'];
        //     this.starship.max_atmosphering_speed = DATA['max_atmosphering_speed'];
        //     this.starship.crew = DATA['crew'];
        //     this.starship.passengers = DATA['passengers'];
        //     this.starship.cargo_capacity = DATA['cargo_capacity'];
        //     this.starship.consumables = DATA['consumables'];
        //     this.starship.hyperdrive_rating = DATA['hyperdrive_rating'];
        //     this.starship.MGLT = DATA['MGLT'];
        //     this.starship.starship_class = DATA['starship_class'];
        //     this.starship.pilots = DATA['pilots'];
        //     this.starship.films = DATA['films'];
        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/starships/" + this.imageID + ".jpg";
        //   }

        //   if (url.includes('species')) {
        //     this.species.name = DATA['name'];
        //     this.species.classification = DATA['classification'];
        //     this.species.designation = DATA['designation'];
        //     this.species.average_height = DATA['average_height'];
        //     this.species.skin_colors = DATA['skin_colors'];
        //     this.species.hair_colors = DATA['hair_colors'];
        //     this.species.eye_colors = DATA['eye_colors'];
        //     this.species.average_lifespan = DATA['average_lifespan'];
        //     this.species.homeworld = DATA['homeworld'];
        //     this.species.language = DATA['language'];
        //     this.species.people = DATA['people'];
        //     this.species.films = DATA['films'];
        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/species/" + this.imageID + ".jpg";
        //   }

        //   if (url.includes('films')) {
        //     this.film.title = DATA['title'];
        //     this.film.episode_id = DATA['episode_id'];
        //     this.film.opening_crawl = DATA['opening_crawl'];
        //     this.film.director = DATA['director'];
        //     this.film.producer = DATA['producer'];
        //     this.film.release_date = DATA['release_date'];
        //     this.film.characters = DATA['characters'];
        //     this.film.planets = DATA['planets'];
        //     this.film.starships = DATA['starships'];
        //     this.film.vehicles = DATA['vehicles'];
        //     this.film.species = DATA['species'];
        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/films/" + this.imageID + ".jpg";
        //   }

        //   if (url.includes('planets')) {
        //     this.planet.name = DATA['name'];
        //     this.planet.rotation_period = DATA['rotation_period'];
        //     this.planet.orbital_period = DATA['orbital_period'];
        //     this.planet.diameter = DATA['diameter'];
        //     this.planet.climate = DATA['climate'];
        //     this.planet.gravity = DATA['gravity'];
        //     this.planet.terrain = DATA['terrain'];
        //     this.planet.surface_water = DATA['surface_water'];
        //     this.planet.population = DATA['population'];
        //     this.planet.residents = DATA['residents'];
        //     this.planet.films = DATA['films'];
        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/planets/" + this.imageID + ".jpg";
        //     console.info(this.imageURL);
        //   }

        //   if (url.includes('vehicles')) {
        //     this.vehicle.name = DATA['name'];
        //     this.vehicle.model = DATA['model'];
        //     this.vehicle.manufacturer = DATA['manufacturer'];
        //     this.vehicle.cost_in_credits = DATA['cost_in_credits'];
        //     this.vehicle.length = DATA['length'];
        //     this.vehicle.max_atmosphering_speed = DATA['max_atmosphering_speed'];
        //     this.vehicle.crew = DATA['crew'];
        //     this.vehicle.passengers = DATA['passengers'];
        //     this.vehicle.cargo_capacity = DATA['cargo_capacity'];
        //     this.vehicle.consumables = DATA['consumables'];
        //     this.vehicle.vehicle_class = DATA['vehicle_class'];
        //     this.vehicle.pilots = DATA['pilots'];
        //     this.vehicle.films = DATA['films'];
        //     this.imageID = url.replace(/[^0-9]/g, '');
        //     this.imageURL = "https://starwars-visualguide.com/assets/img/vehicles/" + this.imageID + ".jpg";
        //     console.info(this.imageURL);
        //   }

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
          this.comments = result.filter(x => x.url == url)[0];
          console.info('Filtered comment >> ', this.comments);
        }
      )
      .catch(error => {
        console.error('Error >> ', error);
      })
  }

  addComment(form: NgForm) {
    // const c: Comment = <Comment>form.value;
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
      url: 'https://developers.google.com/web',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }


  back() {
    this.location.back();
  }

}
