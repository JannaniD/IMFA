const MongoClient = require('mongodb').MongoClient;

// Connection URI for your MongoDB Atlas cluster
const uri = 'mongodb+srv://cutiefunny555:mongodb23@cluster0.ypqygod.mongodb.net/';

// MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB Atlas
client.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  }

  // Access the database and collection signup pannunga
  const db = client.db('QrAuthentication');
  const collection = db.collection('values');

  // Retrieve the user's data from the database
  collection.findOne({}, function (err, user) {
    if (err) {
      console.error(err);
      return;
    }

    if (user) {
      const positions = [];
      const values = [];

      // Extract positions and values from the user object
      for (let i = 0; i < user.length; i++) {
        positions.push(user[i].position);
        values.push(user[i].value);
      }

      // Generate 4 random positions
      const pos = positions.sort(() => 0.5 - Math.random());

      // Get the corresponding values for the positions
      const val = pos.map((position) => {
        const index = positions.indexOf(position);
        return values[index];
      });
      // Display the retrieved data
      console.log('Retrieved positions:', positions);
      console.log('Retrieved values:', values);

      // Rest of the code for updating boxes, checking values, and event listeners
      // ...

      // Function to check values entered by the user
      function checkValues() {
        const inputs = document.getElementsByTagName('input'); // get all input elements
        let match = true; // initialize match flag to true
  
        for (let i = 0; i < inputs.length; i++) {
          if (parseInt(inputs[i].value) !== val[i]) {
            // compare entered value with val array
            match = false; // set match flag to false if values don't match
            break; // exit loop if values don't match
          }
        }
  
        if (match) {
          alert('Values match!'); // display message if values match
        } else {
          alert("Values don't match!"); // display message if values don't match
          location.reload();
        }
      }
  
      // Event listener for keyup event on input fields
      $('.digit-group').find('input').each(function () {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function (e) {
          var parent = $($(this).parent());
          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));
            if (prev.length) {
              $(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39
          ) {
            var next = parent.find('input#' + $(this).data('next'));
            if (next.length) {
              $(next).select();
            } else {
              if (parent.data('checker') === 'check') {
                checkValues();
              }
            }
          }
        });
      });

    } else {
      console.log('User not found.');
    }
  });
});






