$(() => {
    $("#add-number").on('click', function () {

        const from = $("#from").val();
        const to = $("#to").val();


        $.get('/randomdata/getnumber', {from, to}, function (obj) {
            $("#numbers").append(`<li class='display-2'>${obj.number}</li>`)
        })
    })
});