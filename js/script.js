// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcY7KOJzCImLOEO9mtS699kT6crENvlNI",
  authDomain: "smartparking00010989.firebaseapp.com",
  databaseURL: "https://smartparking00010989-default-rtdb.firebaseio.com",
  projectId: "smartparking00010989",
  storageBucket: "smartparking00010989.appspot.com",
  messagingSenderId: "733640508401",
  appId: "1:733640508401:web:cd483874ce64277e613a50",
  measurementId: "G-YE149CSP12"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();

// Reference to the 'FirstLotState' node in the database
var dataRef1 = database.ref('FirstLotState');

// Reference to the 'SecondLotState' node in the database
var dataRef2 = database.ref('SecondLotState');

// Reference to the 'ThirdLotState' node in the database
var dataRef3 = database.ref('ThirdLotState');

// Event listener for changes in the 'FirstLotState' node
dataRef1.on('value', function(getdata1) {
  var status = getdata1.val();
  var firstLotElement = document.getElementById('FirstLotState');
  firstLotElement.textContent = status;
});

// Event listener for changes in the 'SecondLotState' node
dataRef2.on('value', function(getdata2) {
  var status = getdata2.val();
  var secondLotElement = document.getElementById('SecondLotState');
  secondLotElement.textContent = status;
});

// Event listener for changes in the 'ThirdLotState' node
dataRef3.on('value', function(getdata3) {
  var status = getdata3.val();
  var thirdLotElement = document.getElementById('ThirdLotState');
  thirdLotElement.textContent = status;
});