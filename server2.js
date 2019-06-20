const express = require('express');
const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
   

app.use(express.json()); // χάρης αυτό μπορούμε άνετα να κάνουμε parse το εισερχόμενο json με
// τον εξής τρόπο req.body.ΤοΌνομαΤηςΜεταβλητήΤηςΟποίαςΘέλουμεΤηνΤιμή και όλο αυτό να το αποθηκεύσουμε
// σε μια καινούρια μεταβλητή έτσι var Myvar = req.body.whatever; τόσο απλά !!!


// Configure MySQL connection ... db connection credentials ...
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mydb'
});

//Establish MySQL connection
connection.connect(function(err) {
    if (err) 
       throw err
    else {
        console.log('Connected to MySQL');
        // Start the app when connection is ready
        app.listen(3000);
        console.log('Server is listening on port 3000');
  }
 });

 
// simple get ...

app.get('/', (req, res) => {
    
    connection.query('SELECT currentDay, currentMonth, currentYear FROM records GROUP BY currentDay, currentMonth, currentYear ORDER BY currentYear ASC, currentMonth ASC, currentDay ASC', (err, rows) => {
        if (!err) 
            res.send(rows);    
        
    })
});

// get all records with a specific day request ...

app.get('/:d/:m/:y', (req, res) => {

    connection.query('SELECT * FROM records WHERE currentDay = ? AND currentMonth = ? AND currentYear = ? ORDER BY duration ASC', [req.params.d, req.params.m, req.params.y], (err, rows) => {
        if (!err) 
            res.send(rows);    
        
    })
    
   
});
    

    
    



// post ...

app.post('/records', function(req, res) {

// json parsing ...
    var act = req.body.activity; // the incoming json's first key's value
    var curM = req.body.currentMonth;
    var curD = req.body.currentDay;
    var curY = req.body.currentYear;
    var SchAT = req.body.Scheduled_at;
    var dur = req.body.duration;
    var prior = req.body.priority;



connection.query('INSERT INTO records (activity, currentDay, currentMonth, currentYear, Scheduled_at, duration, priority) VALUES (?, ?, ?, ?, ?, ?, ?)', [act, curD, curM, curY, SchAT, dur, prior], function(err) {
       
            if(err) {
               res.send({serversais: 'Error no data inserted'});
            }
           else {
               res.send({serversais: 'Successfully inserted into DataBase'});
            }
          });
    

          
});

// put ...
app.put('/records/:id', function(req, res){

    var act = req.body.activity; // the incoming json's first key's value
    var curM = req.body.currentMonth;
    var curD = req.body.currentDay;
    var curY = req.body.currentYear;
    var SchAT = req.body.Scheduled_at;
    var dur = req.body.duration;
    var prior = req.body.priority;


connection.query('UPDATE records SET activity = ?, currentDay = ?, currentMonth = ?, currentYear = ?, Scheduled_at = ?, duration = ?, priority = ? WHERE id = ?', [act, curD, curM, curY, SchAT, dur, prior, req.params.id], function(err) {
       
            if(err) {
               res.send({serversais: 'Error no data updated'});
            }
           else {
               res.send({serversais: 'Selected record has been successfully updated'});
            }
          });

});



// delete ...
app.delete('/records/:id', function(req, res){
    connection.query('DELETE FROM records WHERE id = ?', [req.params.id], (err) => {
       
        if(!err) {
           res.send({serversais: 'One row deleted successfully'});
        }
       
      });

});

app.delete('/records/:d/:m/:y', function(req, res){
    connection.query('DELETE FROM records WHERE currentDay = ? AND currentMonth = ? AND currentYear = ?', [req.params.d, req.params.m, req.params.y], (err) => {

        if(!err) {
            res.send({serversais: 'All activities for ' + req.params.d + '/' + req.params.m + '/' + req.params.y + ' have been successfully deleted'});
        }
    });
});













