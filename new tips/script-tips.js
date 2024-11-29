function toggleMenu() {
  let navbar = document.querySelector(".navbar");
  let hamburger = document.querySelector(".hamburger");
  navbar.classList.toggle("open");
  hamburger.classList.toggle("active");
}
$(document).ready(function () {
  $("#newsletterForm").on("submit", function (event) {
    event.preventDefault();

    let email = $("#newsletterEmail").val();
    let $message = $("#newsletterMessage");

    if (email) {
      $message.text("Thank you for subscribing!")
              .css("color", "green"); 
      $("#newsletterEmail").val(''); 
    } else {
      $message.text("Please enter a valid email address. It should consist of @")
              .css("color", "red");
    }
  });})