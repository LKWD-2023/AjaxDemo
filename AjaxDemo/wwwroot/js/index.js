$(() => {
    const modal = new bootstrap.Modal($('.modal')[0]);

    function refreshTable(cb) {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td>
                <button class='btn btn-warning edit' data-person-id='${person.id}'>Edit</button>
                <button class='btn btn-danger delete' data-person-id='${person.id}'>Delete</button>
            </td>
</tr>`)
            });

            if (cb) {
                cb();
            }
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $("#save-person").show();
        $("#update-person").hide();
        $(".modal-title").text('Add Person');
        modal.show();
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();


        //const person = {
        //    firstName,
        //    lastName,
        //    age
        //};

        $.post('/home/addperson', { firstName, lastName, age }, function () {
            refreshTable(() => {
                modal.hide();
            });
        });


    });

    $('table').on('click', '.delete', function () {
        const button = $(this);
        const id = button.data('person-id');
        $.post('/home/delete', { id }, function () {
            refreshTable();
        });
    });

    $("table").on('click', '.edit', function () {
        const button = $(this);
        const id = button.data('person-id');
        $(".modal-title").text('Edit Person');

        $.get('/home/getbyid', { id }, function ({ id, firstName, lastName, age }) {
            $("#firstName").val(firstName);
            $("#lastName").val(lastName);
            $("#age").val(age);
            modal.show();
        });
        $(".modal").data('person-id', id);
        $("#update-person").show();
        $("#save-person").hide();
    });

    $("#update-person").on('click', function () {
        const id = $(".modal").data('person-id');
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        $.post('/home/update', { firstName, lastName, age, id }, function () {
            refreshTable();
            modal.hide();
        });
        
    });

    
});

//const obj = {
//    firstName: 'John',
//    lastName: 'Doe',
//    age: 45
//}

//function foo({ firstName }) {
//    console.log(firstName);
//}

//foo(obj);