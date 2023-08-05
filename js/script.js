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
    name: 'Mark Sloan',
    phone: '8091234567',
    email: 'john@domain.com',
    message: 'Pray for me',
  };
  
const url = 'https://script.google.com/macros/s/AKfycbwKgxiriCqaLhkS97Dw2K8M2_EI50F5pnBgLyalfYxj6REOYtHx0aoiVtslq5bPXPIy6A/exec';

let loginForm = document.getElementById("prayerForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    data.name = document.getElementById("name");
    data.phone = document.getElementById("phone");
    data.email = document.getElementById("email");
    data.message = document.getElementById("message");
    
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((data) => console.log('data', data))
    .catch((err) => console.log('err', err));
});


// Prayer Request submit form