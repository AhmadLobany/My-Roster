const source = $('#player-template').html();
const template = Handlebars.compile(source);

let players_array = []
let dreamTeam = []

const addPlayer = function(playerInfo) {
    const player = {player: playerInfo}
    $.post('/roster',player, function(response) {
        dreamTeam = response
    })
}


const render = function(arr) {
    $('#players').empty()
    const newHTML = template({ data: arr});
    $('#players').append(newHTML);
}

$('#getBut').on('click', function () {
    const teamName =$('input').val()
    $.get(`/teams/${teamName}`,function(data) {
        players_array = data
        render(players_array)
    })
})

$('#dreamBut').on('click', function () {
    $.get(`/dreamTeam`,function(data) {
        dreamTeam = data
        render(dreamTeam)
    })
})


$('#players').on('click','.player',function() {
    const playerFullName = ($(this).children('.info').text()).split(" ")
    const player = players_array.find(u=> u.firstName==playerFullName[0] &&  u.lastName==playerFullName[1]) 
    if(player!=undefined) addPlayer(player)
})



