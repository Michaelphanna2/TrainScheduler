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
    $("#timer").html(moment().format('hh:mm a'))
  }, 1000);
  
  // Button Click
  $("#add-train").on("click", function(event) {
    //This prevents the page from refreshing
    event.preventDefault();
  
    // Code in the logic for storing and retrieving the most recent train information
    var train = $("#trainname-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTime = $("#firsttime-input").val().trim();
    


    var trainInfo = { 
      formtrain: train,
      formdestination: destination,
      formfrequency: frequency,
      formfirsttime: firstTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
      //this is added so we can get most resent user so we can get most recent user to brower and to do this we need to change the listener  
    database.ref().push(trainInfo);
  
    console.log(trainInfo.formtrain);
    console.log(trainInfo.formdestination);
    console.log(trainInfo.formfrequency);
    console.log(trainInfo.formfirsttime);
    console.log(trainInfo.dateAdded);
  
    // Alert
    // alert("Train was successfully added");
  
    // Clears all of the text-boxes
    $("#trainname-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#firsttime-input").val("");
  
  });
  
  
  // Firebase watcher + initial loader 
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
    // $("#timer").html(h + ":" + m);
    $("#timer").text(currentTime.format("hh:mm a"));
    // Difference between the times
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
  
