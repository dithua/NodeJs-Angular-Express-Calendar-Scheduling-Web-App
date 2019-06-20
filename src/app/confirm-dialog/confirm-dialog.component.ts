import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MenuViewComponent } from '../menu-view/menu-view.component';
import { HttpserviceService } from '../httpservice.service';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  recordposts: Array<any> = [];
  posts: Array<any> = [];
  dd: any;
  mm: any;
  yy: any;
  key: any; // to render specific pop up confirmation box



  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data, private dataa: DataserviceService, private service: HttpserviceService, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }

  ngOnInit() {
      // tslint:disable-next-line:max-line-length
      this.key = this.data.message[3]; // blepe tin html autou tou component boithaei stin apofasi poiou view na rendarei diladi poio confirmation thelei o xristis na apantisi to 1o h to 2o
      // tslint:disable-next-line:max-line-length
      this.dd = this.data.message[0]; // ektiponetai mesa sto confirmation exei to 'k' to opoio erxetai kai apo to opoio perno tin timi currentday tou stoixeiou pou epelekse o xristis na diagrapsi oste na tou tin ektiposo sto confirmation
      this.mm = this.data.message[1]; // ta idia me to pano
      this.yy = this.data.message[2]; // ta idia me to pano
  }


  deleteActivity() { // k is the id of the activity for deletion
    this.recordposts = this.dataa.recordposts;

    // tslint:disable-next-line:max-line-length
    this.service.deleteActivity(this.data.message[0]).subscribe(res => { this.snackbar.open(res['serversais'], 'Dismiss', {duration: 5000}); this.onNoClick(); });

    // delete instance of deleted activity from activity box after confirmation submitted
    // this.data.message[0] this holds the k which is the id of the activity for deletion
 for (let i = 0; i < this.recordposts.length; ++i) {
  if (this.recordposts[i].id === this.data.message[0]) {
    this.recordposts.splice(i, 1);
  }
}
 this.dataa.changeRecordPosts(this.recordposts); // genika oses klisis lene data.changeRecordκλπ.
 // simenoun oti enimeronoun to observable sto dataservice gia na enimeronontai oi times se ola ta components

  }




  deleteAllActivitiesForThatDate() {
    this.posts = this.dataa.posts;

    // tslint:disable-next-line:max-line-length
    this.service.deleteAllActivitiesForThatDate(this.data.message[0], this.data.message[1], this.data.message[2]).subscribe(res => { this.snackbar.open(res['serversais'], 'Dismiss', {duration: 5000}); this.onNoClick(); });
    // use splice to show to the delete box the deletion after it is completed !
    for (let i = 0; i < this.posts.length; ++i) {
      // tslint:disable-next-line:max-line-length
      if (this.posts[i].currentDay === this.data.message[0] && this.posts[i].currentMonth === this.data.message[1] && this.posts[i].currentYear === this.data.message[2] ) {
          this.posts.splice(i, 1);
      }
    }
    this.recordposts.length = 0;

    this.dataa.changePosts(this.posts);
  }




  onNoClick(): void {
    this.dialogRef.close();
  }






}
