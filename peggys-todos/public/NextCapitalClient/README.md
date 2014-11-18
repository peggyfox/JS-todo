**This client is from NextCapital and has been copied in order to make a change to Todo.USER.**

nextcapital-todo-api-client-jquery
==================================

Integrates into the Todo programming challenge API using jquery.

## Usage

*Start a session*

```javascript
    Todo.startSession({
      email:    theEmail,
      password: thePassword,
      success:  function(user) { alert('login success!') },
      error:    function(xhr)  { alert('login error!') }
    });
```

*Retrieve the User's list of Todos*

```javascript
    Todo.loadTodos({
      success: function(todos) { alert('todo load success!') },
      error:   function(xhr)   { alert('todo load error!') }
    });
```

*Update a Todo*

```javascript
    Todo.updateTodo({
      todoId: todoId,
      data: { is_complete: !isComplete },
      success: function(todo) { alert('todo update success!') },
      error:   function(xhr)  { alert('todo update error!') }
    });
```

*End a session*

```javascript
    Todo.endSession({
      success: function(todo) { alert('logout success!') },
      error:   function(xhr)  { alert('logout error!') }
    });
```
*Create a new user*

```javascript
  Todo.createUser({
    email:    theEmail,
    password: thePassword,
    success:  function(user) { alert('user create success!') },
    error:    function(xhr)  { alert('user create error!') }
  });
```

*Create a new todo*

```javascript
  Todo.createTodo({
    todo: {
      description: 'the description',
      is_complete: false
    },
    success: function(todo) { alert('todo create success!') },
    error:   function()     { alert('todo create error!') }
  });
```

## Installation

The easiest way to use this library in your project is to include it as a git submodule.

```bash
  git submodule add git@github.com:clarkr/todo-api-client-jquery.git ./client
```

Then, include the files in your html.

```html
  <script src='client/js/jquery-1.11.1.min.js'></script>
  <script src='client/js/todo.client.js'></script>
```
