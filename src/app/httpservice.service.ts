import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,  throwError } from 'rxjs';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})


export class HttpserviceService {


  readonly ROOT_URL = 'http://localhost:3000/';  // URL to web api

  httpOptions = {
    // tslint:disable-next-line:max-line-length
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  posts: any[];
  // newPost: any;
  allposts: any[];





  constructor( private http: HttpClient) {

  }



getPosts() {
  return this.http.get<any[]>(this.ROOT_URL + 'records');

 // .pipe(
  //  catchError(this.handleError('getPosts', []))
 // );
}

// dmy means day month year and they are the selected values that the user
// wants to request to get the records submitted in db for these values
// so we need to send these values from this service to api so it can
// request from db the specific records ...
getRecord(dmy: Post) {

  const d = dmy.currentDay;
  const m = dmy.currentMonth;
  const y = dmy.currentYear;

  return this.http.get<any[]>(this.ROOT_URL + d + '/' + m + '/' + y);
 // .pipe(
  //  catchError(this.handleError('getPosts', []))
  // );
}


/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead


    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


/** PUT: update a date on the server */
update (day: Post, id: any) {
  const dayy = JSON.stringify(day);
// the id needs to be passed here in a way like so this.ROOT_URL + 'records/' + id, so it knows what to update...
  return this.http.put(this.ROOT_URL + 'records/' + id, dayy, this.httpOptions);
}



/** send to api json object so it submit it in db... wrap variables in json and send it */
addActivity (data: Post) {


 const dataa = JSON.stringify(data);
 return this.http.post(this.ROOT_URL + 'records', dataa, this.httpOptions);
}


/** DELETE: delete a date from the server */
deleteActivity (id: any) {

// i have to pass the id that i want to delete here in the path after ROOT_URL ...
  return this.http.delete<any>(this.ROOT_URL + 'records/' + id, this.httpOptions);

}

deleteAllActivitiesForThatDate (d: any, m: any, y: any) {

  // tslint:disable-next-line:max-line-length
  return this.http.delete<any>(this.ROOT_URL + 'records/' + d + '/' + m + '/' + y, this.httpOptions);
}

}
