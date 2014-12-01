describe("User Forms", function() {

  describe("handleLink", function() {

    it("should determine the value for the Submit button for signup", function() {
      expect(handleLink("signup")).toEqual("Create Account");
      });
    it("should determine the value for the Submit button for login", function() {
      expect(handleLink("login")).toEqual("Log In");
    });

  });

  describe ("userForm", function() {

    it("should return an html form for user signup", function() {
      expect(userForm("signup", "Create Account").slice(0,22)).toEqual("<form action='/signup'");
      });

    it("should return an html form for user signup", function() {
      expect(userForm("login", "Create Account").slice(0,21)).toEqual("<form action='/login'");
    });

  });

});

describe("Todos", function() {

  describe("createTodoForm", function() {
    it("should create a form with an action to that users todos", function() {
      expect(createTodoForm(1)).toContain("action='users/1/todos'");
    });
  });

  describe("createCheckBox", function() {
    it("should return an empty box if todo is not completed", function() {
      expect(createCheckBox(false)).toEqual('<i class="fa fa-square-o"></i>')
    });

    it("should return a checked box if todo is complete", function() {
      expect(createCheckBox(true)).toEqual('<i class="fa fa-check-square-o"></i>')
    });
  });

  describe("createTodo",function() {
    it("should return html containing a data-id selector with the id number for the given todo", function() {
      expect(createTodo(1, false, "new todo", '<i class="fa fa-square-o"></i>')).toContain("data-id=1");
    });

    it("should return html containing the description for the given todo", function() {
      expect(createTodo(1, false, "new todo", '<i class="fa fa-square-o"></i>')).toContain("new todo");
    });

    it("should return html containing a data-complete selector with the completion status for the given todo", function() {
      expect(createTodo(1, false, "new todo", '<i class="fa fa-square-o"></i>')).toContain("data-complete=false");
    })

  })

})

