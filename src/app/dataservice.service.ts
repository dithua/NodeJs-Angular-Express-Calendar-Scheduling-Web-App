import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  day: any;
  month: any;
  year: any;
  recordposts: Array<any> = [];
  posts: Array<any> = [];


private behaviorsubjectForDAY = new BehaviorSubject<any>(this.day);
DAY = this.behaviorsubjectForDAY.asObservable();

private behaviorsubjectForYEAR = new BehaviorSubject<any>(this.year);
YEAR = this.behaviorsubjectForYEAR.asObservable();

private behaviorsubjectForMONTH = new BehaviorSubject<any>(this.month);
MONTH = this.behaviorsubjectForMONTH.asObservable();

private behaviorsubjectForRecordPosts = new BehaviorSubject<any>(this.recordposts);
RECORDS = this.behaviorsubjectForRecordPosts.asObservable();

private behaviorsubjectForPosts = new BehaviorSubject<any>(this.posts);
POSTS = this.behaviorsubjectForPosts.asObservable();




  constructor() { }

changeDAY(d: any) {
 this.behaviorsubjectForDAY.next(d);
}
changeYEAR(y: any) {
  this.behaviorsubjectForYEAR.next(y);
 }
 changeMONTH(m: any) {
  this.behaviorsubjectForMONTH.next(m);
 }

changeRecordPosts(rec: any[]) {
  this.behaviorsubjectForRecordPosts.next(rec);
}

changePosts(postsarr: any[]) {
  this.behaviorsubjectForPosts.next(postsarr);
}



}
