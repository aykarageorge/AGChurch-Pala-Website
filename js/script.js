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
  
const url = 'https://script.google.com/macros/s/AKfycbyM5O1vyuoDfn257P0gMyrPSmmALnQyIOjzbBBWQv0oYRGXDMNoL2c6HI5zQGXNJrqK/exec';

 function handleSubmit(event) {
  event.preventDefault();
  if (!document.getElementById("name").value && !document.getElementById("message").value) {
    alert("Atleast provide Name and your Prayer Request before submitting.")
    return;
  }
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
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(data),
          })
          .then((res) => res.json())
          .then((data) => {
            console.log('data', data);
            if (data['status'] == 'OK')
                alert("Prayer request sent successfully.");
            else
                alert("Some issue occured and Prayer request couldn't be sent. Please try again later.");
            document.getElementById("prayerForm").reset();
            return false;
            })
          .catch((err) => console.log('err', err));
        });
    });
  }

  document.getElementById("prayerForm").addEventListener("submit", handleSubmit);
  // Prayer Request submit form
