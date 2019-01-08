$(document).ready(function() {
    $("tbody").on('click', ".btn-danger", function() {
        var employee_id = $(this).attr("id").substring(3);

        $.ajax({
            url: "/employees/" + employee_id,
            type: 'DELETE',
            statusCode: {
                200: function() {
                    location.reload();
                }
            }
        });
    });
});