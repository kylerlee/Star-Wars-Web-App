import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Comment } from './components/model';
import Dexie from 'dexie';


const URL = 'https://swapi.co/api/';

@Injectable()
export class StarwarsService {
    constructor(private http: HttpClient) {
        this.commentDB = new Dexie('comment');
        this.commentDB.version(1).stores({
            comment: 'url,comment'
        })
    }

    getCatItem(query: string, id: number) {
        console.info('>> query', query);
        const QS = new HttpParams()
            .set('page', id.toString());

        return (
            this.http.get(URL + query, { params: QS })
                .toPromise()
                .then(result => {
                    return ({
                        cList: (<Array<Object>>result['results']).map(x => {
                            return (
                                {
                                    name: x['name'] == null ? x['title'] : x['name'],
                                    url: x['url']
                                });
                        }
                        ),
                        next: result['next'],
                        count: result['count'],
                        previous: result['previous']
                    })
                })
        )
    }

    getCharacterDetails(url: string) {
        console.info('>> url ', url);

        return (
            this.http.get(url)
                .toPromise()
                .then(result => {
                    return ({
                        everything: result
                    })
                })
        )
    }

    getNameFromURL(url: string) {
        return (
            this.http.get(url)
                .toPromise()
                .then(result => {
                    return (result['name'] == null ? result['title'] : result['name']);
                })
        )
    }

    private comments: Comment[] = [];

    onNewComment = new EventEmitter<Comment>();

    commentDB: Dexie;



    addcommentWithPromise(c: Comment): Promise<any> {
        return (
            this.commentDB.table('comment').put(c)
                .then((result) => {
                    this.onNewComment.next(c);
                    return (result);
                })
        )
    }

    getCommentsWithPromise(): Promise<Comment[]> {
        return (this.commentDB.table('comment').toArray());
    }

    AllCategory() {
        return (
            this.http.get(URL).toPromise()
        );
    }

}