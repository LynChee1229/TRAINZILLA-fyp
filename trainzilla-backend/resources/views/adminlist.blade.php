@extends('app')

@section('content')
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            #profile-card {
                border: 1px solid #D5D5D5;
                background-color: #F7EEEE;
                padding: 12px;
                border-radius: 5px;
                width: 69%;
            }

            .pink-btn {
                font-size: 0.8em;
                font-weight: bold;
                color: #B9869B;
                border: 1px solid #B9869B;
            }

            .pink-btn:hover {
                background-color: #B9869B;
                color: white;
            }

            .newDiv {
                padding: 16px 58px 0 0;
            }
        </style>
    </head>
    <div class="card-ttl">Admin List</div>

    @if(session()->has('success'))
        <div class="text-success">{{ session()->pull('success') }}</div>
    @endif

    @if(session()->has('failed'))
        <div class="text-danger">{{ session()->pull('failed') }}</div>
    @endif

    <div class="text-danger errorMsg mt-2"></div>

    <div class="float-right newDiv">
        <button class="btn blue-btn font-weight-bold" id="newBtn">Add New Admin</button>
    </div>
    <div id="profile-card" class="my-3">
    <form action="/updateMyContact" action="get">
        <input type="hidden" class="aUC" name="aUC" />
        <div class="d-flex flex-row">
            <div>
                <p class="m-1"><small>Name : </small></p>
                <p class="m-1"><small>Email : </small></p>
                <p class="m-1"><small>Contact : (+60)</small></p>
            </div>
            <div class="ml-2" style="width:380px;">
                <p class="font-weight-bold myName m-1"></p>
                <p class="font-weight-bold myEmail m-1"></p>
                <p class="font-weight-bold myContact m-1"></p>
                <p class="m-1 d-none contactField"><small><input type="tel" class="input-group" placeholder="Insert New Contact Number" size="24" pattern="([1]{1}[0-9]{8})|([1]{1}[0-9]{9})" id="newContact" name="newContact" required/></small></p>
            </div>
            <div>
                <p><button class="btn pink-btn" data-toggle="modal" data-target="#modal_simple">RESET PASSWORD</button></p>
                <p><button class="btn pink-btn updateBtn">Update Contact Number</button></p>
                <p><button class="btn blue-btn d-none updateContact mr-2 mb-2" type="submit" style="background-color:transparent;">Update</button><button class="btn discard-btn d-none discardUpdate mb-2">Cancel</button></p>
            </div>
        </div>
    </form>
    </div>

    <div id="modal_simple" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/resetAdminPW" method="post">
            {{ csrf_field() }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}">  
                <input type="hidden" class="aUC" name="aUC" />
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div style="padding-left:24px;">
                        <div class="modal-title" style="text-align:center;">RESET PASSWORD</div>
                        <div class="d-flex flex-row">
                            <div>
                                <p class="mt-1">Old Password : </p>
                                <p class="mt-3">New Password : </p>
                                <p class="mt-4">Confirm Password : </p>
                            </div>
                            <div class="ml-2">
                                <p><input type="password" class="input-group oldPW" name="oldPW" size="36" minlength="8" maxlength="15" placeholder="Please enter your old password" required/></p>
                                <p><input type="password" class="input-group newPW" name="newPW" size="36" minlength="8" maxlength="15" placeholder="Please enter your new password" required/></p>
                                <p><input type="password" class="input-group confirmPW" size="36" minlength="8" maxlength="15" placeholder="Please re-enter your old password" required/></p>
                            </div>
                        </div>
                        <p id="notMatchMsg" class="text-danger"></p>
                        <div style="padding:12px 0px; text-align:center;">
                            <button type="submit" class="btn pink-btn m-3 resetBtn">RESET PASSWORD</button>
                            <button type="button" class="btn discard-btn m-3 " data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <script>
        var adminUC = window.localStorage.getItem('adminUniqueCode');
        $('.aUC').val(adminUC);

        $(document).ready(function() {

            $.ajax({
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
				url: '/getAdminProfile',
				method: 'post',
				data: { 
					adminUC: adminUC,
				},
				success: function(d) {
					if(d.status) {
                        var admin = d.admin;
                        console.log(d.admin);
                        $('.myName').html(admin.adminName);
                        $('.myEmail').html(admin.adminEmail);
                        $('.myContact').html(admin.adminContact);
                    }
				},
				error: function(xhr) {
					console.log(xhr);
				}
			});

            $('.confirmPW').change(function(e) {
                if($('.newPW').val() != $('.confirmPW').val()) {
                    $('#notMatchMsg').html("Confirm Password is not match with New Password! Please re-enter.");
                    $('.resetBtn').attr('disabled', true);
                } else {
                    $('#notMatchMsg').html("");
                    $('.resetBtn').attr('disabled', false);
                }
            });

            $('.updateBtn').click(function(e) {
                e.preventDefault();
                $(this).addClass('d-none');
                $('.myContact').addClass('d-none');
                $('.contactField').removeClass('d-none');
                $('.updateContact').removeClass('d-none');
                $('.discardUpdate').removeClass('d-none');
            });

            $('.discardUpdate').click(function(e) {
                e.preventDefault();
                $(this).addClass('d-none');
                $('.contactField').addClass('d-none');
                $('.updateContact').addClass('d-none');
                $('.updateBtn').removeClass('d-none');
                $('.myContact').removeClass('d-none');
            });

            


            
        });
    </script>
@endsection
