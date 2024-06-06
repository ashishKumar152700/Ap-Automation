<!DOCTYPE html>
<html>
  <head>
    <title>Login</title>
    <jsp:include page="../../Basic/template/favicon.jsp" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap"
      rel="stylesheet"
    />
    <script src="https://kit.fontawesome.com/a81368914c.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="../../../static/js/jquery-3.1.1.min.js"></script>
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet" />
    <link
      href="../../../static/font-awesome/css/font-awesome.css"
      rel="stylesheet"
    />
    <link href="../../../static/css/animate.css" rel="stylesheet" />
    <link href="../../../static/css/style.css" rel="stylesheet" />
    <script src="../../Configration/js/globalConfig.js"></script>
    <script src="../../../cdn/js/sweetalert.min.js"></script>

    <style>
        video{
          width: 342px !important;
          height: 110px !important;
          background-position: center !important;
          object-fit: cover;
          background-color: #f3f3f4 !important;
          mix-blend-mode: multiply !important;
        }
    </style>
  </head>
  <body>
    <img class="wave" src="../../../images/wave.png" />
    <div class="container">
      <div class="img">
        <!-- <img src="img/undraw_online_stats_0g94.svg"> -->
        <!-- <img src="/img/imageedit_5_2120282042.png" alt=""> -->
        <img src="../../../images/3.svg" alt="" />
      </div>
      <div class="login-content"> 

        <!-- <img src="../../images/rsb_image.png" /> -->
        <video id="video" autoplay loop muted >
          <source src="../../images/rsb_logo_video.mp4" type="video/mp4">
      </video>
        <h3 class="title" style="color: #24537f">Welcome to RSB</h3>
        <p style="color: #24537f">Hi There! Nice to see you again</p>
          <form class="" role="form" action="#" id="kt_sign_in_form">
          <div class="" id="loader">
            <div class="d-none sk-spinner sk-spinner-double-bounce">
              <div class="sk-double-bounce1"></div>
              <div class="sk-double-bounce2"></div>
            </div>
            <!-- <br /><br /><br /> -->
            <br>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="div">
              <!-- <h5>Username</h5> -->
              <input
                type="text"
                class="input"
                id="username"
                placeholder="Username"
              />
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="div">
              <!-- <h5>Password</h5> -->
              <input
                type="password"
                class="input"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>
          <br />
          <input type="submit" class="btn" value="Login" />
        </form>
      </div>
    </div>
    <script src="../../Configration/js/globalConfig.js"></script>
    <script type="text/javascript" src="../js/login.js"></script>
  </body>
</html>
