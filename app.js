$(document).ready(function() {
  let edit=false;
  fetchTasks();
  $("#task-result").hide();
  $("#search").keyup(function() {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        data: { search },
        type: "POST",
        success: function(response) {
          if (!response.error) {
            let tasks = JSON.parse(response);
            let template = "";
            tasks.forEach(task => {
              template += `
                              <li><a href="#" class="task-item">${
                                task.title
                              }</a></li>
                                `;
            });
            $("#task-result").show();
            $("#container").html(template);
          }
        }
      });
    } else {
      $("#task-result").hide();
    }
  });
  $("#task-form").submit(function(e) {
    const posData = {
      title: $("#name").val(),
      description: $("#description").val(),
      Id: $("#taskId").val()
    };
    let url= edit===false ? 'task-add.php' : 'task-edit.php';
    $.post(url, posData, function(response) {
      $("#task-form").trigger("reset");
      alert(response);
      fetchTasks();
    });
    e.preventDefault();
  });
  function fetchTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function(response) {
        let tasks = JSON.parse(response);
        let template = "";
        tasks.forEach(task => {
          template += `
                        <tr>
                            <td>${task.Id}</td>
                            <td><a href="#" class="task-item" taskId="${
                              task.Id
                            }">${task.title}</a></td>
                            <td>${task.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger" taskId="${
                                  task.Id
                                }">DELETE</button>
                            </td>
                        </tr>
                          `;
        });
        $("#tasks").html(template);
      }
    });
  }
  $(document).on("click", ".task-delete", function() {
    if (confirm("Are you sure you want to delete it?")) {
      let element = $(this)[0];
      let Id = $(element).attr("taskId");
      $.post("task-delete.php", { Id }, function(response) {
        fetchTasks();
      });
    }
  });
  $(document).on("click", ".task-item", function() {
    let element = $(this)[0];
    let Id = $(element).attr("taskId");
    $.post("task-single.php", { Id }, function(response) {
      const task=JSON.parse(response);
      $('#name').val(task[0].title);
      $('#description').val(task[0].description);
      $('#taskId').val(Id);
      edit=true;
    });
  });
});
