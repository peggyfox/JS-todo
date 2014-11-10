$(document).ready(function() {
  // Todo.USER = 518
  // var todos = [{id: 1, description: "buy groceries and then go shopping and then finish todo app then go to the park and cook pasta for dinner and then lets add more lines to this", is_complete: false}, {id: 2, description: "laundry", is_complete: true}];
  // displayTodoInterface(todos);

  $(".user_links").on("click", function(event) {
    event.preventDefault();
    var link = $(this).attr("href")
    appendForm(link);
  })

  $(".form").on("submit", "#users_form", function(event) {
    event.preventDefault();
    var theEmail = $("#email").val();
    var thePassword = $("#password").val();
    if($(this).attr("action") == "/signup") {
      Todo.createUser({
        email:    theEmail,
        password: thePassword,
        success:  function(user) { 
          appendForm("login");
        },
        error:    function(xhr)  { alert('Unable to Create Account') }
      });
    } else if($(this).attr("action") == "/login") {
      Todo.startSession({
        email:    theEmail,
        password: thePassword,
        success:  function() {
          $(".form").css("display","none")
          $("#todo-interface").css("display", "block")
          loadAndDisplayTodos();
        },
        error:    function(xhr)  { alert('Login Error!') }
      });
    };
  });

  $("#todo-interface").on("submit","#todo_form",function(event) {
    event.preventDefault();
      var todoDescription = $("#newTodo").val();
      Todo.createTodo({
      todo: {
        description: todoDescription,
        is_complete: false
      },
      success: function(todo) { alert('todo create success!') 
        loadAndDisplayTodos();
      },
      error:   function()     { alert('todo create error!') }
    });
  });

  $("#todo-interface").on("click", ".check_box", function() {
    var todoId = ($(this).attr("data-id"))
    var data_complete = ($(this).attr("data-complete"))
    var isComplete = false
    if(data_complete == 'true'){ isComplete = true} 
    Todo.updateTodo({
      todoId: todoId,
      data: { is_complete: !isComplete },
      success: function(todo) { 
        alert('todo update success!') 
        loadAndDisplayTodos();},
      error:   function(xhr)  { alert('todo update error!') }
    });
  });

  $("#todo-list").sortable();
  $( "#sortable" ).disableSelection();
})

var loadAndDisplayTodos = function() {
  Todo.loadTodos({
    success: function(todos) { 
      alert('todo load success!'); 
      displayTodoInterface(todos);
    },
    error:   function(xhr)   { alert('todo load error!') }
  });
}

var displayTodoInterface = function(todos) {
  $("#todo-form-div").text("");
  $("#todo-list").text("");
    addTodoForm();
    listTodos(todos);
};

var addTodoForm = function() {
  this.todoForm =  "<form id='todo_form' action='users/"+ Todo.USER.id +"/todos' method='post'><input type='text' id='newTodo' name='todo' placeholder='add a todo'></form>"
  $("#todo-form-div").append(this.todoForm)
}

var listTodos = function(todos) {
  for(var i = 0; i < todos.length; i++) {
    appendTodo(todos[i])
  }
}


var appendTodo = function(todo){
  var checkBoxFill = '<i class="fa fa-square-o"></i>'
  if(todo.is_complete == true){
    checkBoxFill = '<i class="fa fa-check-square-o"></i>'
  }
  var todoDiv = "<div class='todo_list_item'><div class='check_box' data-id="+ todo.id +" data-complete="+ todo.is_complete +">"+ checkBoxFill +"</div><div class='todo_description'>"+ todo.description +"</div>"
  $("#todo-list").append(todoDiv);
}

var handleLink = function(link) {
  if(link == "signup") {
    return userForm(link, "Create Account");
  } else if (link == "login") {
    return userForm(link, "Log In")
  };
}

var appendForm = function(link) {
  var form = handleLink(link);
  $(".homepage").css("display","none");
  $(".form").text("");
  $(".form").append(form);
  $(".form").css("display","block")
}

function userForm(link, submit) {
  this.actionMethod = "<form action='/" + link + "' method='post' id='users_form' >";
  this.inputs = "Email: <input type='text' id='email' name='email' value='fox@mail.com' placeholder='example@todo.com' size='32' height='6'><br>Password: <input type='password' id='password' name='password' value='password'><br>";
  this.submit = "<div class='submit_button'> <input type='submit' value='" + submit + "' class='submit'></div>";
  return this.actionMethod + this.inputs + this.submit + "</form>"
}