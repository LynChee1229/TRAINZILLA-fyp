<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="/css/admin1.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>        
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css">
        <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js"></script>


        <title>TRAINZILLA | ADMIN</title>

        @php
            $adminUC = session()->pull('adminUC');
            $admin_name = \App\Models\Admin::getAdminName($adminUC);
        @endphp

        <script>
            var adminUC = '{{ $adminUC }}';
            if(adminUC != '') {
                window.localStorage.setItem("adminUniqueCode", adminUC);
            }
            var admin_name = '{{ $admin_name }}';
            if(admin_name != '') {
                window.localStorage.setItem("adminName", admin_name);
            }
            
            var adminTitle = window.localStorage.getItem("adminUniqueCode");
            if(!adminTitle) {
                window.location.href = '/adminlogin';
            }
        </script>
    </head>

    <body style="background-color: #E0E5FF;">
        <div id="sidebar">
            <div id="sb-tt">TRAINZILLA</div> <br/>

            <div class="sidebar-cat"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg> Management</div>
                <div class="sidebar-option opt1"><a href="/adminlist">Admin List</a></div>
                <div class="sidebar-option opt2"><a href="/ticketlist">Ticket List</a></div>
                <div class="sidebar-option opt3"><a href="/userlist">User List</a></div>
            <br/>

            <div class="sidebar-cat"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg> Settings</div>
                <div class="sidebar-option opt4"><a href="/adminroute">Route</a></div>
                <div class="sidebar-option opt5"><a href="/adminannouncement">Announcement</div>
                <div class="sidebar-option opt6"><a href="/adminrule">Rules & Regulations</a></div>
            <br/>

            <div id="btm">
                <div>Hi, <span id="adminTitle"></span></div>
                <div class="sidebar-option"><a href="/adminlist"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg> My Profile</a></div>
                <div class="sidebar-option"><a href="" id="logout"> <img src="/img/signout.svg" alt="" id="signout"/>Log Out</a></div>
            </div>
        </div>

        <div id="sb-content">
            <div class="content-card">
                @yield('content')
            </div>
            <div class="cpr">
                <em>Copyright &copy; TRAINZILLA 2021</em>
            </div>
        </div>
        
    </body>

    <script>
        var tab = '{{ $tab }}';

        $(document).ready(function() {
            var adminTitle = window.localStorage.getItem("adminName");
            if(adminTitle) {
                $('#adminTitle').html(adminTitle);
            }

            $('#logout').click(function(e) {
                e.preventDefault();
                localStorage.clear();
                window.location.href = '/admin-logout';
            });

            if(tab == "admin") {
                $('.opt1').addClass('sidebar-active');
            }
            if(tab == "ticket") {
                $('.opt2').addClass('sidebar-active');
            }
            if(tab == "user") {
                $('.opt3').addClass('sidebar-active');
            }
            if(tab == "route") {
                $('.opt4').addClass('sidebar-active');
            }
            if(tab == "announcement") {
                $('.opt5').addClass('sidebar-active');
            }
            if(tab == "rule") {
                $('.opt6').addClass('sidebar-active');
            }
            
        });
    </script>
</html>