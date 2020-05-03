const source = $('#player-template').html();
const template = Handlebars.compile(source);

let players_array = []


const render = function() {
    $('#players').empty()
    const newHTML = template({ data: players_array});
    $('#players').append(newHTML);
}

$('button').on('click', function () {
    const teamName =$('input').val()
    $.get(`/teams/${teamName}`,function(data) {
        players_array = data
        render()
    })
})




