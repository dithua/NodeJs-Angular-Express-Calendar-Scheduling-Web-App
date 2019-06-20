import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { DataserviceService } from '../dataservice.service';
import { Post } from '../post'; // it is a component which creates the obj of a post
// tslint:disable-next-line:max-line-length
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatInput, PageEvent, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {
  // these are all the fields in html input fields ... later we'll wrap all these fields into json
  // to send them in database
  activity: any;
  currentMonth: any;
  currentDay: any;
  currentYear: any;
  Scheduled_at: any;
  duration: any;

  currentDayy: any;
  currentMonthh: any;
  currentYearr: any;

  posts: Array<any> = [];
  recordposts: Array<any> = [];
  id: any;
  editACTIVITY: any = null;
  editTIME: any = null;
  editDURATION: any = null;
 // isDisabled = true;
  res: any;
  ischecked: boolean;
  parts: Array<any> = [];
  edit: any;
  editdd: any = null;
  edityy: any = null;
  editmm: any = null;
  activityTRUE = false;
  dayTRUE = false;
  timeTRUE = false;
  durationTRUE = false;
  activities: Array<any> = [];
  myfield = new FormControl(['somevalue', 'somevalue', 'somevalue'], [Validators.minLength(3), Validators.required]);
  // tslint:disable-next-line:max-line-length
  myfield2 = new FormControl({value: '09/08/2019', disabled: false}, [Validators.required, Validators.pattern('^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$')]);
  myfield3 = new FormControl(this.editTIME);
  myfield4 = new FormControl(this.editDURATION);
 // listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Activity', 'Day', 'Time', 'Duration', 'Priority', 'actions'];
  rowId: any;
  // MatPaginator Inputs
  length: any;
  pageSize = 3;
  // MatPaginator Output
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Array<Post>>;
@ViewChild(MatPaginator) paginator: MatPaginator;
  priority: false;
  priorityTRUE = false;
  temp: Array<any> = [];
  currentActivityEndsAt: any;
  currentActivityOfSecondSortEndsAt: any;
  temp2: Array<any> = [];
  recommendedHour: any;
  i: number;
  idd: any;
  rowid: any;
  addduration = 0;
  firstPriorityLinesScheduledAt: any;
  BikeMiaForaIdi = false;
  StartingHourOfNextActivity: any;
  thesiProtouPriorityStoixeiou = 0;
  BikeMiaFora = false;
  temp3: Array<any> = [];
  temp4: Array<any> = [];
  finalHour: any;

  dontAllowEdit = false;
  StartingHourOfNextGreaterThanPrevious: boolean;
  StartingHourOfNextLessThanFinalHourOfPrevious: boolean;
  dontAllowEditTime = false;
  firstprioritysplace: number;
  dontAllowEditDuration = false;
  nextActivityEndsAt: any;
  durationOfNextActivity: any;
  currentActivityStartsAt: any;
  currentActivityOfSecondSortStartsAt: any;
  nextActivityOfSecondSortEndsAt: any;
  StartingHourOfNextActivityOfSecondSort: any;
  startingHourOfPreviousActivity: any;
  endingHourOfPreviousActivity: string;
  temp5: Array<any> = [];
  currentActivityStartsAt2: any;
  startingHourOfPreviousActivity2: any;
  endingHourOfPreviousActivity2: any;
  // dontAllowNextSorting = false;
  thereArePriorities = false;
  countAllDurations = 0;
  previousMinimumHour = '99:99:99';
  HoursAreNotInAscendingOrder = false;









  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private service: HttpserviceService, private data: DataserviceService, public dialog: MatDialog) {
    this.currentDay = data.day;
    this.currentMonth = data.month;
    this.currentYear = data.year;
    this.data.recordposts = this.recordposts;
    this.data.posts = this.posts;
  }

  ngOnInit() {
  //  this.listData = new MatTableDataSource(this.recordposts);

    this.data.DAY.subscribe(currentSelectedCell => this.currentDay = currentSelectedCell);
    this.data.YEAR.subscribe(currentYear => this.currentYear = currentYear);
    this.data.MONTH.subscribe(indexofcurrentmonth => this.currentMonth = indexofcurrentmonth);

    this.currentDayy = this.currentDay;
  this.currentMonthh = this.currentMonth;
  this.currentYearr = this.currentYear;

 // this.refreshEditBoxDynamicallyAfterAdd(this.currentDay, this.currentMonth, this.currentYear);
  this.showActivities();


  }


// get editted input fields' new values...κάθε μέθοδος γίνεται fire από ένα click η change event στην
// html ή μερικές φορές μια μέθοδος που έγινε fire με τον προαναφερθείσα τρόπο μπορεί σε κάποιο της
// σημείο να καλέσει κάποια άλλη από εδώ μέσα για να της φέρει το αποτέλεσμά της...
onChangeAc(event?: any, k?: any) {
  this.editACTIVITY = event.target.value; // παίρνει την τιμή από το field στην html μέσω tou event
  this.activityTRUE = true; // εξηγείται κάπου πιο κάτω
  this.rowid = k.id; // apouhekuo se metabliti to id tis seiras poy o xristis paei na tropopoiisi
  // giati etsi stin html kano elegxo me ena *ngIf="" directive tis angular gia na ektiponei
  // to sfalma error sti sosti grammi tou pinaka tis html kai oxi se oles alla mono se opoia
  // o xristis peirakse...
}
onChangeAt(event?: any, k?: any) {
  this.editTIME = event.target.value;
  this.timeTRUE = true;
  this.rowid = k.id;

  this.dontAllowEditTime = false;


////// an einai checked tote des min sigrouetai me kapoio allo priority os pros ton xrono /////////
if (this.priority || k.priority) {
  if (this.durationTRUE) { // an piraxtike to duration field
    for (let i = 0; i < this.recordposts.length; i++) {
        // tslint:disable-next-line:max-line-length
        if ( k.id !== this.recordposts[i].id && ((this.addMinutes(this.editTIME + ':' + '00', this.editDURATION) > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.recordposts[i].Scheduled_at) || (this.editTIME + ':' + '00' > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration)))) {
          this.dontAllowEditTime = true;
          break;
        }
      }
    } else if (!this.durationTRUE) { // an den piraxtike to duration field paizontai alles times gia ton elegxo
      for (let i = 0; i < this.recordposts.length; i++) {
        // tslint:disable-next-line:max-line-length
        if ( k.id !== this.recordposts[i].id && ((this.addMinutes(this.editTIME + ':' + '00', k.duration) > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.recordposts[i].Scheduled_at) || (this.editTIME + ':' + '00' > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration)))) {
          this.dontAllowEditTime = true;
          break;
        }
      }
    }
  } else if (!this.priority || !k.priority) {
      this.dontAllowEditTime = false;
  }



///////////// an o xristis pirakse tin ora tsekare na min tairiazei
////////////////// me allis drastiriotitas eite einai priority i oxi //////////////////////

// tslint:disable-next-line:max-line-length
// gia to an mia mera exei prin na ginei edit programmatisti me mia idi iparxousa stin idia ora aneksartitou an einai priority i oxi auto apagoreuetai
if (this.timeTRUE) { // an paei na kataxorisi kata to edit ox ristis idi iparxousa ora me alla logia apagorepse to
  for (let i = 0; i < this.recordposts.length; i++) {
    if (this.editTIME + ':' + '00' === this.recordposts[i].Scheduled_at && k.id !== this.recordposts[i].id) {
      this.dontAllowEditTime = true;
    }
  }
}

}
onChangeDur(event?: any, k?: any) {
  this.editDURATION = event.target.value;
  this.durationTRUE = true;
  this.rowid = k.id;


  this.dontAllowEditDuration = false;


////// an einai checked tote des min sigrouetai me kapoio allo priority os pros ton xrono /////////
if (this.priority || k.priority) {
  if (this.timeTRUE) { // an piraxtike to duration field
    for (let i = 0; i < this.recordposts.length; i++) {
        // tslint:disable-next-line:max-line-length
        if ( k.id !== this.recordposts[i].id && ((this.addMinutes(this.editTIME + ':' + '00', this.editDURATION) > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.recordposts[i].Scheduled_at) || (this.editTIME + ':' + '00' > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00' < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration)))) {
          this.dontAllowEditDuration = true;
          break;
        }
      }
    } else if (!this.timeTRUE) { // an den piraxtike to duration field paizontai alles times gia ton elegxo
      for (let i = 0; i < this.recordposts.length; i++) {
        // tslint:disable-next-line:max-line-length
        if ( k.id !== this.recordposts[i].id && ((this.addMinutes(k.Scheduled_at + ':' + '00', this.editDURATION) > this.recordposts[i].Scheduled_at && k.Scheduled_at < this.recordposts[i].Scheduled_at) || (k.Scheduled_at > this.recordposts[i].Scheduled_at && k.Scheduled_at < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration)))) {
          this.dontAllowEditDuration = true;
          break;
        }
      }
    }
  } else if (!this.priority || !k.priority) {
      this.dontAllowEditDuration = false;
  }


}
onChangeDAy(event?: any, k?: any) {
      this.edit = event.target.value;
      this.parts = this.edit.split('/'); // logo tou oti den apothikeusa sti basi se morfi date tin imerominia
      // tora xriastike na afaireso ton xaraktira '/' me ton opoio pou erxetai apo ti basi i imerominia
      // giati ston kodika thelo mono tous arithmous...
      this.editdd = this.parts[0];
      this.editmm = this.parts[1];
      this.edityy = this.parts[2];

      this.dayTRUE = true;
      this.rowid = k.id;
}
onChangeCheck(event?: any, k?: any) {
  this.dontAllowEdit = false;
  this.dontAllowEditTime = false;
  this.priority = event.checked;
  this.priorityTRUE = true;

  this.rowid = k.id;
////////////// gia otan einai checked sigrinetai me osa priority exei i basi os eksis /////////////////////////////////


// tslint:disable-next-line:max-line-length
if (event.checked) { // an einai checked vres ola ta alla priorities kai kane elegxo an to neo priority ksekina mesa sti diarkeia enos allou an exoun idia ora i an to neo teleionei meta tin enarksi enos idi iparxontos eno ksekina noritera
  for (let i = 0; i < this.recordposts.length; i++) {


 if (this.recordposts[i].id !== k.id) {
    // tslint:disable-next-line:max-line-length
    if (this.recordposts[i].priority === 1) {
      if (this.timeTRUE) {
        // tslint:disable-next-line:max-line-length
        if (this.editTIME + ':' + '00'  === this.recordposts[i].Scheduled_at || (this.addMinutes(this.editTIME + ':' + '00' , k.duration) > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00'  < this.recordposts[i].Scheduled_at) || (this.editTIME + ':' + '00'  > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00'  < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration))) {
         this.dontAllowEdit = true;
          break;
        }
      } else if (this.durationTRUE) {
        // tslint:disable-next-line:max-line-length
        if (k.Scheduled_at === this.recordposts[i].Scheduled_at || (this.addMinutes(k.Scheduled_at, this.editDURATION) > this.recordposts[i].Scheduled_at && k.Scheduled_at < this.recordposts[i].Scheduled_at) || (k.Scheduled_at > this.recordposts[i].Scheduled_at && k.Scheduled_at < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration))) {
          this.dontAllowEdit = true;
           break;
         }

      } else if (this.timeTRUE && this.durationTRUE) {
        // tslint:disable-next-line:max-line-length
        if (this.editTIME + ':' + '00'  === this.recordposts[i].Scheduled_at || (this.addMinutes(this.editTIME + ':' + '00' , this.editDURATION) > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00'  < this.recordposts[i].Scheduled_at) || (this.editTIME + ':' + '00'  > this.recordposts[i].Scheduled_at && this.editTIME + ':' + '00'  < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration))) {
          this.dontAllowEdit = true;
           break;
         }
      } else if (!this.timeTRUE || !this.durationTRUE || !(this.timeTRUE && this.durationTRUE)) {
        // tslint:disable-next-line:max-line-length
        if (k.Scheduled_at  === this.recordposts[i].Scheduled_at || (this.addMinutes(k.Scheduled_at , k.duration) > this.recordposts[i].Scheduled_at && k.Scheduled_at  < this.recordposts[i].Scheduled_at) || (k.Scheduled_at > this.recordposts[i].Scheduled_at && k.Scheduled_at < this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration))) {
          this.dontAllowEdit = true;
           break;
         }
      }
    }
    ////////// gia otan einai checked kai sigrinetai me osa exei i basi kai den einai priority ////////////////////



// tslint:disable-next-line:max-line-length
    if (this.recordposts[i].priority === 0) { // to mono pou mas endiaferei an einai checked xoris na sigrinetai me priorities einai to na min einai programmatismena 2 activities gia tin idia ora
    if (this.timeTRUE) {
      // tslint:disable-next-line:max-line-length
      if (this.editTIME + ':' + '00'  === this.recordposts[i].Scheduled_at) {
       this.dontAllowEditTime = true;
        break;
      }
    } else if (this.durationTRUE) {
      // tslint:disable-next-line:max-line-length
      if (k.Scheduled_at === this.recordposts[i].Scheduled_at) {
        this.dontAllowEditTime = true;
         break;
       }

    } else if (this.timeTRUE && this.durationTRUE) {
      // tslint:disable-next-line:max-line-length
      if (this.editTIME + ':' + '00'  === this.recordposts[i].Scheduled_at) {
        this.dontAllowEditTime = true;
         break;
       }
    } else if (!this.timeTRUE || !this.durationTRUE || !(this.timeTRUE && this.durationTRUE)) {
      // tslint:disable-next-line:max-line-length
      if (k.Scheduled_at  === this.recordposts[i].Scheduled_at) {
        this.dontAllowEditTime = true;
         break;
       }
    }

  }



  }

  }
}

///////////////// gia otan den einai checked kai sigrinetai me ta panta priority kai mi ///////////
if (this.timeTRUE) {
 // if (this.dontAllowEditTime === true) { // an den einai checked elegkse mono na min iparxei i ora idi
  // tslint:disable-next-line:max-line-length
  for (let i = 0; i < this.recordposts.length; i++) { // an den einai checked to priority den mas niazei to time confliction tha ta kanei sort pros ta pano o pinakas
  // tslint:disable-next-line:max-line-length
  if (!event.checked && (this.editTIME + ':' + '00') !== this.recordposts[i].Scheduled_at && k.id !== this.recordposts[i].id) { // && k.id !== this.recordposts[i].id gia na min berdeuetai me ton eauto tou kathos psaxnei
    this.dontAllowEditTime = false;
    this.dontAllowEditDuration = false;
    break;
  // tslint:disable-next-line:max-line-length
  } else if (!event.checked && (this.editTIME + ':' + '00') === this.recordposts[i].Scheduled_at && k.id !== this.recordposts[i].id) {
    this.dontAllowEditTime = true; break; }
}
}
if (!this.timeTRUE) {
for (let i = 0; i < this.recordposts.length; i++) {
  if (!event.checked && !this.timeTRUE && k.Scheduled_at !== this.recordposts[i].Scheduled_at && k.id !== this.recordposts[i].id) {
    this.dontAllowEditTime = false;
    this.dontAllowEditDuration = false;
    break;
  } else if (!event.checked && !this.timeTRUE && k.Scheduled_at === this.recordposts[i].Scheduled_at && k.id !== this.recordposts[i].id) {
    this.dontAllowEditTime = true; break;
  }
}
 }
}

  // tslint:disable-next-line:max-line-length
  update(k?: any) { // k is a json with the editted row and it is coming from the html
// διατρέχεται ο πίνακας και για κάθε του στοιχείο γίνεται έλεγχος και αν το id που τροποποίησε ο χρήστης
// ταιριάζει με το id στοιχείου του πίνακα (αφού πίνακας και πίνακας στην html επικοινωνούν και έχουν την ίδια σειρά μιας που αυτός εδώ ο
// πίνακς διαβάζεται και γίνεται render στην συνέχεια από την html) ΚΑΙ το τσεκ activityΤrue (που
// δηλώνει το ότι ο χρήστης ενεργοποίησε και τροποποίησε το input field για μια χ activity...
// η τιμή της activityΤrue ενεργοποιείται στην onChange()) είναι true
// ΤΟΤΕ βάλε στις μεταβλητές τα στοιχεία του πίνακα που παραμένουν ίδια έχε και από την onChange()
// τη νέα τιμή που έρχεται μετά την τροποποίηση του πεδίου που τροποποίησε κάντα ένα ενιαίο obj
// τύπου post και στείλτα για update στη βάση...
    for (let i = 0; i < this.recordposts.length; i++) {
      if ( k.id === this.recordposts[i].id && this.activityTRUE === true) {
        this.editmm = this.recordposts[i].currentMonth;
        this.editdd = this.recordposts[i].currentDay;
        this.edityy = this.recordposts[i].currentYear;
        this.editTIME = this.recordposts[i].Scheduled_at;
        this.editDURATION = this.recordposts[i].duration;
        this.priority = this.recordposts[i].priority;
      }
      if (k.id === this.recordposts[i].id && this.timeTRUE === true ) {
        this.editmm = this.recordposts[i].currentMonth;
        this.editdd = this.recordposts[i].currentDay;
        this.edityy = this.recordposts[i].currentYear;
        this.editACTIVITY = this.recordposts[i].activity;
        this.editDURATION = this.recordposts[i].duration;
        this.priority = this.recordposts[i].priority;
      }
      if (k.id === this.recordposts[i].id && this.durationTRUE === true) {
        this.editmm = this.recordposts[i].currentMonth;
        this.editdd = this.recordposts[i].currentDay;
        this.edityy = this.recordposts[i].currentYear;
        this.editACTIVITY = this.recordposts[i].activity;
        this.editTIME = this.recordposts[i].Scheduled_at;
        this.priority = this.recordposts[i].priority;
      }
      if (k.id === this.recordposts[i].id && this.dayTRUE === true ) {
        this.editDURATION = this.recordposts[i].duration;
        this.editACTIVITY = this.recordposts[i].activity;
        this.editTIME = this.recordposts[i].Scheduled_at;
        this.priority = this.recordposts[i].priority;
      }
      if (k.id === this.recordposts[i].id && this.priorityTRUE === true) {
        this.editACTIVITY = this.recordposts[i].activity;
        this.editmm = this.recordposts[i].currentMonth;
        this.editdd = this.recordposts[i].currentDay;
        this.edityy = this.recordposts[i].currentYear;
        this.editTIME = this.recordposts[i].Scheduled_at;
        this.editDURATION = this.recordposts[i].duration;
      }
  }
    const Data: Post = {
      activity: this.editACTIVITY,
      // tslint:disable-next-line:max-line-length
      currentMonth: Number(this.editmm), // gotten from the incoming json the Number() in front is written so it converts the string value of the variable back to a number type
      // tslint:disable-next-line:max-line-length
      currentDay: Number(this.editdd), // gets the day from the incoming string of this form "d/m/y" because the input's field value is of type string...
      currentYear: Number(this.edityy),
      Scheduled_at: this.editTIME,
      duration: this.editDURATION,
      priority: this.priority
    };


// k.id is the incoming id value from the html για να γίνει update το σωστό record στη βάση...
      this.service.update(Data, k.id).subscribe(res => this.snackbar.open(res['serversais'], 'Dismiss', {duration: 5000}));

this.editACTIVITY = null;
this.editDURATION = null;
this.editTIME = null;
this.editdd = null;
this.editmm = null;
this.edityy = null;

  this.priority = false;
  this.priorityTRUE = false;

  this.activityTRUE = false;
  this.dayTRUE = false;
  this.timeTRUE = false;
  this.durationTRUE = false;

  }



  showActivitiesForSelectedDay(d?: any[]): void {
// το d έρχεται από το select της html...
    this.currentDayy = d['currentDay'];
    this.currentMonthh = d['currentMonth'];
    this.currentYearr = d['currentYear'];
// Γίνεται obj τύπου Post
    const Data: Post = {
      activity: this.activity,
      currentMonth: this.currentMonthh,
      currentDay: this.currentDayy,
      currentYear: this.currentYearr,
      Scheduled_at: this.Scheduled_at,
      duration: this.duration,
      priority: this.priority
    };
// περνάται με ασύγχρονο τρόπο μέσα στο service τύπου httpService ένα sercice/typescript αρχείο
// το οποίο κάνει import ton HttpClient για να γίνει η get method στο api
// τα αποτελέσματα έρχονται μέσω της subscribe που κάναμε στο observable που
// επιστρέφει η μέθοδος getRecord() του
// service μας (αυτή επιστρέφει ένα observable γιατί στο σώμα της κάνει
// http.get() που είναι μια μέθοδος του httpClient module και επιστρέφει observable
// άρα και η δική μας η getRecord που το υλοποιεί θα πρέπει να φέρνει πίσω
// ένα observable ... το observable αυτό είναι η απάντηση του httpClient με δυο λόγια
// αυτός επιστρέφει μόνο observables)
// εδώ η subscribe λειτουργεί με τη λογική που κάνουμε subscribe σε οποιαδήποτε υπηρεσία
// ακόμα και στο youtube ... κάθε φορά που θα γίνεται αλλαγή στη βάση θα ειδοποιεί την callback
// function που παίρνει να φέρνει το response του server και να το αποθηκεύει αν το response
// δεν είναι error στον πίνακα recordposts...
      this.service.getRecord(Data).subscribe((respons: any[]) => {

        this.recordposts = respons;


      });

}






sortTable(event?: any) {
  this.HoursAreNotInAscendingOrder = false;
  this.previousMinimumHour = '99:99:99';
  this.thereArePriorities = false;
  this.length = this.recordposts.length; // gia to length tou paginator...
  this.countAllDurations = 0;
  this.BikeMiaForaIdi = false; // βοηθάει σε έλεγχο σε for και if συνθήκες ... εξηγούνται στην γραμμή τους
this.idd = null; // εξηγείται στων κώδικα πιο κάτω η χρησιμότητά του...
this.recommendedHour = null; // εξηγείται στον κώδικα πιο κάτω
this.firstPriorityLinesScheduledAt = null; // εξηγείται στον κώδικα πιο κάτω
this.addduration = 0;
this.BikeMiaFora = false;
this.thesiProtouPriorityStoixeiou = 0;
this.temp.length = 0;
this.temp2.length = 0;
this.temp3.length = 0;
/////////////////////////// To sorting arxizei edo /////////////////////////

// εδώ γίνεται sort ο πίνακας με όλα τα αποτελέσματα που βρέθηκαν καταχωρημένα για μια συγκεκριμένη μέρα
// με βάση την ώρα αρχικά ... στη συνέχεια θα γίνει sorting αν χρειαστεί βέβαια με βάση άλλους
// παράγοντες που αναφέρονται παρακάτω όπως πχ το αν μια δραστηριότητα ξεπερνάει σε χρόνο λόγω μεγάλης
// διάρκειας την ώρα έναρξης της επόμενής της κλπ
for (let i = 0; i < this.recordposts.length; i++) {
  this.recordposts.sort((a, b) => (a.Scheduled_at > b.Scheduled_at) ? 1 : -1);

}

    for (let i = 0; i < this.recordposts.length; i++) {


        if (this.recordposts[i].priority === 1 && this.BikeMiaForaIdi === false) {
          // η firstPriorityLinesScheduledAt αποθηκεύει την τιμή της ώρας της πρώτης priority
          // δραστηριότητας που εντοπίζεται στον πίνακα αφού έχει ο πίνακας γίνει sort
          this.firstPriorityLinesScheduledAt = this.recordposts[i].Scheduled_at;
          this.BikeMiaForaIdi = true; // κάνει τσεκ ώστε μόλις εντοπιστεί η 1η μόνο priority
          // δραστηριότητα στον πίνακα την οποία και μόνο θέλουμε να μην ξαναψάξει για άλλη...

        }

      this.currentActivityEndsAt = this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration);
      this.StartingHourOfNextActivity = this.recordposts[i + 1] && this.recordposts[i + 1].Scheduled_at;

// tslint:disable-next-line: max-line-length
        if ((this.currentActivityEndsAt > this.StartingHourOfNextActivity)) {
// αν ισχύει αυτό τότε δύο φάσεις ταξινομήσεων παίζονται ανάλογα με τη συνθήκη
// ένα πέρασμα του αλγόριθμου από πάνω προς τα κάτω ή από κάτω προς τα πάνω ανάλογα με το πως θα
// γίνει το time confliction...

// σε περίπτωση που το μέγεθος του πίνακα είναι 2 τότε για να αποφευχθούν
// σφάλματα τύπου undefined λόγω του ότι στο for loop εμφανίζεται δείκτης πίνακα -1
// που φέρει ως αποτέλεσμα το πάγωμα του κώδικα πάρθηκαν ειδικές περιπτώσεις ταξινόμησης για τέτοιες
// περιπτώσεις πίνακα...
// σε αυτήν την περίπτωση έχουμε έναν πίνακα 2 στοιχείων όπου το πρώτο ξεπερνά την ώρα έναρξης
// του δεύτερου τότε για να προτείνουμε την νέα ώρα έναρξης αφού το confict στοιχείο είναι ήδη στην
// κορυφή του πίνακα δεν χρειάζεται να κάνουμε κάποια κατάταξη παρά μόνο μια αφαίρεση της ώρας που ξεκινά
// το 2ο με τα λεπτά που κρατά το 1ο
if ((this.currentActivityEndsAt > this.StartingHourOfNextActivity) && i === 0) {
  if (this.recordposts.length === 2) {
   this.recommendedHour = this.SubtractMinutes(this.recordposts[1].Scheduled_at, this.recordposts[0].duration);
  break;

  } else {

// αλλιώς ταξινόμησε ότι πρέπει από κάτω προς τα πάνω... Ο λόγος που γίνεται από πάνω προς τα κάτω
// και κάτω προς τα πάνω ταξινόμηση είναι γιατί μπορεί ναι μεν να γίνεται confliction μια ώρα
// σε μια θέση στον πίνακα χ με μια άλλη ώρα μιας άλλης δραστηριότητας στη θέση χ+1
// αλλά υπάρχει και η περίπτωση η ώρα στη θέση χ να συγκρούεται με την ώρα της δραστηριότητας στη θέση
// χ-1, σε τέτοια περίπτωση αν δεν είχε συμπεριληφθεί η ανάποδη αξινόμηση ο κώδικας δεν μπορούσε να συγκρίνει
// τις τιμές και η εφαρμογή κράσαρε... Το confliction στην ανάποδη περίπτωση περιγράφεται μέσα στη συνθήκη if
// που ακολουθεί και είναι ο ίδιος έλεγχος με την κανονική περίπτωση ελέγχου την από πάνω προς τα κάτω...
  for (let f = this.recordposts.length - 1; f > 0; f--) {

    this.currentActivityStartsAt = this.recordposts[f].Scheduled_at;
    this.startingHourOfPreviousActivity = this.recordposts[f - 1].Scheduled_at;
    this.endingHourOfPreviousActivity = this.addMinutes(this.recordposts[f - 1].Scheduled_at, this.recordposts[f - 1].duration);
    // εδώ υλοποιείται ο αλγόριθμος της φυσαλίδας για την από κάτω προς τα πάνω περίπτωση...
    // tslint:disable-next-line:max-line-length
    if (this.currentActivityStartsAt > this.startingHourOfPreviousActivity && this.currentActivityStartsAt < this.endingHourOfPreviousActivity + ':' + '00') {
      this.temp5[0] = this.recordposts[f];
      this.recordposts[f] = this.recordposts[f - 1];
      this.recordposts[f - 1] = this.temp5[0];

    } // εδώ ξανα υλοποιείται ο αλγόριθμος για να γίνει πάλι ο έλεγχος για όλα τα στοιχεία μέχρι την κορυφή του πίνακα
    // ξεκινώντας από τη θέση πλέον όπου βρέθηκε ένα confliction και προς τα πάνω...
    for (let y = f - 1; y > 0; y--) {
        this.currentActivityStartsAt2 = this.recordposts[y].Scheduled_at;
        this.startingHourOfPreviousActivity2 = this.recordposts[y - 1].Scheduled_at;
        this.endingHourOfPreviousActivity2 = this.addMinutes(this.recordposts[y - 1].Scheduled_at, this.recordposts[y - 1].duration);

      // tslint:disable-next-line:max-line-length
    if (this.currentActivityStartsAt2 > this.startingHourOfPreviousActivity2 && this.currentActivityStartsAt < this.endingHourOfPreviousActivity2 + ':' + '00') {

        this.temp5[0] = this.recordposts[y];
        this.recordposts[y] = this.recordposts[y - 1];
        this.recordposts[y - 1] = this.temp5[0];
      }
    }

}
break; // σπάσε την από κάτω προς τα πάνω ταξινόμηση
}
}

// κι εδώ ξεκίνα τον από πάνω προς τα κάτω έλεγχο ταξινόμησης... ο οποίος θα εκτελεστεί αν βρεθεί confliction κι ας
// ταξινομήθηκαν με τον από κάτω προς τα πάνω προηγουμένως... αυτό γίνεται γιατί ο προηγούμενος έλεγχος δεν βρίσκει
// τα confliction που θα βρει ο ακόλουθως το ίδιο ισχύει και για τον ακόλουθο όμως... Το for loop του παρακάτω
// βρίσκεται στην αρχή-αρχή πριν τον προηγούμενο αλγόριθμο, απλά ο προηγούμενος ήταν παρεβρισκόμενος ως προέλεγχος εντός
// του for loop του επόμενου παρακάτω...
          this.temp[0] = this.recordposts[i];
          this.recordposts[i] = this.recordposts[i - 1];
          this.recordposts[i - 1] = this.temp[0];
        } // από κάτω γίνεται η φυσαλίδα για να συγκριθεί η activity στη θέση που βρέθηκε ακριβώς από πάνω
        // με όσες άλλες βρίσκονται από κάτω της κάθε φορά που εκείνη μετατοπίζεται μία θέση
        // πιο πάνω γιατί μπορεί να ξαναχρειαστεί να πάει κι άλλη θέση πιο πάνω αν εξακολουθεί να
        // ξεπερνά η διάρκειά της την ώρα έναρξης της επόμενής της γι' αυτό η αρίθμηση στο από κάτω
        // for ξεκινάει από y= i - 1...
          for (let y = i - 1; y > 0; y--) {
            this.currentActivityOfSecondSortEndsAt = this.addMinutes(this.recordposts[y].Scheduled_at, this.recordposts[y].duration);
            this.StartingHourOfNextActivityOfSecondSort = this.recordposts[y + 1].Scheduled_at;
// οι έλεγχοι έχουν την κλασική συνθήκη ελέγχου μέσα τους... Τα ονόματα των μεταβλητών βοηθούν στην κατανόηση της σύγκρισης...
            if ((this.currentActivityOfSecondSortEndsAt > this.StartingHourOfNextActivityOfSecondSort)) {
              this.temp2[0] = this.recordposts[y];
              this.recordposts[y] = this.recordposts[y - 1];
              this.recordposts[y - 1] = this.temp2[0];
              this.addduration = this.addduration + this.recordposts[y].duration;
              this.addduration = this.addduration + this.recordposts[y - 1].duration;

              // στην recommendedHour αποθηκεύεται η τιμή που παράγεται από την αφαίρεση
              // της ώρας έναρξης της πρώτη priority δραστηριότητας που εντοπίζεται στον πίνακα μείον
              // το άθροισμα των διαρκειών όλων των από πάνω από την priority δραστηριοτήτων
              // έτσι βρίσκουμε την ώρα  που ο χρήστης πρέπει να ξεκινήσει την μέρα του μιας που δραστηριότητες
              // προγραμματισμένες για άλλες ώρες έχουν τοποθετηθεί πάνω από ήδη πρωινές ίσως δραστηριότητες
              this.recommendedHour = this.SubtractMinutes(this.firstPriorityLinesScheduledAt, this.addduration);

              this.addduration = 0; // προσθέτει όλες τις διάρκειες των δραστηριοτήτων πριν το πρώτο
              // priority του πίνακα...

            }

          }
        }
        // *** εδώ ξεκινά άλλο ένα sorting μόνο στα στοιχεία του πίνακα πάνω από το 1o priority
        // ώστε να ταξινομηθούν με βάση την ώρα (αύξουσα σειρά) γιατί όσες μετατοπίστηκαν θέλω να
        // γίνουν όσο πιο κοντά στην ώρα τους γίνεται γιατί θα πρέπει όλες να γίνονται ή στην πραγματική τους ώρα
        // ή αν μετατοπιστούν θα πρέπει να γίνουν νωρίτερα αλλά και πάλι αυτές που είναι νωρίς πρώτες από άλλες...

        // βρες τώρα και τι θέση του 1ου priority ΠΡΟΣΟΧΗ πριν βρίκαμε την ώρα έναρξης του 1ου priority τώρα βρίσκουμε τη θέση
for (let i = 0; i < this.recordposts.length; i++) {
  if (this.recordposts[i].priority === 1 && this.BikeMiaFora === false) {
    this.BikeMiaFora = true;
    this.thesiProtouPriorityStoixeiou = i;
    break;
  }
}

// και υλοποίησε ότι λέει το σχόλιο πιο πάνω... το σχόλιο αυτό ξεκινά με ***
for (let i = 0; i < this.thesiProtouPriorityStoixeiou - 1; i++) {
  if (this.recordposts[i].Scheduled_at > this.recordposts[i + 1].Scheduled_at) {
    this.temp3[0] = this.recordposts[i];
    this.recordposts[i] = this.recordposts[i + 1];
    this.recordposts[i + 1] = this.temp3[0];
// εννοείται ότι πρέπει να προσθέτουμε κάθε φορά σε κάθε loop που βρισκόμαστε τη διάρκεια για να αφαιρέσουμε στο τέλος το άθροισμα
// που θα βρεθεί από την ώρα έναρξης της 1ης priority...
if (this.addduration === 0) {
  this.addduration = this.addduration + this.recordposts[i].duration;
  this.addduration = this.addduration + this.recordposts[i + 1].duration;
  this.recommendedHour = this.SubtractMinutes(this.firstPriorityLinesScheduledAt, this.addduration);

  this.addduration = 0; // προσθέτει όλες τις διάρκειες των δραστηριοτήτων πριν το πρώτο
  // priority του πίνακα...
}

    this.idd = this.recordposts[0].id; // σε αυτή τη μεταβλητή βάζω το id του μηδενικού
    // στοιχείου του πίνακα ώστε όταν στην html χρησιμοποιώ το directive ngIf για να
    // συγκρίνω το id του κάθε row στο template με αυτό στον πίνακα που έρχεται από τη βάση
    // να ταυτίζονται και άρα να μου εκτυπώνει την νέα προτεινόμενη ώρα και στο template
    // μόνο στο πρώτο στοιχείο του edit box στο template...
    // παίρνει την τιμή του id που έχει το πρώτο πάντα στη σειρά activity του πίνακα...

  }
}
// είναι για όταν ο πίνακας διαμορφώνεται έτσι ώστε στη θέση 1 του πίνακα να έχουμε priority
// (και στη θέση 0 να μην έχουμε) τότε ο τρόπος που υπολογίζεται η συνιστώμενη ώρα αλλάζει διότι
// έχουμε να αφαιρέσουμε μόνο μία διάρκεια αυτή του μόνου και μοναδικού activity στη θέση 0 πάνω από το 1ο
// priority που βρίσκεται στη θέση 1 άρα αφαιρούμε τη διάρκεια του activity στη θέση 0 από την ώρα έναρξης του 1ου priority
// που βρίσκεται στη θέση 1 του πίνακα

// αν δεν έβαζα τη συνθήκη if λοιπόν που ακολουθεί δεν θα ρένταρε τον πίνακα που θα είχε 1 μόνο αποτέλεσμα...

// tslint:disable-next-line:max-line-length
if (this.recordposts.length >= 2 && this.recordposts[1].priority === 1 && this.recordposts[0].priority === 0) {

  // tslint:disable-next-line:max-line-length
  if (this.addMinutes(this.recordposts[0].Scheduled_at, this.recordposts[0].duration) > this.recordposts[1].Scheduled_at || this.recordposts[0].Scheduled_at > this.recordposts[1].Scheduled_at) {
// τότε πρόσθεσε τη διάρκεια της μιας και μοναδικής activity πάνω από το priority στη θέση 0 του πίνακα
// ώστε να βρεις τη νέα συνιστώμενη ώρα έναρξης...

  this.addduration = this.addduration + this.recordposts[0].duration;
  this.recommendedHour = this.SubtractMinutes(this.recordposts[1].Scheduled_at, this.addduration);
  // εμφάνισε τη συνιστώμενη ώρα μόνο στο πρώτο row του πίνακα...
  // το πρώτο στοιχείο του πίνακα έχει ένα id βρες το στον πίνακα μετά στην html
  // που θα πρέπει να είναι και εκεί το πρώτο στοιχείο οπότε ταύτισέ τα ταίριαξέ τα
  // και εκτίποσε μόνο στη row που αντιστοιχεί στο κοινό id τη συνιστώμενη ώρα...

  this.idd = this.recordposts[0].id;
  this.addduration = 0; // προσθέτει όλες τις διάρκειες των δραστηριοτήτων πριν το πρώτο
  // priority του πίνακα...
}

}
for (let i = this.recordposts.length - 1; i > 0; i--) {
  // αν οι ώρες μέσα στον πίνακα εντοπιστούν να είναι σε αύξουσα σειρά σημαίνει ότι ο πίνακας δεν πειράχτηκε από κάποιο
  // είδος ταξινόμησης γιατί προφανώς δεν χρειάστηκε... και άρα αφού δεν έγινε κάποιο sorting μην
  // εκτυπώσεις προτεινόμενη ώρα στον παρακάτω κώδικα, ο οποίος αναφέρεται στην περίπτωση πρότασης προτεινόμενης ώρας
  // σε περίπτωση που δεν βρει κάποιο priority...

  if (this.recordposts[i - 1].Scheduled_at > this.recordposts[i].Scheduled_at) { // έλεγχος αν όντως οι ώρες είναι σε αύξουσα σειρά...
    this.HoursAreNotInAscendingOrder = true;
    break;
  }
}
// διατρέχει τον πίνακα και αν τον βρει χωρίς κανένα priority τότε για να προτείνει ώρα
// θα πρέπει να βρει την μικρότερη ώρα και να προτείνει αυτήν για νέα ώρα έναρξης της μέρας...
for (let i = 0; i < this.recordposts.length; i++) {

  if (this.recordposts[i].priority === 1) {
    this.thereArePriorities = true;

  }
  if (this.recordposts[i].Scheduled_at < this.previousMinimumHour && this.recordposts.length > 1 && this.HoursAreNotInAscendingOrder) {
    this.previousMinimumHour = this.recordposts[i].Scheduled_at;

  }
}
if (this.thereArePriorities !== true && this.recordposts.length > 1 && this.HoursAreNotInAscendingOrder) {
  this.recommendedHour = this.previousMinimumHour;
  this.idd = this.recordposts[0].id;
}




      this.dataSource = new MatTableDataSource(this.recordposts); // apo edo diabazei o table stin html mesa
      this.dataSource.paginator = this.paginator; // ο paginator θέλει μεταβλητή τύπου matTableDataSource μόνο
    }


// tslint:disable-next-line:max-line-length
addMinutes(time, minsToAdd) { // h 'time' parametros krata tin timi tis oras mias δραστηριοτητας kai to minsToAdd tin timi tis diarkeias tis idias activity
  // tslint:disable-next-line:max-line-length
  const AddedTime = new Date(new Date('1970/01/01 ' + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
  return AddedTime; // to 60000 einai milisecond 60sec=1min 1sec=1000milisec 60sec=60000milisec
  // ara 1min=60000milisec ... h getTime() ferni piso se lepta tin ora prostheto kai ta dika mou
  // ipologismena lepta kai meta apo ti methodo ton trion polaplasiazo me 60000 kai brisko posa
  // milisec exoun ola ta lepta pou thelo giati meta h toLocaleTimeString() thelei milisec gia na ftiaksei tin teliki ora
  // stin Date() i imerominia '1970/01/01' exei oristei etsi giati apo tote arxizei na metra milisec
  // h Date()...
}

SubtractMinutes(time, minsToSubtract) { // edo h 'time' krata tin timi tis oras tis protis priority δραστηριοτητας pou vrethike ston pinaka
// kai h 'minsToSubtract' ta lepta pou kratan sinolika oles oi proigoumenes apo tin proti priority drastiriotites
// molis ginei auti i afairesi tha gnorizoume tin sinistomeni apo tin efarmogi ora enarksis tou kathimerinou mas programmatos
  // tslint:disable-next-line:max-line-length
  const SubtractedTime = new Date(new Date('1970/01/01 ' + time).getTime() - minsToSubtract * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
  return SubtractedTime;
}


  showActivities(event?: any): void {

    this.service.getPosts().subscribe((resp: any[]) => {
      this.posts = resp;
      });
  }


  deleteAct(k: any) { // k is the id of the activity for deletion this is a confirmation method

    this.openConfirmDialog(k);
    // tslint:disable-next-line:max-line-length
    this.data.changeRecordPosts(this.recordposts); // edo enimeronoume to BehaviorSubject Object pou orisame na einai os observable sto dataservice (to dataservice einai apla mia klasi typescript se ena ksexoristo arxeio)
    this.data.recordposts = this.recordposts;
    this.data.RECORDS.subscribe(recordposts => { this.recordposts = recordposts; this.length = this.recordposts.length; });
  // kai telos kanoume subscribe sto parapano observable pou vrisketai sto arxeio dataservice
  // oste kathe fora pou enimeronetai na mas enimeronei kai edo se auto to component
  // etsi ginetai kai i epikoinonia dio teleios ksenon metaksi tous components meso ton observables
  // sta opoia kanoume subscribe...
  }




  deleteAllAct(dd: any, mm: any, yy: any) { // k is the id of the activity for deletion
// stin deleteAct akrivos apo pano exo tin idia logiki tin opoia eksigo ekei analitika...
  this.openSecondConfirmDialog(dd, mm, yy);
  this.data.changePosts(this.posts);
  this.data.posts = this.posts;
  this.data.POSTS.subscribe(posts => this.posts = posts);
  }






  openConfirmDialog(k: any) { // to delete one specific activity from the box
    this.dialog.open(ConfirmDialogComponent, { // open the component confirmdialogcomponent inside an angular material dialog popup
      width: '300px',
      // tslint:disable-next-line:max-line-length
      panelClass: 'confirm-dialog-container', // orizei mia geniki css klasi giati exo sto geniko arxeio styles.css pou to blepei olos o kodikas extra css styling gia autin tin klasi edo
      // tslint:disable-next-line:max-line-length
      disableClose: true, // ena confirm dialog den tha prepei na sbinei apo to fonto alla mono an patithi kapoio button opote me true os timi epitigxano akrivos auto...
      position: { top: '10px' },
      data: {
        message: [k, 0, 0, 1] // the 0s are just to make the length equals to 4 ...
        // to k prepei na perastei dioti sto confirm dialog component xreiazomai na exo prosbasei
        // sto stoixeio tou pinaka pou o xristis epelekse na diagrapsei oste na paro ti mera tou
        // kai na tin kano display piso ston xristi rotontas ton 'sigoura diagrafi tis 1/5/2019?'
        // epeisis prepei na peraso apo edo ena tsek klidi pou einai to teleutaio stoixeio
        // autou tou pinaka to '1'... pernontas to sto dialog component anagnorizetai stin html tou
        // oti patithike klik gia diagrafi tis protis periptosis gia epibebaiosi diagrafis
        // kai ara tha rendarei to simio tis html opou epibebaionetai to kleidi auto kai ara tha treksi
        // kai apo ti logiki tin antistixoi methodo... auto egine gia na epofelitho apo ena koino component
        // gia confirmation 2 diaforetika erotimata confirmations ara gia oikonomia kodika...
        // i apo kato methodos dini kleidi '2' ara tha ginoun oi analoges energeies sto dialog component
        // kata to render... to length tou einai 4 giati an dei kanis tin apo kato methodo
        // stin opoia pairno tin mera mina year kai kleidi to megethos ginetai 4 kai
        // distixos den ginetai apo ti stigmi pou epofeloume apo ena CONFIRMdialog component
        // gia 2 diaforetikes confirmation erotiseis
        // na pernao kathe fora allo length sto MAT_DIALOG_DATA obj tou component to opoio dexetai
        // to nested json autou tou data key to opoio aniki sto eksoteriko json to opoio pernao
        // os 2h parametro stin open()...
      }
    });

   }
   openSecondConfirmDialog(dd: any, mm: any, yy: any) { // eksigo ta panta stin apo pano paromoia methodo...
    this.dialog.open(ConfirmDialogComponent, { // open the component confirmdialogcomponent inside an angular material dialog popup
      width: '300px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '10px' },
      data: {
        // tslint:disable-next-line:max-line-length
        message: [dd, mm, yy, 2] // 2 is a number i passed to the popup data variable so it knows what to render the first or second piece of code inside the popup
      }
    });

   }

// open form to add a new activity
  openAddForm(): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '300px'
    });


  }


}
