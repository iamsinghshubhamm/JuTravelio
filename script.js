
  function validateForm() {
    var howManyPeople = document.getElementById("howManyPeople").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var description = document.getElementById("description").value;

    if (howManyPeople === "" || startDate === "" || endDate === "" || description === "") {
      return false; // Prevent form submission if any fields are empty
    } else {
      // Enable the "Book Now" button if all fields are filled
      document.getElementById("bookNowButton").disabled = false;
      return alert('Submitted Successfully'); // Allow form submission
    }
  }
    // alert to prevent past date bookings
    document.getElementById('startDate').addEventListener('input', function() {
        var today = new Date().toISOString().split('T')[0];
        if (this.value < today) {
          alert('Please select a future date.');
          this.value = today;
        }
      });
    document.getElementById('endDate').addEventListener('input', function() {
        var today = new Date().toISOString().split('T')[0];
        if (this.value < today) {
          alert('Please select a future date.');
          this.value = today;
        }
      });

  $(document).ready(function() {
    // Initialize slick carousel
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Password validation
    $("#password").keyup(function() {
        let value = $(this).val();
        let passreg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
        if (passreg.test(value)) {
            $("#passtext").html("<span class='text-success'> Validated </span>");
        } else {
            $("#passtext").html("<font color='red'> Not Validated </font>");
        }
    });

    // Email validation
    $("#email").keyup(function() {
        let value = $(this).val();
        let emailreg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (emailreg.test(value)) {
            $("#emailtext").html("<span class='text-success'> Validated </span>");
        } else {
            $("#emailtext").html("<font color='red'> Not Validated </font>");
        }
    });
    // Mobile validation
    $("#mobile").keyup(function() {
        let value = $(this).val();
        let mobilereg = /^\d{10}$/;
        if (mobilereg.test(value)) {
            $("#mobiletext").html("<span class='text-success'> Validated </span>");
        } else {
            $("#mobiletext").html("<font color='red'> Not Validated </font>");
        }
    });
});

// Switch modal function
function switchModal(target) {
    const currentModal = target === 'login' ? 'registermodal' : 'loginmodal';
    const targetModal = target === 'login' ? 'loginmodal' : 'registermodal';

    const currentModalInstance = bootstrap.Modal.getInstance(document.getElementById(currentModal));
    if (currentModalInstance) {
        currentModalInstance.hide();
    }

    setTimeout(() => {
        const targetModalInstance = new bootstrap.Modal(document.getElementById(targetModal));
        targetModalInstance.show();
    }, 200);
}

  
