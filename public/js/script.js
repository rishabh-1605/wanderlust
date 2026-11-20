(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
})();

// we have make this to add the validation in the form . this is bootstamp class used for if required field in form is not filled then it will red validation in form .
//after addding this we added it in boilerplate file also (script=/js/script.js) and then in new.js file we added that class (novalidate class="needs-validation") that's it.
