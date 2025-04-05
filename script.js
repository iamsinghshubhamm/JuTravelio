const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [
  {
    email: "test@gmail.com",
    password: "test123",
    name: "Test User",
    mobile: "1234567890",
    dob: "2000-01-01",
    gender: "male",
  },
];

function validateForm() {
  var howManyPeople = document.getElementById("howManyPeople").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var description = document.getElementById("description").value;

  if (
    howManyPeople === "" ||
    startDate === "" ||
    endDate === "" ||
    description === ""
  ) {
    return false;
  } else {
    document.getElementById("bookNowButton").disabled = false;
    return alert("Submitted Successfully");
  }
}

document.getElementById("startDate").addEventListener("input", function () {
  var today = new Date().toISOString().split("T")[0];
  if (this.value < today) {
    alert("Please select a future date.");
    this.value = today;
  }
});

document.getElementById("endDate").addEventListener("input", function () {
  var today = new Date().toISOString().split("T")[0];
  if (this.value < today) {
    alert("Please select a future date.");
    this.value = today;
  }
});

function updateAuthUI() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const authButtons = document.getElementById("authButtons");
  const logoutButton = document.getElementById("logoutButton");

  if (authButtons && logoutButton) {
    authButtons.style.display = isLoggedIn ? "none" : "inline-block";
    logoutButton.style.display = isLoggedIn ? "inline-block" : "none";
  }
}

function handleLogout() {
  localStorage.removeItem("loggedIn");
  updateAuthUI();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedIn", "true");
    updateAuthUI();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginmodal")
    );
    if (modal) modal.hide();
  } else {
    alert("Invalid email or password. Please try again or register.");
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const mobile = document.getElementById("registerMobile").value;
  const dob = document.getElementById("registerDob").value;
  const gender = document.getElementById("registerGender").value;

  if (registeredUsers.some((user) => user.email === email)) {
    alert("Email already registered. Please login instead.");
    return;
  }

  registeredUsers.push({ name, email, password, mobile, dob, gender });
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  alert("Registration successful! Please login.");
  switchModal("login");
}

document.addEventListener("DOMContentLoaded", function () {
  updateAuthUI();

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  $(".responsive").slick({
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("#registerPassword").keyup(function () {
    let value = $(this).val();
    if (value.length > 0) {
      $("#registerPasstext").html("<span class='text-success'> Valid </span>");
    } else {
      $("#registerPasstext").html("<font color='red'> Required </font>");
    }
  });
  $("#registerEmail").keyup(function () {
    let value = $(this).val();
    let emailreg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (emailreg.test(value)) {
      $("#registerEmailtext").html(
        "<span class='text-success'> Validated </span>"
      );
    } else {
      $("#registerEmailtext").html("<font color='red'> Not Validated </font>");
    }
  });

  $("#registerMobile").keyup(function () {
    let value = $(this).val();
    let mobilereg = /^\d{10}$/;
    if (mobilereg.test(value)) {
      $("#registerMobiletext").html(
        "<span class='text-success'> Validated </span>"
      );
    } else {
      $("#registerMobiletext").html("<font color='red'> Not Validated </font>");
    }
  });
});

function switchModal(target) {
  const currentModal = target === "login" ? "registermodal" : "loginmodal";
  const targetModal = target === "login" ? "loginmodal" : "registermodal";

  const currentModalInstance = bootstrap.Modal.getInstance(
    document.getElementById(currentModal)
  );
  if (currentModalInstance) currentModalInstance.hide();

  setTimeout(() => {
    const targetModalInstance = new bootstrap.Modal(
      document.getElementById(targetModal)
    );
    targetModalInstance.show();
  }, 200);
}
