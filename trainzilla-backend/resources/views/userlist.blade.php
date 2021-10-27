@extends('app')

@section('content')
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            .bookingBtn {
                background-color: #E0E5FF !important;
                font-size: 0.8em;
                border: #E0E5FF 1px solid !important;
            }

            .bookingBtn:hover {
                border: #99AAFF 1px solid !important;
                background-color: #99AAFF !important;
                color: white !important;
            }
        </style>
    </head>
    <div class="card-ttl">User List</div>

    @if(session()->has('success'))
        <div class="text-success mt-3">{{ session()->pull('success') }}</div>
    @endif

    @if(session()->has('failed'))
        <div class="text-danger mt-3">{{ session()->pull('failed') }}</div>
    @endif

    <div class="mt-4">
        <table class="table table-bordered table-striped" id="userTable">
            <thead>
                <tr>
                    <th style="width:5%;">#</th>
                    <th style="width:22%;">User Name</th>
                    <th style="width:22%;">User Details</th>
                    <th style="width:24%;">Points & Vouchers</th>
                    <th style="width:%;">Action</th>
                </tr>
            </thead>
            <tbody id="userTableBody">
            @if(isset($list) && count($list)>0)
            @foreach ($list as $index => $l)
            <tr>
                <td>{{ $index+1 }}</td>
                <td>
                    <p style="word-break: break-word;">{{ $l->userName }} 
                    @if($l->userStatus == '1')
                        <span class="ml-2 activeStatus">Active</span>
                    @elseif($l->userStatus == '0')
                        <span class="ml-2 inactiveStatus">Inactive</span>
                    @endif
                    </p>
                </td>
                <td>
                    <div style="word-break: break-word;">{{ $l->userEmail }}</div>
                    <div style="word-break: break-word;">{{ $l->userContact }}</div>
                    <p style="word-break: break-word;">{{ $l->userDOB }}</p>
                </td>
                <td>
                    <p>{{ $l->userPoint }} point(s) | {{ $l->userVoucher }} voucher(s)</p>
                </td>
                <td style="text-align:center;">
                    <div>
                        <form method="get" action="/changeUserStatus">
                            <button type="button" class="btn blue-btn bookingBtn mb-2 font-weight-bold" data-toggle="modal" data-target="#" value="{{ $l->userUniqueCode }}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye mb-1" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg> Booking History</button>
                        
                            <input type="hidden" class="aUC" name="aUC" />
                            <input type="hidden" name="uid" value="{{ $l->userUniqueCode }}"/>
                            @if($l->userStatus == '1')
                                <button class="btn deactivateBtn mb-2" value="deac" name="sAction">Deactivate</button>
                            @elseif($l->userStatus == '0')
                                <button class="btn activateBtn mb-2" value="act" name="sAction">Activate</button>
                            @endif
                        </form>
                    </div>
                </td>
            </tr>
            @endforeach
            @else
                <td></td><td><p>No record.</p></td><td></td><td></td><td></td>
            @endif
            </tbody>
        </table>
    </div>

    <script>
        var adminUC = window.localStorage.getItem('adminUniqueCode');
        $('.aUC').val(adminUC);

        $(document).ready(function() {
            $('#userTable').DataTable();
        });
    </script>
@endsection