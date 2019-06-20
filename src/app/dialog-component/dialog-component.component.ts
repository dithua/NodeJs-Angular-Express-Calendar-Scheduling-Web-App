import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpserviceService } from '../httpservice.service';
import { DataserviceService } from '../dataservice.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Post } from '../post';
import { MenuViewComponent } from '../menu-view/menu-view.component';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {

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
 // res: any;
 // loadselectelement: MenuViewComponent;
  priority: boolean;
//  cautionAlert: string;
//  allowsubmition = false;

//  durationLessOrEqualToZero = false;
//  durationGreaterThan1440minutes = false;
  durValueField: number; // 2-way binding επικοινωνεί με το view και αν ο χρηστης εχει βαλει τιμη μη
  // επιτρεπτή η durValueField ενημερώνεται kai perni tin nea timi kateuthian apo to view
  // meso tou [(ngModel)] αμεσως και γινεται ελεγχος χρησιμοποιωντας την τιμη της στο
  // view...
  SumDurations = 0;
  TimeExists = false;
  LiveResults: any; // apothikeuei to athroisma kathe fora tis oras pou epelekse o xristis me
  // ta lepta pou epilegei live oste na elegxei mexri na apofasisi kai sta lepta o xristis ti tha valei
  // min kseperna to athroisma tin enarksi enos allou priority ... ola auta ginontai apotrepsima
  // ama o xristis to activity pou paei na kani add auti ti stigmi to exei thesei kai auto priority
  // ara i metabliti auti tou emfanizei to error legontas tou oti i epilegmeni ora me ta epilegmena
  // lepta den mporoun na kataxorithoun... kai tou protini sto view lisis...
  displaySolutions = false;
  diaforaOron: any; // ta lepta pou prepei na afairethoun an ena priority pou paei na kataxorithi
  // den prepei na kataxorithi autin tin ora me tosi diarkeia epeidi profanos tha kseperna to
  // xrono/ora enarksis enos allou priority... gia ta priority den mporei na gini sorting ... prepei
  // na ginontai stin ora tous kai mono...
  a: any;
  b: any;
  activitypoudiarkeiparapanoapotinneaekxorisi: any;
  displaySolutions2 = false;
  diaforaOron2: any;

//  timeInserted: any;



  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private service: HttpserviceService, private data: DataserviceService, public dialogRef: MatDialogRef<DialogComponentComponent>) {
    this.currentDay = data.day;
    this.currentMonth = data.month;
    this.currentYear = data.year;

  }


  ngOnInit() {
    this.data.DAY.subscribe(currentSelectedCell => this.currentDay = currentSelectedCell);
    this.data.YEAR.subscribe(currentYear => this.currentYear = currentYear);
    this.data.MONTH.subscribe(indexofcurrentmonth => this.currentMonth = indexofcurrentmonth);

    this.currentDayy = this.currentDay;
    this.currentMonthh = this.currentMonth;
    this.currentYearr = this.currentYear;


    this.GetRecordPostsArrayForThisDay();

  }


    // get input fields' values
    onKey(event: any) {this.activity = event.target.value; }
    onChangeScheduled(event: any) {
      this.displaySolutions2 = false;
      this.displaySolutions = false;
      this.TimeExists = false;
      this.Scheduled_at = event.target.value;
      // tslint:disable-next-line:max-line-length
      for (let i = 0; i < this.recordposts.length; i++) { // ta + ':' + '00' prostethikan gia na gini i sigrisi giati erxontai se full morfi apo ti basi san 00:00:00...
        if (this.recordposts[i].Scheduled_at === this.Scheduled_at + ':' + '00') {
          this.TimeExists = true;
        }
      }
      if (this.duration) {
        this.checkForPrioritiesConflictionBeforeAdd();
      }

     }

    onChangeDuration(event: any) {
      this.displaySolutions2 = false;
      // tslint:disable-next-line:max-line-length
      this.displaySolutions = false; // iparxoun polles tetoiou idous logikes ston kodika ... san enan on/off diakopti edo stin arxi tis methodou ksana arxikopoiite sto off kai pio kato sti methodo ginete pali on
      this.duration = event.target.value;
      this.checkForPrioritiesConflictionBeforeAdd();

    }


checkForPrioritiesConflictionBeforeAdd() {
  // elegxos gia otan paei na kataxorithi ena priority opou i ora enarksis tou + i diarkeia tou mpainei
  // mesa sto xrono opou prepei na diekpereothi kapoio allo...
  for (let i = 0; i < this.recordposts.length; i++) {
    // tslint:disable-next-line:max-line-length
    this.LiveResults = this.addMinutes(this.Scheduled_at + ':' + '00', this.durValueField); // i ora pou telionei i activity pou molis tora siblironi pros kataxorisi o xristis...
    // tslint:disable-next-line:max-line-length
    if (this.LiveResults > this.recordposts[i].Scheduled_at && this.Scheduled_at < this.recordposts[i].Scheduled_at && this.recordposts[i].priority === 1 && this.priority === true) {
        this.displaySolutions = true;
        this.a = this.makeTimeToMinutes(this.recordposts[i].Scheduled_at);
        this.b = this.makeTimeToMinutes(this.LiveResults);
        this.diaforaOron =  this.b - this.a;
        break;
    }
  }
  // 2h fasi elegxou gia otan paei na kataxorithi ena priority metaksi tis oras
  // enarksis kai oloklirosis enos idi kataxorimenou
  for (let i = 0; i < this.recordposts.length; i++) {
    this.activitypoudiarkeiparapanoapotinneaekxorisi = this.addMinutes(this.recordposts[i].Scheduled_at, this.recordposts[i].duration);
    // tslint:disable-next-line:max-line-length
    if (this.Scheduled_at < this.activitypoudiarkeiparapanoapotinneaekxorisi && this.Scheduled_at > this.recordposts[i].Scheduled_at && this.recordposts[i].priority === 1 && this.priority === true) {
      this.displaySolutions2 = true;

      break;
    }
  }
}


  // send form's data in http service so it wraps them in json and send them in db
    addActivity(form: NgForm): void {
      // tslint:disable-next-line:max-line-length
      if (this.priority !== true) { // gia epibebaiosi oti einai sta sigoura false giati o xristis prepei na to kani true MONO kai oxi to programma... ara an exei kata lathos mini mia palia timi true sto priority svisto gia na min paei sti basi etsi meta
        this.priority = false;
      }

      const Data: Post = {
        activity: this.activity,
        currentMonth: this.currentMonth,
        currentDay: this.currentDay,
        currentYear: this.currentYear,
        Scheduled_at: this.Scheduled_at,
        duration: this.duration,
        priority: this.priority
      };

      this.service.addActivity(Data).subscribe((res) => { this.snackbar.open(res['serversais'], 'Dismiss', {duration: 5000});
     //   this.refreshEditBoxDynamicallyAfterAdd(this.currentDay, this.currentMonth, this.currentYear);
      });
      form.reset();
      // tslint:disable-next-line:max-line-length
      this.priority = false; // an itan true meta to reset kanto false oste na min apothikeutei true ksana sto epomeno add ... true prepei na to kani mono o xristis ean to epithimi
      this.durValueField = NaN;

      setTimeout(() => {
        this.onNoClick();
      }, 1000);

// this.loadselectelement.showActivities(); // meta to add thelo na kanei ananeosi sto select me tis
// kataxorimenes imerominies...


    }

// auti edo uparxei giati akribos meta to add thelo na kanei ananeosi sto activities box oste
// an exoume epilexei tin trexousa meta stin opoia kanoume add pollaples activities
// tha prepei dunamika na emfanizei kathe nea pou prosthetoume gia autin tin mera sto box...
  //  refreshEditBoxDynamicallyAfterAdd(dd: any, mm: any, yy: any ) {

    //  if ( this.currentDay === this.currentDayy && this.currentMonth === this.currentMonthh && this.currentYear === this.currentYearr) {

     //       }
    //    }


    GetRecordPostsArrayForThisDay(): void {
// prosoxi min berdeuto edo einai to component pou outos i allos erxontai
// oi epilegmenes imerominies apo to component tou imerologiou opote exo tis imerominies
// oste na sintheso to post obj parakato na to stilo sto api gia na mou erthei to response apo
// ti basi...
      // Γίνεται obj τύπου Post
          const Data: Post = {
            activity: this.activity,
            currentMonth: this.currentMonth,
            currentDay: this.currentDay,
            currentYear: this.currentYear,
            Scheduled_at: this.Scheduled_at,
            duration: this.duration,
            priority: this.priority
          };

            this.service.getRecord(Data).subscribe((respons: any[]) => {

              this.recordposts = respons;
              for (let i = 0; i < this.recordposts.length; i++) {
                this.SumDurations = this.SumDurations + this.recordposts[i].duration;

              }

            });

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

makeTimeToMinutes(time) {
  const getMins = new Date('1970/01/01 ' + time).getHours() * 60;
  const getHoursToMins = new Date('1970/01/01 ' + time).getMinutes();
  return getMins + getHoursToMins;
}


  onNoClick(): void {
    this.dialogRef.close();
  }






}
