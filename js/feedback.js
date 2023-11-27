//Firebase configuration
var firebaseConfig = {
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

// Get the feedback input element, submit button, and edit button
var feedbackInput = document.getElementById('feedbackInput');
var submitFeedback = document.getElementById('submitFeedback');
var editButton = document.getElementById('editButton');

// Add an event listener to the submit button
submitFeedback.addEventListener('click', function() {
    // Get the feedback from the input element
    var feedback = feedbackInput.value;

    // Check if the feedback is empty
    if (feedback.trim() === '') {
        // Display an error message o
        alert('Please enter your feedback before submitting');
        return;
    }

    // Write the feedback to Firebase
    firebase.database().ref('feedback/').push({
        feedback: feedback
    });

    // Clear the input element
    feedbackInput.value = '';
});

// Get the feedback container element
var feedbackContainer = document.getElementById('feedbackContainer');

// Get the "No feedbacks found" message element
var noFeedbackMessage = document.getElementById('noFeedbackMessage');

// Get the feedback from Firebase
firebase.database().ref('feedback/').on('value', function(snapshot) {
    // Clear the feedback container
    feedbackContainer.innerHTML = '';

    // Get the feedback data
    var feedbackData = snapshot.val();

    // Check if there are no feedback entries
    if (feedbackData === null) {
        // Display the "No feedbacks found" message
        noFeedbackMessage.style.display = 'block';
        return;
    }

    // Hide the "No feedbacks found" message
    noFeedbackMessage.style.display = 'none';
});

// Get the feedback from Firebase
firebase.database().ref('feedback/').on('value', function(snapshot) {
    // Clear the feedback container
    feedbackContainer.innerHTML = '';

    // Get the feedback data
    var feedbackData = snapshot.val();

    // This loop is used to iterate over the feedbackData object. 
    //For each key in the object, it retrieves the corresponding feedback and assigns it
    // to the feedback variable. This is typically done in order to process and  display 
    //each piece of feedback on a webpag
    for (var key in feedbackData) {
        var feedback = feedbackData[key].feedback;

        // Create a new div element for the feedback
        var feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'Feedback';
        
        // Create a span element for the feedback text
        var feedbackText = document.createElement('span');
        feedbackText.textContent = feedback;
        
        // Create a button element to edit the feedback
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.setAttribute('data-key', key); // Store the key as a data attribute
        
        // Add a click event listener to the edit button
        editButton.addEventListener('click', function() {
            // Get the key of the feedback to be edited
            var feedbackKey = this.getAttribute('data-key');
            
            // Retrieve the feedback from Firebase
            var feedbackRef = firebase.database().ref('feedback/' + feedbackKey);
            feedbackRef.once('value', function(snapshot) {
                var feedbackData = snapshot.val();
                var feedbackValue = feedbackData.feedback;
                
                // Prompt the user to enter the updated feedback
                var updatedFeedback = prompt('Enter the updated feedback:', feedbackValue);
                
                // Update the feedback in Firebase
                feedbackRef.update({
                    feedback: updatedFeedback
                });
            });
        });
        
        // Create a button element to delete the feedback
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('data-key', key); // Store the key as a data attribute
        
        // Add a click event listener to the delete button
        deleteButton.addEventListener('click', function() {
            // Get the key of the feedback to be deleted
            var feedbackKey = this.getAttribute('data-key');
            
            // Remove the feedback from Firebase
            firebase.database().ref('feedback/' + feedbackKey).remove();
        });
        
        // Add the feedback text, edit button, and delete button to the feedback div
        feedbackDiv.appendChild(feedbackText);
        feedbackDiv.appendChild(editButton);
        feedbackDiv.appendChild(deleteButton);

        // Add the feedback div to the feedback container
        feedbackContainer.appendChild(feedbackDiv);
    }
});