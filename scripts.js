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

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var dataRef1 = database.ref('FirstLotState');
var dataRef2 = database.ref('SecondLotState');
var dataRef3 = database.ref('ThirdLotState');

dataRef1.on('value', function(getdata1) {
  var status = getdata1.val();
  var firstLotElement = document.getElementById('FirstLotState');
});

dataRef2.on('value', function(getdata2) {
  var status = getdata2.val();
  var secondLotElement = document.getElementById('SecondLotState');
});

dataRef3.on('value', function(getdata3) {
  var status = getdata3.val();
  var thirdLotElement = document.getElementById('ThirdLotState');
});

function updateBoxColor(element, status) {
  element.innerHTML = status;

  if (status === 'Free') {
    element.classList.remove('occupied');
    element.classList.add('free');
  } else if (status === 'Occupied') {
    element.classList.remove('free');
    element.classList.add('occupied');
  }
}