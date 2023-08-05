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
  // Prayer Request submit form