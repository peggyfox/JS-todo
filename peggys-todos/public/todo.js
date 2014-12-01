$(document).ready(function() {

  if(Todo.USER.id == null && isInSession() == true) {
    Todo.USER.id = localStorage.getItem("userID");
    Todo.USER.api_token = localStorage.getItem("userAPI");
    displayInSession();
    loadAndDisplayTodos();
  } else { 
    displayNoSession();
  }

  $(".user_links").on("click", function(event) {
    event.preventDefault();
    var link = $(this).attr("href")
    appendForm(link);
  });

  $(".logout_link").on("click", function(event) {
    event.preventDefault();
    removeUserFromStorage();
    logoutUserFromClient();
    displayNoSession();
  });

  $(".form").on("submit", "#users_form", function(event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    if($(this).attr("action") == "/signup") {
      createUserFromClient(email, password);
    } else if($(this).attr("action") == "/login") {
      loginUserFromClient(email, password);
    };
  });

  $("#todo-interface").on("submit","#todo_form",function(event) {
    event.preventDefault();
    var todoDescription = $("#newTodo").val();
    createTodoFromClient(todoDescription);
  });

  $("#todo-interface").on("click", ".check_box", function() {
    var todoId = ($(this).attr("data-id"))
    var data_complete = ($(this).attr("data-complete"))
    var isComplete = false
    if(data_complete == 'true'){ isComplete = true} 
    updateTodoFromClient(todoId, isComplete)
  });

  $("#todo-list").sortable();
  $( "#sortable" ).disableSelection();
})

// ------------------- Interface -------------------------------

function displayNoSession() {
  $(".form").css("display","none")
  $(".homepage").css("display","block");
  $("#user_links_div").css("display","inline");
  $("#logout_link_div").css("display","none");
  $("#todo-interface").css("display", "none")
}

function displayInSession() {
  $(".form").css("display","none")
  $(".homepage").css("display","none");
  $("#user_links_div").css("display","none");
  $("#logout_link_div").css("display","inline");
  $("#todo-interface").css("display", "block")
}

// ------------------- Browser Sessions -------------------------------

function isInSession() {
  if(localStorage.getItem("userID")) {
    return true
  } else {return false};
};

function storeUser() {
  localStorage.setItem("userID", Todo.USER.id);
  localStorage.setItem("userAPI", Todo.USER.api_token);
};

function removeUserFromStorage() {
  localStorage.removeItem("userID");
  localStorage.removeItem("userAPI");
};


// ------------------- Client Functions -------------------------------

function createUserFromClient(userEmail, userPassword) {
  Todo.createUser({
    email:    userEmail,
    password: userPassword,
    success:  function(user) { 
      storeUser();
      displayInSession();
      loadAndDisplayTodos();
    },
    error:    function(xhr)  { alert('Unable to Create Account') }
  });
}

function loginUserFromClient(userEmail, userPassword) {
  Todo.startSession({
    email:    userEmail,
    password: userPassword,
    success:  function() {
      storeUser();
      displayInSession();
      loadAndDisplayTodos();
    },
    error:    function(xhr)  { alert('Login Error!') }
  });
}

function logoutUserFromClient() {
  Todo.endSession({
    success: function(todo) {
    },
    error:   function(xhr)  { alert('Logout Error!') }
  });
}

function createTodoFromClient(todoDescription) {
  Todo.createTodo({
    todo: {
      description: todoDescription,
      is_complete: false
    },
    success: function(todo) { 
      loadAndDisplayTodos();
    },
    error:   function()     { alert('Todo Create Error!') }
  });
}

function updateTodoFromClient(todoId, isComplete) {
  Todo.updateTodo({
    todoId: todoId,
    data: { is_complete: !isComplete },
    success: function(todo) { 
      loadAndDisplayTodos();
    },
    error:   function(xhr)  { alert('Todo Update Error!') }
  });
}



// ------------------- Todo List -------------------------------

function loadAndDisplayTodos() {
  Todo.loadTodos({
    success: function(todos) {  
      displayTodoInterface(todos);
    },
    error:   function(xhr)   { alert('todo load error!') }
  });
}

function displayTodoInterface(todos) {
  $("#todo-form-div").text("");
  $("#todo-list").text("");
    addTodoForm();
    listTodos(todos);
};

function addTodoForm() {
  var form = createTodoForm(Todo.USER.id);
  $("#todo-form-div").append(form)
}

function createTodoForm(userId) {
  var todoForm =  "<form id='todo_form' action='users/"+ userId +"/todos' method='post'><input type='text' id='newTodo' name='todo' placeholder='add a todo'></form>"
  return todoForm;
}

function listTodos(todos) {
  for(var i = 0; i < todos.length; i++) {
    appendTodo(todos[i].id, todos[i].description, todos[i].is_complete)
  }
}

function appendTodo(id, desc, completion) {
  var checkBoxFill = createCheckBox(completion);
  var todoDiv = createTodo(id, completion, desc, checkBoxFill)
  $("#todo-list").append(todoDiv);
}

function createTodo(id, completion, desc, checkBoxFill) {
  var todoDiv = "<div class='todo_list_item'><div class='check_box' data-id="+ id +" data-complete="+ completion +">"+ checkBoxFill +"</div><div class='todo_description'>"+ desc +"</div>"
  return todoDiv
}

function createCheckBox(completion) {
  var checkBoxFill = '<i class="fa fa-square-o"></i>'
  if(completion == true){
    checkBoxFill = '<i class="fa fa-check-square-o"></i>'
  }
  return checkBoxFill
}


// ------------------- Signup & Login -------------------------------

function appendForm(link) {
  var submitText = handleLink(link);
  var form = userForm(link, submitText);
  $(".homepage").css("display","none");
  $(".form").text("");
  $(".form").append(form);
  $(".form").css("display","block")
}

function handleLink(link) {
  if(link == "signup") {
    return "Create Account"
  } else if (link == "login") {
    return "Log In"
  };
}

function userForm(link, submit) {
  var actionMethod = "<form action='/" + link + "' method='post' id='users_form' >",
  inputs = "Email: <input type='text' id='email' name='email' placeholder='example@todo.com' size='32' height='6'><br>Password: <input type='password' id='password' name='password' ><br>",
  submit = "<div class='submit_button'> <input type='submit' value='" + submit + "' class='submit'></div>",
  form = actionMethod + inputs + submit + "</form>"
  return form;
}

