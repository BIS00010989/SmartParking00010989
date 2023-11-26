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

firebase.initializeApp(firebaseConfig); // Initialize Firebase using the provided configuration

var database = firebase.database(); // Get a reference to the Firebase Realtime Database

var dataRef1 = database.ref('FirstLotState'); // Reference to the 'FirstLotState' node in the database
var dataRef2 = database.ref('SecondLotState'); // Reference to the 'SecondLotState' node in the database
var dataRef3 = database.ref('ThirdLotState'); // Reference to the 'ThirdLotState' node in the database

var ctx = document.getElementById('lotsChart').getContext('2d'); // Get the canvas element for the chart

var myChart = new Chart(ctx, { // Create a new Chart instance
  type: 'bar', // Specify the chart type as a bar chart
  data: {
    labels: ['Lot1', 'Lot2', 'Lot3'], // Labels for the x-axis representing the parking lots
    datasets: [{
      label: 'Parking Lots Status [ 0 - means Free, 1 - means Occupied ]', // Label for the dataset
      data: [0, 0, 0], // Initial data values for the y-axis representing the number of lots
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)', // Background color for the first bar
        'rgba(54, 162, 235, 0.2)', // Background color for the second bar
        'rgba(255, 206, 86, 0.2)' // Background color for the third bar
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)', // Border color for the first bar
        'rgba(54, 162, 235, 1)', // Border color for the second bar
        'rgba(255, 206, 86, 1)' // Border color for the third bar
      ],
      borderWidth: 1 // Border width for the bars
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true // Start the y-axis at zero
      }
    }
  }
});

dataRef1.on('value', function(snapshot) { // Event listener for changes in the 'FirstLotState' node
  var status = snapshot.val();
  myChart.data.datasets[0].data[0] = status === 'Free' ? 0 : 1; // Update the chart data based on the status
  myChart.update(); // Update the chart display
});

dataRef2.on('value', function(snapshot) { // Event listener for changes in the 'SecondLotState' node
  var status = snapshot.val();
  myChart.data.datasets[0].data[1] = status === 'Free' ? 0 : 1; // Update the chart data based on the status
  myChart.update(); // Update the chart display
});

dataRef3.on('value', function(snapshot) { // Event listener for changes in the 'ThirdLotState' node
  var status = snapshot.val();
  myChart.data.datasets[0].data[2] = status === 'Free' ? 0 : 1; // Update the chart data based on the status
  myChart.update(); // Update the chart display
});