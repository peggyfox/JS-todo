$(document).ready(function() {
  $("a").on("click", function(event) {
    event.preventDefault();
    $(".form").text("");
    var link = $(this).attr("href")
    console.log(link);
    var form = handleLink(link);
    $(".form").append(form)
  })
})

var handleLink = function(link) {
  if(link == "/signup") {
    return userForm(link, "Create Account");
  } else if (link == "/login") {
    return userForm(link, "Log In")
  };
}

function userForm(link, submit) {
  this.actionMethod = "<form action='" + link + "' method='post'>";
  this.inputs = "Email: <input type='text' name='email' placeholder='example@todo.com' size='32'><br>Password: <input type='password' name='password'><br>";
  this.submit = "<div class='submit_button'> <input type='submit' value='" + submit + "' class='submit'></div>";
  return this.actionMethod + this.inputs + this.submit + "</form>"
}