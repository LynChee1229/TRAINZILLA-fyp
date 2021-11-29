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
                width: 73%;
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

            #newBtn:hover , .newAdminBtn:hover {
                border: #99AAFF 1px solid !important;
                background-color: #99AAFF !important;
                color: white !important;
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
        <button class="btn blue-btn font-weight-bold" id="newBtn" data-toggle="modal" data-target="#newAdminModal" style="background-color:#E0E5FF;">Add New Admin</button>
    </div>
    <div id="profile-card" class="my-3">
    <form action="/updateMyContact" action="get" autocomplete="off">
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
                <p class="m-1 d-none contactField"><small><input type="tel" class="input-group" placeholder="Insert New Contact Number" size="24" pattern="([1]{1}[0-9]{8})|([1]{1}[0-9]{9}|[0]{1}[1]{1}[0-9]{8})|([0]{1}[1]{1}[0-9]{9})" id="newContact" name="newContact" required/></small></p>
            </div>
            <div>
                <p><button class="btn pink-btn" data-toggle="modal" data-target="#resetPWmodal">RESET PASSWORD</button></p>
                <p><button class="btn pink-btn updateBtn">Update Contact Number</button></p>
                <p><button class="btn blue-btn d-none updateContact mr-2 mb-2" type="submit" style="background-color:transparent;">Update</button><button class="btn discard-btn d-none discardUpdate mb-2">Cancel</button></p>
            </div>
        </div>
    </form>
    </div>

    <table class="table table-bordered table-striped" id="adminTable">
        <thead>
            <tr>
                <th style="width:5%;">#</th>
                <th style="width:24%;">Admin Name</th>
                <th style="width:;">Email Address</th>
                <th style="width:19%;">Contact Number</th>
                <th style="width:12%;">Action</th>
            </tr>
        </thead>
        <tbody id="adminTableBody">
        @if(isset($list) && count($list)>0)
        @foreach ($list as $index => $l)
        <tr>
            <td>{{ $index+1 }}</td>
            <td>
                <p>{{ $l->adminName }} 
                @if($l->adminStatus == '1')
                    <span class="ml-2 activeStatus">Active</span>
                @elseif($l->adminStatus == '0')
                    <span class="ml-2 inactiveStatus">Inactive</span>
                @endif
                </p>
            </td>
            <td>
                <p>{{ $l->adminEmail }}</p>
            </td>
            <td>
                <p>(+60) {{ $l->adminContact }}</p>
            </td>
            <td>
                <p style="text-align: center;">
                    <input type="hidden" id="aid" value="{{ $l->adminUniqueCode }}"/>
                    <input type="hidden" id="aname" value="{{ $l->adminName }}"/>
                @if($l->adminStatus == '1')
                    <button class="btn deactivateBtn" data-toggle="modal" data-target="#setStatusModal" value="deac">Deactivate</button>
                @elseif($l->adminStatus == '0')
                    <button class="btn activateBtn" data-toggle="modal" data-target="#setStatusModal" value="act">Activate</button>
                @endif
                </p>
            </td>
        </tr>
        @endforeach
        @endif
        </tbody>
    </table>

    <div id="resetPWmodal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/resetAdminPW" method="post" id="form1" autocomplete="off">
            {{ csrf_field() }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}">  
                <input type="hidden" class="aUC" name="aUC" />
                <div class="modal-body">
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
                                <p><input type="password" class="input-group confirmPW" size="36" minlength="8" maxlength="15" placeholder="Please re-enter your new password" required/></p>
                            </div>
                        </div>
                        <p id="notMatchMsg" class="text-danger"></p>
                        <div style="padding:12px 0px; text-align:center;">
                            <button type="submit" class="btn pink-btn m-3 resetBtn">RESET PASSWORD</button>
                            <button type="button" class="btn discard-btn m-3" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div id="newAdminModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/newAdmin" method="post" id="form2" autocomplete="off">
            {{ csrf_field() }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}">  
                <input type="hidden" class="aUC" name="aUC" />
                <div class="modal-body">
                    <div style="padding-left:24px;">
                        <div class="modal-title" style="text-align:center;">NEW ADMIN</div>
                        <div class="d-flex flex-row">
                            <div>
                                <p class="mt-1">Admin Full Name : </p>
                                <p class="mt-3">Email Address : </p>
                                <p class="mt-4">Contact Number : </p>
                            </div>
                            <div class="ml-4">
                                <p><input type="text" class="input-group newName" name="newName" size="42" maxlength="20" placeholder="Please enter the new admin's name" required/></p>
                                <p><input type="email" class="input-group newEmail" name="newEmail" size="42" maxlength="20" placeholder="Please enter the new admin's email address" required/></p>
                                <p><input type="tel" class="input-group newContact" name="newContact" size="42" placeholder="Please enter the new admin's contact number" pattern="([1]{1}[0-9]{8})|([1]{1}[0-9]{9}|[0]{1}[1]{1}[0-9]{8})|([0]{1}[1]{1}[0-9]{9})" required/></p>
                            </div>
                        </div>
                        <p style="color:blue;">*Please enter your admin password for authorization.</p>
                        <div class="d-flex flex-row">
                            <div>
                                <p class="mt-1">Your Password : </p>
                                <p class="mt-3">Confirm Password : </p>
                            </div>
                            <div class="ml-4">
                                <p><input type="password" class="input-group myPW1" name="myPW1" size="42" minlength="8" maxlength="15" placeholder="Please enter your admin password" required/></p>
                                <p><input type="password" class="input-group myPW2" size="42" minlength="8" maxlength="15" placeholder="Please re-enter your admin password" required/></p>
                            </div>
                        </div>
                        <p id="notMatchMsgNewAdmin" class="text-danger"></p>
                        <div style="padding:12px 0px; text-align:center;">
                            <button type="submit" class="btn blue-btn m-3 newAdminBtn" style="background-color:#E0E5FF;">Add New Admin</button>
                            <button type="button" class="btn discard-btn m-3 d2" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div id="setStatusModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
            <form action="/changeAdminStatus" method="post" id="form3" autocomplete="off">
            {{ csrf_field() }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" class="aUC" name="aUC" />
                <input type="hidden" id="statusAUC" name="statusAUC"/>
                <div class="modal-body">
                    <div>
                        <div class="m-2 font-weight-bold" style="text-align:center; font-size:1.4em;">CONFIRMATION</div>
                        <div>Are you sure you want to <span id="action_s"></span> this admin?
                        <br/> >> <strong><span id="name_s"></span></strong>
                        </div>
                        <div style="color:blue;"><small>*Please enter your admin password for authorization.</small></div>
                        <div>
                            <div class="mt-1">Your Password : </div>
                            <input type="password" class="input-group myPW_1" name="myPW" size="32" minlength="8" maxlength="15" placeholder="Please enter your admin password" required/>
                            <div class="mt-3">Confirm Password : </div>
                            <input type="password" class="input-group myPW_2" size="32" minlength="8" maxlength="15" placeholder="Please re-enter your admin password" required/>
                        </div>
                        <p class="text-danger"><small><span id="notMatchMsgStatus"></span></small></p>
                        <div style="text-align:center;" class="s_btn">
                            <button type="submit" class="btn activateBtn d-none" name="status" value="act">Activate</button>
                            <button type="submit" class="btn deactivateBtn d-none" name="status" value="deac">Deactivate</button>
                            <button type="button" class="btn discard-btn m-3 d2" data-dismiss="modal">Discard</button>
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

        $(document).on('change', '.confirmPW', function(e) {
            if($('.newPW').val() != $('.confirmPW').val()) {
                $('#notMatchMsg').html("Confirm Password does not match with New Password! Please re-enter.");
                $('.resetBtn').attr('disabled', true);
            } else {
                $('#notMatchMsg').html("");
                $('.resetBtn').attr('disabled', false);
            }
        });

        $(document).on('change', '.myPW2', function(e) {
            if($('.myPW1').val() != $('.myPW2').val()) {
                $('#notMatchMsgNewAdmin').html("Confirm Password does not match with Your Admin Password! Please re-enter.");
                $('.newAdminBtn').attr('disabled', true);
            } else {
                $('#notMatchMsgNewAdmin').html("");
                $('.newAdminBtn').attr('disabled', false);
            }
        });

        $(document).on('change', '.myPW_2', function(e) {
            if($('.myPW_1').val() != $('.myPW_2').val()) {
                $('#notMatchMsgStatus').html("Confirm Password does not match with Your Admin Password! Please re-enter.");
                $('.s_btn .deactivateBtn').attr('disabled', true);
                $('.s_btn .activateBtn').attr('disabled', true);
            } else {
                $('#notMatchMsgStatus').html("");
                $('.s_btn .deactivateBtn').attr('disabled', false);
                $('.s_btn .activateBtn').attr('disabled', false);
            }
        });

        $(document).ready(function() {

            $('#adminTable').DataTable();

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
                        $('.myName').html(admin.adminName);
                        $('.myEmail').html(admin.adminEmail);
                        $('.myContact').html(admin.adminContact);
                    }
				},
				error: function(xhr) {
					console.log(xhr);
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

            $('.discard-btn').click(function() {
                $('#form1 .modal-body').find(':input').val("");
                $('#notMatchMsg').html("");
            });

            $('.d2').click(function() {
                $('#form2 .modal-body').find(':input').val("");
                $('#notMatchMsgNewAdmin').html("");
            });

            $('.s_btn .discard-btn').click(function() {
                $('#form3 .modal-body').find(':input').val("");
                $('#notMatchMsgStatus').html("");
            });

            $(document).on('click', '#adminTableBody .activateBtn, #adminTableBody .deactivateBtn', function(e) {
                var val = $(this).parent().find('#aid').val();
                var nameval = $(this).parent().find('#aname').val();
                $('#statusAUC').val(val);
                $('#name_s').html(nameval);

                if($(this).val() == "deac") {
                    $('#action_s').html("DEACTIVATE");
                    $('.s_btn .deactivateBtn').removeClass('d-none');
                    $('.s_btn .activateBtn').addClass('d-none');
                }
                if($(this).val() == "act") {
                    $('#action_s').html("ACTIVATE");
                    $('.s_btn .deactivateBtn').addClass('d-none');
                    $('.s_btn .activateBtn').removeClass('d-none');
                }
            });

        });
    </script>
@endsection
