var Extractor = {
    init: function () {
        $("#username").focus();
        $("#btnSubmit").on("click", function () {
            $("#email").val("");
            var username = $("#username").val();
            if (username === null || username === "") {
                alert("Please input username, dude!");
            } else {
                var url = "https://api.github.com/users/" + username + "?access_token=26998998285925d53a3f32f046084907081d0dad";
                $.get(url, function (data, status, opts) {
                    var userFullname = data.name, userEmails = [];
                    if (data.email !== null && data.email !== "") {
                        userEmails.push(data.email);
                    }
                    if (data.public_repos > 0) {
                        var reposUrl = "https://api.github.com/users/" + username + "/repos?access_token=26998998285925d53a3f32f046084907081d0dad";
                        $.get(reposUrl, function (repos, status, opts) {
                            for (var i = 0; i < repos.length; i++) {
                                var repoName = repos[i].name;
                                var commitsUrl = "https://api.github.com/repos/" + username + "/" + repoName +
                                    "/commits?access_token=26998998285925d53a3f32f046084907081d0dad";
                                $.get(commitsUrl, function (commits, status, opts) {
                                    if (commits.length > 0) {
                                        for (var j = 0; j < commits.length; j++) {
                                            var commiter = commits[j].commit.committer;
                                            if (commiter.name == userFullname && userEmails.indexOf(commiter.email) == -1) {
                                                userEmails.push(commiter.email);
                                                break;
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        setTimeout(function () {
                            $("#email").val(userEmails.join()).select();
                        }, 2000);
                    }
                });
            }
        });
        $("#username").on('keydown', function (event) {
            if (event.which == 13) {
                $("#email").val("");
                var username = $("#username").val();
                if (username === null || username === "") {
                    alert("Please input username, dude!");
                } else {
                    var url = "https://api.github.com/users/" + username + "?access_token=26998998285925d53a3f32f046084907081d0dad";
                    $.get(url, function (data, status, opts) {
                        var userFullname = data.name, userEmails = [];
                        if (data.email !== null && data.email !== "") {
                            userEmails.push(data.email);
                        }
                        if (data.public_repos > 0) {
                            var reposUrl = "https://api.github.com/users/" + username + "/repos?access_token=26998998285925d53a3f32f046084907081d0dad";
                            $.get(reposUrl, function (repos, status, opts) {
                                for (var i = 0; i < repos.length; i++) {
                                    var repoName = repos[i].name;
                                    var commitsUrl = "https://api.github.com/repos/" + username + "/" + repoName +
                                        "/commits?access_token=26998998285925d53a3f32f046084907081d0dad";
                                    $.get(commitsUrl, function (commits, status, opts) {
                                        if (commits.length > 0) {
                                            for (var j = 0; j < commits.length; j++) {
                                                var commiter = commits[j].commit.committer;
                                                if (commiter.name == userFullname && userEmails.indexOf(commiter.email) == -1) {
                                                    userEmails.push(commiter.email);
                                                    break;
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                            setTimeout(function () {
                                $("#email").val(userEmails.join()).select();
                            }, 2000);
                        }
                    });
                }
            }
        });
    }
}

KangoAPI.onReady(function () {
    Extractor.init();
});