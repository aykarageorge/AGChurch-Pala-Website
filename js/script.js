$(function() {
    $('.ministry_image').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    });		
});

$(function() {
    $('.news_image').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    });		
});


// Prayer Request submit form

const data = {
    gCaptchaResponse: null,
    name: 'Mark Sloan',
    phone: '8091234567',
    email: 'john@domain.com',
    message: 'Pray for me',
  };

const siteKey = "6LevfoInAAAAAOvAyN_eLNlGG0sQxBlxJZXFwFJ5";
  
const url = 'https://script.google.com/macros/s/AKfycbyOi1EM7FqpsPRErVPYN9oQtjFBsDx4g7VdVG3AlVOKR0zNXDm-mWm-2FLsWv5GNgHBzQ/exec';

// let loginForm = document.getElementById("prayerForm");

// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     data.gCaptchaResponse = document.getElementById('g-recaptcha-response').value;
//     data.name = document.getElementById("name");
//     data.phone = document.getElementById("phone");
//     data.email = document.getElementById("email");
//     data.message = document.getElementById("message");
    
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/plain;charset=utf-8',
//             'Access-Control-Allow-Origin': '*',
//         },
//         body: JSON.stringify(data),
//     })
//     .then((res) => res.json())
//     .then((data) => console.log('data', data))
//     .catch((err) => console.log('err', err));
// });


// Prayer Request submit form

 // Function to handle form submission
 function handleSubmit(event) {
    event.preventDefault();

    // Make an API call to get the reCAPTCHA token
    grecaptcha.ready(function () {
      grecaptcha
        .execute(siteKey, { action: "submit" })
        .then(function (token) {
            // Add the reCAPTCHA token to the form data
            data.gCaptchaResponse = token;
            data.name = document.getElementById("name").value;
            data.phone = document.getElementById("phone").value;
            data.email = document.getElementById("email").value;
            data.message = document.getElementById("message").value;

          fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data),
          })
          .then((res) => res.json())
          .then((data) => console.log('data', data))
          .catch((err) => console.log('err', err));
        });
    });
  }

  document.getElementById("prayerForm").addEventListener("submit", handleSubmit);