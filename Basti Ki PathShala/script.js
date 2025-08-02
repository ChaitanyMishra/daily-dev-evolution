 document.getElementById('volunteer-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      if (name && email && phone && message) {
        console.log('Form Submitted:', { name, email, phone, message });
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('volunteer-form').reset();

        setTimeout(() => {
          document.getElementById('success-message').style.display = 'none';
        }, 5000);
      }
    });