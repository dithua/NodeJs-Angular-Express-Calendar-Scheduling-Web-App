import { Component, OnInit, Input } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  indexofcurrentmonth: any = new Date().getMonth() + 1;
  currentSelectedCell: any = new Date().getDate();
  daysInThisMonth: Array<any> = [];
  SplittedArray: Array<any> = []; // einai o array pou spaei ton daysInThisMonth se bdomades
  // kai sto sinexeia diabazetai apo tin html
  currentYear: any = new Date().getFullYear(); // εμφανίζεται στο header του ημερολογίου
  currentMonth: any;  // εμφανίζεται στο header του ημερολογίου
  CurrentDay: Date = new Date();
  displayDay: any = new Date().toLocaleString('gr-GR', { weekday: 'short', day: 'numeric' , month: 'short', year: 'numeric'});
  highlightCurrentDay: any;
  // αποθηκεύει την τελευταία μέρα του μήνα μέσω των παραμέτρων που έχει η date
  // οι παράμετροι έχουν ως εξής πρώτα το έτος μετά ο μήνας και μετά η μέρα κάνοντας
  // getMonth() + 1 μέσα στην παράμετρο και μετά βάζοντας ,0 για την μέρα πηδάμε στον
  // επόμενο μήνα και ζητάμε την 0 μέρα του όπου υπολογίζεται ότι είναι η τελευταία
  // του προηγούμενού του δηλαδή για εμάς του τρέχοντος μήνα η τελευταία. θα είναι
  // της μορφής 2018/08/31 όπου αποθηκεύεται στην μεταβλητή lastday μετά καλώντας
  // την lastday.getDay() θα επιστραφεί ένας αριθμός από 0-6 όπου θα δηλώνει σε ποια
  // θέση στη βδομάδα ανήκει η μέρα 2018/08/31 αν έρθει ο αριθμός 3 τότε είναι στην 3η θέση
  // και τότε η μέρα αυτή είναι η Τετάρτη 31/08/2018 . η κυριακή έχει το 0 η δευτέρα
  // το 1 η τρίτη το 2 η τετάρτη το 3 κ.ο.κ.
   LastDay: Date;
  // to 1 dilonei oti thelo tin proti mera tou mina
  firstDay: Date;
  firstDayOfNextMonth: Date; // boithaei sto spasimo se bdomades pou prepei na fainontai apo ton epomeno mina

  // tslint:disable-next-line:max-line-length
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // οταν ο Φεβρουάριος είναι κουτσός...
  // ο Ιανουάριος έχει 31 μέρες ο Φεβρουάριος 28 κ.ο.κ.
  numofdaysofeachmonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  indx: number; // apothikeuei tin epilegmeni row apo tin html kai boithaei sto highlight se kathe
  // klik pano se mia mera
  daysInNextMonth: Array<any> = []; // exei tis imerominies pou axnofainontai
  daysInPreviousMonth: Array<any> = []; // exei tis imerominies pou axnofainontai
  newline: number; // an 0 i html katalabenei oti prepei na ektiposei se neo tr ta periexomena tou trexonton mina
  // apo tin arxi tous
  lengthOfSplittedArray: number; // to megisto megethos length autou tou array einai i bdomades tou mina
  // kai auto boitha sthn anagnosi apo thn html
  tempselectedcell: any = new Date().getDate();
  active: boolean; // an true tote emfanizei to menou epilogis mina
  counter = 1; // metra ta klik pou erxontai apo to event gia na anoigoklini to menou stin custom
  // epilogi mina
  newlinefornextmonth: number; // analoga me ton arithmo pou pernei diabazetai apo tin html etsi
  // oste na ektiponi i html kathe fora me ton sosto tropo grammon ton pinaka me tis meres tou
  // epomenou mina analoga diladi me to pos einai aytos gemismenos kathe fora. p.x. mporei
  // o pinakas na exei mesa tou dio pinakes o kathenas me diaforetiko arithmo stoixeion ... o kathe
  // aytos ypopinakas antiprosopeuei tin kathe bdomada pou tha prepei na fainetai kai ara na ektipothei
  // analoga
  SplittedNextArray: Array<any> = []; // pinakas me tis bdomades tou epomenou pou prepei na fainontai
  check = false;
  secondCounter = 0;
  incomingposts: Array<any> = [];


  constructor(private servicee: HttpserviceService, private data: DataserviceService) {
    data.day = this.currentSelectedCell;
    data.month = this.indexofcurrentmonth;
    data.year = this.currentYear;
  }


  ngOnInit() {
    this.currentMonth = this.months[this.CurrentDay.getMonth()];
    this.currentYear = this.CurrentDay.getFullYear();
    this.getDaysOfCurrentMonth();
    this.SPLITdaysInThisMonth(this.daysInThisMonth, 7 - this.firstDay.getDay());
    if (this.newlinefornextmonth === 1) {
      this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
    }
   this.DrawDotOnCalendar();
    // getDate() returns 1-31 if the day is the 27th day of the month it will return the number 27
    // getDay() returns 0 for Sunday 1 for Monday etc. returns from 0-6 returns the place of the day
    // in the week. if the day is the 3rd day of the week it'll return the number 3
    // getMonth() starts counting from 0 - 11


  }


DrawDotOnCalendar(): void {

  this.servicee.getPosts().subscribe( (r: any[]) => { this.incomingposts = r; });
}

// arrow function την χρησιμοποιησα γιατι λενε οτι δεν μπερδευει τα πραγματα με το που δειχνει το this

    getDaysOfCurrentMonth = () => {
      for (let i = 0; i <= this.months.length; i++) {
        if (this.months[i] === this.currentMonth) {
        this.firstDay =  new Date(this.currentYear, i, 1);
        this.indexofcurrentmonth = i + 1;
        this.data.changeDAY(this.currentSelectedCell);
        this.data.changeYEAR(this.currentYear);
        this.data.changeMONTH(this.indexofcurrentmonth);
     }
    }

    for (let i = 0; i <= this.months.length; i++) {
      if (this.months[i] === this.currentMonth) {
        this.LastDay = new Date(this.currentYear, i + 1, 0);

      }
    }
    for (let i = 0; i <= this.months.length; i++) {
      if (this.months[i] === this.currentMonth) {
      this.firstDayOfNextMonth =  new Date(this.currentYear, i + 1, 1);

   }
  }


// check που όταν ξεκινά ο κώδικας θα κάνει bold την τρέχουσα μέρα του τρέχοντος μηνός, γιατί
// αν δεν κάνω τσεκ κάνει μπολντ όλες τις έστω 19 του μηνός από κάθε μήνα...
// tslint:disable-next-line:max-line-length
if (this.months.indexOf(this.currentMonth) === this.CurrentDay.getMonth() && this.currentYear === this.CurrentDay.getFullYear()) {
  this.highlightCurrentDay = new Date().getDate();
} else {
this.highlightCurrentDay = 0;
}

// εάν το έτος είναι δίσεκτο για τον Φεβρουάριο έχουμε...
  if ((this.currentYear % 4 === 0 && this.currentYear % 100 !== 0) || this.currentYear % 400 === 0) {
    if (this.currentMonth === 'February') {

      if (this.firstDay.getDay() === 0) { // εάν η πρώτη μέρα είναι η κυριακή αν δεν μπει αυτός ο έλεγχος
        // δεν θα εμφανίσει τις γκρι του προηγούμενου
        this.newline = this.firstDay.getDay();
        for (let i = 0; i <= 6; i++) {

          // tslint:disable-next-line:max-line-length
          this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - 6 + i;

        }
      } else {
        this.newline = 1;
      for (let i = 0; i < this.firstDay.getDay(); i++) {
            // tslint:disable-next-line:max-line-length
            this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - this.firstDay.getDay() + 1 + i;

      }
    }


for (let i = 0; i < 29; i++) {
  this.daysInThisMonth[i] =  1 + i;
}

if (this.firstDayOfNextMonth.getDay() === 0) {
  this.newlinefornextmonth = 0;
  for (let h = 0; h < 7; h++) {
    this.daysInNextMonth[h] = h + 1;
}
} else {
  this.newlinefornextmonth = 2;
      for (let h = 0; h < 7 - this.LastDay.getDay() - 1; h++) {
          this.daysInNextMonth[h] = h + 1;
      }
    }

this.SPLITdaysInThisMonth(this.daysInThisMonth, 7 - this.firstDay.getDay());
if (this.SplittedArray.length === 5 && this.daysInPreviousMonth.length !== 7) {
this.secondCounter = 0;
for (let itm of this.SplittedArray) {
  this.secondCounter++;
  for (let item of itm) {
      if (item === this.LastDay.getDate() && this.secondCounter === 5) {
        this.check = true;
        item = this.LastDay.getDate();
        itm = 5;
      }
  }
}
    }
if (this.check) {
this.check = false;
this.newlinefornextmonth = 1;
this.SplittedNextArray.length = 0;
  for (let h = 0; h < 7 - this.LastDay.getDay() - 1 + 7; h++) {
    this.daysInNextMonth[h] = h + 1;
  }
}
// διαφορετικά εάν το έτος είναι δίσεκτο αλλά έχουμε να κάνουμε με άλλον μήνα εκτός του Φεβρουαρίου έχουμε...
    } else {
// To this.numofdaysofeachmonth[this.CurrentDay.getMonth()] mesa sto for loop
// eite einai o arithmos 31 eite o 30 ανάλογα ο μήνας

    if (this.currentMonth === 'March') { // if march then previous month february has 29 days

      if (this.firstDay.getDay() === 0) { // εάν η πρώτη μέρα είναι η κυριακή αν δεν μπει αυτός ο έλεγχος
        // δεν θα εμφανίσει τις γκρι του προηγούμενου
        this.newline = this.firstDay.getDay();
        for (let i = 0; i <= 6  ; i++) {

          // tslint:disable-next-line:max-line-length
          this.daysInPreviousMonth[i] = 29 - 6 + i;

        }
      } else {
        this.newline = 1;
      for (let i = 0; i < this.firstDay.getDay(); i++) {

            this.daysInPreviousMonth[i] = 29 - this.firstDay.getDay() + 1 + i;

      }
    }


    } else { // εάν δεν είναι ο Μάρτης του ο ποίου ο προηγούμενος είναι ο δίσεκτος Φεβρουάριος και θελει
      // προσοχή στο γέμισμα του array με τις γκρι ημερομηνίες έχουμε...
      if (this.firstDay.getDay() === 0) { // εάν η πρώτη μέρα είναι η κυριακή αν δεν μπει αυτός ο έλεγχος
        // δεν θα εμφανίσει τις γκρι του προηγούμενου
        this.newline = this.firstDay.getDay();
        if (this.currentMonth === 'January') {
          for (let i = 0; i <= 6; i++) {

            // tslint:disable-next-line:max-line-length
            this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[11] - 6 + i;

          }
        } else {
        for (let i = 0; i <= 6; i++) {

          // tslint:disable-next-line:max-line-length
          this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - 6 + i;

        }
      }
      } else {
        this.newline = 1;
        if (this.currentMonth === 'January') {
          for (let i = 0; i < this.firstDay.getDay(); i++) {
            this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[11] - this.firstDay.getDay() + 1 + i;
            }
        } else {
      for (let i = 0; i < this.firstDay.getDay(); i++) {
      this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - this.firstDay.getDay() + 1 + i;
      }
    }

    }
    }

// ο πίνακας που γεμίζεται ακριβώς από κάτω είναι αυτός που στη συνέχεια θα γίνει split σε βδομάδες
// και θα διαβάζεται από την html για να εμφανίζονται στην οθόνη η κανονικές ημερομηνίες του επιλεγμένου
// μήνα
            for (let i = 0; i < this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth)]; i++) {
              this.daysInThisMonth[i] =  1 + i;
    }

// ο παρακάτω πίνακας γεμίζεται ανάλογα ώστε να διαβάζεται από την html και να εμφανίζονται οι γκρι
// ημερομηνίες του επόμενου μήνα
if (this.firstDayOfNextMonth.getDay() === 0) {
  this.newlinefornextmonth = 0;
  for (let h = 0; h < 7; h++) {
    this.daysInNextMonth[h] = h + 1;
}
} else {
  this.newlinefornextmonth = 2;
      for (let h = 0; h < 7 - this.LastDay.getDay() - 1; h++) {
          this.daysInNextMonth[h] = h + 1;
      }
    }
this.SPLITdaysInThisMonth(this.daysInThisMonth, 7 - this.firstDay.getDay());
if (this.SplittedArray.length === 5 && this.daysInPreviousMonth.length !== 7) {
this.secondCounter = 0;
for (let itm of this.SplittedArray) {
  this.secondCounter++;
  for (let item of itm) {
      if (item === this.LastDay.getDate() && this.secondCounter === 5) {
        this.check = true;
        item = this.LastDay.getDate();
        itm = 5;
      }
  }
}
    }
if (this.check) {
this.check = false;
this.newlinefornextmonth = 1;
this.SplittedNextArray.length = 0;
  for (let h = 0; h < 7 - this.LastDay.getDay() - 1 + 7; h++) {
    this.daysInNextMonth[h] = h + 1;
  }
}

    }
// Το από κάτω else κάνει τον έλεγχο για το αν το έτος είναι κανονικό και όχι δίσεκτο
// εάν είναι κανονικό ο κώδικας παίρνει τις τιμές για τον αριθμό των συνολικών ημερών του μήνα από τον
// πίνακα numofdaysofeachmonth άρα έχουμε...
  } else {
    if (this.firstDay.getDay() === 0) { // εάν η πρώτη μέρα είναι η κυριακή αν δεν μπει αυτός ο έλεγχος
      // δεν θα εμφανίσει τις γκρι του προηγούμενου
      this.newline = this.firstDay.getDay(); //  Το newline = 0 εδώ

      if (this.currentMonth === 'January') {
        for (let i = 0; i <= 6; i++) {

          // tslint:disable-next-line:max-line-length
          this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[11] - 6 + i;

        }
      } else {

      for (let i = 0; i <= 6; i++) {

        // tslint:disable-next-line:max-line-length
        this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - 6 + i;

      }
    }
    } else {
      this.newline = 1;
      if (this.currentMonth === 'January') {
        for (let i = 0; i < this.firstDay.getDay(); i++) {

          // tslint:disable-next-line:max-line-length
          this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[11] - this.firstDay.getDay() + 1 + i;

        }
      } else {
        for (let i = 0; i < this.firstDay.getDay(); i++) {

              // tslint:disable-next-line:max-line-length
              this.daysInPreviousMonth[i] = this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth) - 1] - this.firstDay.getDay() + 1 + i;

        }
      }
      }

for (let i = 0; i < this.numofdaysofeachmonth[this.months.indexOf(this.currentMonth)]; i++) {
          this.daysInThisMonth[i] =  1 + i;
}

if (this.firstDayOfNextMonth.getDay() === 0) {
  this.newlinefornextmonth = 0;
  for (let h = 0; h < 7; h++) {
    this.daysInNextMonth[h] = h + 1;
}
} else {
  this.newlinefornextmonth = 2;
      for (let h = 0; h < 7 - this.LastDay.getDay() - 1; h++) {
          this.daysInNextMonth[h] = h + 1;
      }
    }
this.SPLITdaysInThisMonth(this.daysInThisMonth, 7 - this.firstDay.getDay());
if (this.SplittedArray.length === 5 && this.daysInPreviousMonth.length !== 7) {
this.secondCounter = 0;
for (let itm of this.SplittedArray) {
  this.secondCounter++;
  for (let item of itm) {
      if (item === this.LastDay.getDate() && this.secondCounter === 5) {
        this.check = true;
        item = this.LastDay.getDate();
        itm = 5;
      }
  }
}
  }
if (this.check) {
this.check = false;
this.newlinefornextmonth = 1;
this.SplittedNextArray.length = 0;
  for (let h = 0; h < 7 - this.LastDay.getDay() - 1 + 7; h++) {
    this.daysInNextMonth[h] = h + 1;
  }
}

     }


return [this.daysInThisMonth, this.firstDay, this.daysInPreviousMonth, this.daysInNextMonth, this.newlinefornextmonth, this.newline];
}



// Τώρα που γεμίσαμε τον array θα τον κόψουμε σε κομμάτια των 7 στοιχείων ο καθένας όσες και οι μέρες της
// βδομάδας. Αυτό θα γίνει για να γίνει πιο έυκολη η ανάγνωση των νούμερων από την html στο τελικό
// render του ημερολογίου. Η συνάρτηση παρακάτω κάνει το χωρισμό του array.

SPLITdaysInThisMonth = (myArray, sizeofSPLIT ) => {
  let size = sizeofSPLIT;
    while (myArray.length) {

// το 0 στην splice σαν παράμετρος δείχνει από που θέλουμε να αρχίσει
// να κόβει τον array από ποιο index δηλαδή του array να αρχίσει το κόψιμο
        this.SplittedArray.push(myArray.splice(0, size));
        size = 7;
    }

      this.lengthOfSplittedArray = this.SplittedArray.length;


return this.SplittedArray;

  }

  SPLITdaysInNextMonth = (myArray, sizeofSPLIT ) => {
    let size = sizeofSPLIT;
      while (myArray.length) {

  // το 0 στην splice σαν παράμετρος δείχνει από που θέλουμε να αρχίσει
  // να κόβει τον array από ποιο index δηλαδή του array να αρχίσει το κόψιμο
          this.SplittedNextArray.push(myArray.splice(0, size));
          size = 7;
      }


  return this.SplittedNextArray;

    }

  goToLastMonth = (event?: any, thing?: any) => {
    if (this.currentMonth === 'January') {
        this.currentMonth = this.months[11];
        this.currentYear--;
  } else {
      for (let i = 0; i <= this.months.length; i++) {
        if (this.months[i] === this.currentMonth ) {

        this.currentMonth = this.months[i - 1];
     }
    }
   }



   this.daysInThisMonth.length = 0;
   this.SplittedArray.length = 0;

   this.daysInPreviousMonth.length = 0;
   this.daysInNextMonth.length = 0;
   this.SplittedNextArray.length = 0;
if (this.daysInThisMonth.length === 0 && this.daysInPreviousMonth.length === 0 && this.daysInNextMonth.length === 0) {
    this.getDaysOfCurrentMonth();
}
if (this.SplittedArray.length === 0) {
   this.SPLITdaysInThisMonth(this.daysInThisMonth,  7 - this.firstDay.getDay());
}
if (this.SplittedNextArray.length === 0 && this.newlinefornextmonth === 1) {
  this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
}

// για να κρατάει στη μνήμη το περιεχόμενο των κελιών που αντιπροσωπεύουν τον προηγούμενο μήνα
// και καθώς μεταφέρεται ο κώδικας στον προηγούμενο μήνα πατώντας αυτά τα αχνά κελιά να μπορέι να
// γίνει και highlight η επιλογή στο ημερολόγιο του προηγούμενου μήνα
if (thing === undefined) {
  this.currentSelectedCell = this.tempselectedcell;

} else {
  this.currentSelectedCell = thing;
  this.data.changeDAY(thing);
}
this.DrawDotOnCalendar();
    return this.currentYear;
  }





  goToNextMonth = (event?: any, piece?: any) => {
    if (this.currentMonth === 'December') {

          this.currentMonth = this.months[0];
          this.currentYear++;
  } else {

          for (let i = this.months.length; i >= 0 ; i--) {
            if (this.months[i] === this.currentMonth ) {
          this.currentMonth = this.months[i + 1];
      }
    }
    }
    this.daysInThisMonth.length = 0;
    this.SplittedArray.length = 0;

    this.daysInPreviousMonth.length = 0;
   this.daysInNextMonth.length = 0;
   this.SplittedNextArray.length = 0;

    if (this.daysInThisMonth.length === 0 && this.daysInPreviousMonth.length === 0 && this.daysInNextMonth.length === 0) {
      this.getDaysOfCurrentMonth();
    }
    if (this.SplittedArray.length === 0) {
      this.SPLITdaysInThisMonth(this.daysInThisMonth,  7 - this.firstDay.getDay());
    }
    if (this.SplittedNextArray.length === 0 && this.newlinefornextmonth === 1) {
      this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
    }

    if (piece === undefined) {
      this.currentSelectedCell = this.tempselectedcell;


    } else {
      this.currentSelectedCell = piece;
      this.data.changeDAY(piece);

    }
    this.DrawDotOnCalendar();
   return this.currentYear;
  }



  selectedCell(event: any, item: any, i: any) {

    this.currentSelectedCell = item;
    this.tempselectedcell = this.currentSelectedCell;
    this.indx = i;
    this.data.changeDAY(item);



  }
// ean to koumpi me tin torini imerominia patithi energopoieitai i epomeni methodos
  loadCurrentMonth(event: any) {
    if (this.currentMonth !== this.months[this.CurrentDay.getMonth()] || this.currentYear !== this.CurrentDay.getFullYear()) {
        this.currentMonth = this.months[this.CurrentDay.getMonth()];
        this.currentYear = this.CurrentDay.getFullYear();
        this.currentSelectedCell = this.CurrentDay.getDate();


        this.daysInThisMonth.length = 0;
        this.SplittedArray.length = 0;

        this.daysInPreviousMonth.length = 0;
        this.daysInNextMonth.length = 0;
        this.SplittedNextArray.length = 0;

    if (this.daysInThisMonth.length === 0 && this.daysInPreviousMonth.length === 0 && this.daysInNextMonth.length === 0) {
      this.getDaysOfCurrentMonth();
    }
    if (this.SplittedArray.length === 0) {
      this.SPLITdaysInThisMonth(this.daysInThisMonth,  7 - this.firstDay.getDay());
    }
    if (this.SplittedNextArray.length === 0 && this.newlinefornextmonth === 1) {
      this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
    }
    }// χρειάζεται ο παρακάτω κώδικας κι ας φαίνεται πως είναι ολόιδιος με τον από πάνω. Χρειάζεται στο
    // κουμπί με την τρέχουσα ημερομηνία εάν ο μήνας είναι ο τρέχον και έχει γίνει κλικ σε άλλο κελί
    // μόλις πατηθεί στον τρέχον μήνα αυτό το κουμπί με την τρέχουσα ημερομηνία τότε το ημερολόγιο
    // ξαναφωτίζει την σημερινή τρέχουσα μέρα κάνοντας πάλι highlight τον αριθμό της
    if (this.currentMonth === this.months[this.CurrentDay.getMonth()] && this.currentYear === this.CurrentDay.getFullYear()) {
        this.currentSelectedCell = this.CurrentDay.getDate();

        this.daysInThisMonth.length = 0;
        this.SplittedArray.length = 0;

        this.daysInPreviousMonth.length = 0;
        this.daysInNextMonth.length = 0;
        this.SplittedNextArray.length = 0;

    if (this.daysInThisMonth.length === 0 && this.daysInPreviousMonth.length === 0 && this.daysInNextMonth.length === 0) {
      this.getDaysOfCurrentMonth();
    }
    if (this.SplittedArray.length === 0) {
      this.SPLITdaysInThisMonth(this.daysInThisMonth,  7 - this.firstDay.getDay());
    }
    if (this.SplittedNextArray.length === 0 && this.newlinefornextmonth === 1) {
      this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
    }
    }
    this.DrawDotOnCalendar();
  }
// ean to koumpi me ton megenthitiko fako patithi sto menou epilogis mina energopoieitai i parakato methodos
  chooseMonth(event: any) {


    this.daysInThisMonth.length = 0;
    this.SplittedArray.length = 0;

    this.daysInPreviousMonth.length = 0;
    this.daysInNextMonth.length = 0;
    this.SplittedNextArray.length = 0;

    if (this.daysInThisMonth.length === 0 && this.daysInPreviousMonth.length === 0 && this.daysInNextMonth.length === 0) {
      this.getDaysOfCurrentMonth();
    }
    if (this.SplittedArray.length === 0) {
      this.SPLITdaysInThisMonth(this.daysInThisMonth,  7 - this.firstDay.getDay());
    }
    if (this.SplittedNextArray.length === 0 && this.newlinefornextmonth === 1) {
      this.SPLITdaysInNextMonth(this.daysInNextMonth, 7 - this.LastDay.getDay() - 1);
    }
    this.deactivate();
    this.DrawDotOnCalendar();

  }

// methodos emfanisis i apokripsis tou menou epilogis mina
  activate(event: any) {


    if (this.counter % 2 === 0) {
      this.deactivate();
      this.chooseMonth(event);
      this.counter++;
    } else {
      this.active = true;
      this.counter++;
    }

  }
  // methodos apokripsis tou menou epilogis mina
  // auti i methodos kaleitai apo thn activate()
  deactivate() {
    this.active = false;
    this.counter++;
  }




}
