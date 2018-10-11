//Initialize Firebase
var config = {
    apiKey: "AIzaSyDIney6kCPkhstb0XqPsbcTzhpWz9cVy-Q",
    authDomain: "my-first-firebase-dbbd9.firebaseapp.com",
    databaseURL: "https://my-first-firebase-dbbd9.firebaseio.com",
    projectId: "my-first-firebase-dbbd9",
    storageBucket: "my-first-firebase-dbbd9.appspot.com",
    messagingSenderId: "478308103622"
};

firebase.initializeApp(config);

var database = firebase.database();

//Button for adding Trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    // local "temporary" object for train data
    var newTrain = {
        name: trainName,
        destination: tDestination,
        start: firstTrain,
        Frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.Frequency);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

//adding train to the database and the html when a user enters
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // store into a variable
    var trainName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var frequency = childSnapshot.val().Frequency;

    console.log(trainName);
    console.log(tDestination);
    console.log(firstTrain);
    console.log(frequency);

    // Prettify the train start
    var firstTrainPretty = moment.unix(firstTrain).format("HH:mm");

    // My math needs work/conversion
    var trainMins = moment().diff(moment(firstTrain, "X"), "Mins");
    console.log(trainMins);

    var trainData = trainMins * frequency;
    console.log(trainData);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(tDestination),
        $("<td>").text(firstTrainPretty),
        $("<td>").text(trainMins),
        $("<td>").text(frequency),
        $("<td>").text(trainData)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});
//I didn't get to the minutes away, I need to add that. I spent so much 
// time reviewing the class activities and experimenting with firebase
//being sick set me back on time which was short for me as I have been 
// working OT at work for the last 8 days. No excuse I know, I will finish 
// just not in time for the grade. Once finished I will link to portfolio site