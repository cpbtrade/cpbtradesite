// CPBTrade LTD — shared site behaviour

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Mark current page as active in the nav
  var here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === here) link.classList.add("active");
  });

  document.querySelectorAll("form[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("#form-status");
      var name = form.querySelector("[name=name]");
      var subject = "Website enquiry from " + (name ? name.value : "website visitor");
      var body = [];
      form.querySelectorAll("input, select, textarea").forEach(function (field) {
        if (!field.name) return;
        var fieldLabel = field.closest(".form-row")
          ? field.closest(".form-row").querySelector("label")
          : null;
        var labelText = fieldLabel ? fieldLabel.textContent : field.name;
        body.push(labelText + ": " + field.value);
      });
      var mailto =
        "mailto:carlfbaretail@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body.join("\n"));

      window.location.href = mailto;

      if (status) {
        status.textContent =
          "Opening your email client to send this enquiry to CPBTrade LTD. If nothing opens, email carlfbaretail@gmail.com directly.";
        status.classList.add("show", "ok");
      }
      form.reset();
    });
  });
});
