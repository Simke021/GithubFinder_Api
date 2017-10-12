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
            data:{
                client_id:'2ac9b390903333e799de',
                client_secret:'d8dbb523e73b8b464b5a9f548954456fe53931e1'
            }
        }).done(function(user){
            // Latest repos request
            $.ajax({
                url:'https://api.github.com/users/'+ username +'/repos',
                data:{
                    client_id:'2ac9b390903333e799de',
                    client_secret:'d8dbb523e73b8b464b5a9f548954456fe53931e1',
                    sort:'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                // console.log(repos);

                // Looping all repos
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default btn-xs">Repository Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            
            // select div with id="profile" and put user data into
            $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" alt="No Image Found" title="${user.name}" class="thumbnail avatar">
                            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">View Website</a></li>
                                <li class="list-group-item">Location: ${user.location}<//li>
                                <li class="list-group-item">Email: ${user.email}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="page-header">Latest 5 Repositories</h3>
            <div id="repos"></div>
            `);
        });
    })
});