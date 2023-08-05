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
  
const url = 'https://script.google.com/macros/s/AKfycbyOi1EM7FqpsPRErVPYN9oQtjFBsDx4g7VdVG3AlVOKR0zNXDm-mWm-2FLsWv5GNgHBzQ/exec';

let loginForm = document.getElementById("prayerForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    data.gCaptchaResponse = document.getElementById('g-recaptcha-response').value;
    data.name = document.getElementById("name");
    data.phone = document.getElementById("phone");
    data.email = document.getElementById("email");
    data.message = document.getElementById("message");
    
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        'mode': 'no-cors', 
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => console.log('data', data))
    .catch((err) => console.log('err', err));
});


// Prayer Request submit form
