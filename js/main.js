$(document).ready(function(){
    // select input field and call ajax request on keyup
    $("#searchUser").on('keyup', function(e){
        // console.log("key pressed!");
        // console.log(e.target.value);

        // Put the value in variable username
        let username = e.target.value;
        
        // Make request to Github
        $.ajax({
            url:'https://api.github.com/users/' + username, 
            // my data
            data: {
                client_id:'2ac9b390903333e799de',
                client_secret:'d8dbb523e73b8b464b5a9f548954456fe53931e1'
            }
        }).done(function(user){
            console.log(user);
        });

    })
});