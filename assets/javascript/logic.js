//I still cant get Firebase to save the data to the page. Tried multiple CDNs as well. 

// Create the Firebase object
var firebaseConfig = {
    apiKey: "AIzaSyD0ttzvXq8BM9i5rs6DVjDJ3F8hOgy4Iug",
    authDomain: "train-eec1f.firebaseapp.com",
    databaseURL: "https://train-eec1f.firebaseio.com",
    projectId: "train-eec1f",
    storageBucket: "train-eec1f.appspot.com",
    messagingSenderId: "752319601643",
    appId: "1:752319601643:web:2cbbe8032244247e"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Variable that links back to Firebase 
  var database = firebase.database();
console.log(firebase);
 
  //Run Time - set to the Current time ID  
  setInterval(function(startTime) {
    $("#timer").html(moment().format('hh:mm'))
  }, 1000);
  
  // Click event
  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // store the most recent train info
    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTime = $("#firstTime").val().trim();
    


    var trainInfo = { 
      formtrain: train,
      formdestination: destination,
      formfrequency: frequency,
      formfirsttime: firstTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
      //this is added so we can get most resent user so we can get most recent user to brower and to do this we need to change the listener  
    database.ref().push(trainInfo);
    
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#firstTime").val("");
  
  });
  
  
  // Firebase watcher - THIS WAS EXPLAINED TO ME BY BILL, FOUND AN EXPLANATION ONLINE TOO, BUT I STILL DON'T GET IT. CONTINUE TO GOOGLE IT. MIGHT BE WHY YOUR CODE STILL DOESNT WORK 
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {  
    var train = childSnapshot.val().formtrain;
    var destination = childSnapshot.val().formdestination;
    var frequency = childSnapshot.val().formfrequency;
  
    //determine Current time
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));
  
    //need a timer function
    $("#timer").text(currentTime.format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Time difference: " + diffTime);
  
    // make the time remaining
    var Remaining = diffTime % frequency;
    console.log("Remainder: " + Remaining);
  
    //figure out how many minutes away
    var minutesAway = frequency - Remaining;
    console.log("Minutes away: " + minutesAway);
  
    //determine Next train arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("Arriving at: " + moment(nextArrival).format("hh:mm"));
  
    // Current time
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    $("#timer").text(currentTime.format("hh:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Time away: " + diffTime);
  
    // Time apart (remainder)
    var Remaining = diffTime % frequency;
    console.log("Remainder: " + Remaining);
  
    //determine Minutes Away
    var minutesAway = frequency - Remaining;
    console.log("Minutes away: " + minutesAway);
  
    //determine Next Train Arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("Arrival time: " + moment(nextArrival).format("hh:mm"));
    });
  
  setInterval(timeUpdater, 6000);
  
