$('.card').click(function () {
    $(this).toggleClass('flipped');
});

let playerData, userInput;

const $input = $('input[type="text"]');
const $playerName = $('#player-name');
const $currentTeam = $('#team');
const $positionPlayed = $('#position');
const $handed = $('#handed');


$('form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();
    // calling preventDefault() on a 'submit' event will prevent a page refresh  
    userInput = $input.val();
    // getting the user input
    $.ajax({
        url: `https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&name_part=%27${userInput}%25`
    }).then(
        (data) => {
            playerData = data;
            render();
        },
        (error) => {
            console.log('bad request', error);
        }
    );
}

function render() {
    $playerName.text(playerData.search_player_all.queryResults.row.name_display_first_last);
    $currentTeam.text(playerData.search_player_all.queryResults.row.team_full);
    $positionPlayed.text(playerData.search_player_all.queryResults.row.position);
    $handed.text(playerData.search_player_all.queryResults.row.bats);
}
