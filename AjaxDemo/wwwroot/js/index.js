$(() => {
    const modal = new bootstrap.Modal($('.modal')[0]);


    function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>

</tr>`)
            });
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
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
            modal.hide();
            refreshTable();
        });

       
    });

})