<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Background Image Page</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    <style>
        body {
            background-image: url('3184388.jpg'); /* Replace 'your-image.jpg' with the path to your image */
            /* background-image: url('8068386.jpg');   */
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative; /* Add this to make the positioning relative */
        }

        .button-container {
            text-align: center;
        }

        .button-container button {
            padding: 10px 20px;
            font-size: 18px;
            margin: 10px;
        }

        /* Style for the additional image */
        .additional-image {
            position: absolute;
            top: 10px; /* Adjust the top position as needed */
            right: 10px; /* Adjust the right position as needed */
            width: 180px; /* Adjust the width as needed */
            height: auto;
        }

        .btn.btn-outline-secondary {
    color: white; /* You can replace 'red' with your desired text color */
  }
  .btn.btn-info {
    color: white; /* You can replace 'blue' with your desired text color */
  }
    </style>
    </style>
</head>
<body>
    <!-- Additional image added here -->
    <img src="RSB_logo.png" alt="Additional Image" class="additional-image">

    <div class="button-container">
         <!-- <a class="btn btn-outline-secondary btn-rounded mx-4" href="appointment.html">Register for Appointment</a> -->
         <a class="btn btn-secondary btn-rounded mx-4" href="appointment.jsp">Register for Appointment</a>
         <!-- <a class="btn btn-outline-primary btn-rounded" href="#">Login</a> -->
         <!-- <a class="btn btn-primary btn-rounded" href="#">Login</a> -->
         <a class="btn btn-info btn-rounded" href="../../Login/template/login.jsp">Login</a>
    </div>
</body>
</html>
