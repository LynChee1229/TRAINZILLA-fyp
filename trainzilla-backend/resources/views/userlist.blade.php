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

            #bookingHistoryModal {
                width: 100vw;
            }

            #viewTable {
                position: relative
                max-width: 100%;
            }

            .smallText {
                font-size: 0.8em;
                font-style: italic;
                color: #990000;
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
                    <p>{{ $l->userPoint }} point(s) 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16"><path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    {{ $l->userVoucher }} voucher(s)</p>
                </td>
                <td style="text-align:center;">
                    <div>
                        <form method="get" action="/changeUserStatus">
                            <button type="button" class="btn blue-btn bookingBtn mb-2 font-weight-bold" data-toggle="modal" data-target="#bookingHistoryModal" value="{{ $l->userUniqueCode }}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye mb-1" viewBox="0 0 16 16">
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
            @endif
            </tbody>
        </table>
    </div>

    <div id="bookingHistoryModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="d-flex justify-content-center font-weight-bold" style="font-size: 1.4em;">User Ticket Booking History</div>
                    </div>
                    <div class="m-3 modalData">
                        <p style="color: #000099;"><em>User: </em><span class="viewName ml-2 font-weight-bold"></span></p>
                        <table class="table table-striped" id="viewTable">
                            <thead>
                                <tr>
                                    <th style="width:42%;">Ticket Code</th>
                                    <th style="width:50%;">
                                        Departure 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ladder" viewBox="0 0 16 16" transform="rotate(90)"><path d="M4.5 1a.5.5 0 0 1 .5.5V2h6v-.5a.5.5 0 0 1 1 0v14a.5.5 0 0 1-1 0V15H5v.5a.5.5 0 0 1-1 0v-14a.5.5 0 0 1 .5-.5zM5 14h6v-2H5v2zm0-3h6V9H5v2zm0-3h6V6H5v2zm0-3h6V3H5v2z"/></svg>
                                        Arrival
                                    </th>
                                    <th style="width:5%;">Payment</th>
                                </tr>
                            </thead>
                            <tbody class="viewTableBody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var adminUC = window.localStorage.getItem('adminUniqueCode');
        $('.aUC').val(adminUC);

        $(document).ready(function() {
            $('#userTable').DataTable();
            table = $('#viewTable').DataTable();

            $(document).on('click', '.bookingBtn', function() {
                let userUC = $(this).val();
                table.destroy();
                
                table = $('#viewTable').DataTable({
                    bAutoWidth: false,
                    aaSorting: [] ,
                    columnDefs: [
                        { width: '45%', targets: 0 },       
                        { width: '35%', targets: 1 },
                        { width: '20%', targets: 2 },
                    ],
                    ajax: function ( data, callback, settings ) {
                        $.ajax({
                            url: '/getBookingHistory',
                            method: 'get',
                            data: { 
                                userUC: userUC,
                            },
                            success: function( data, textStatus, jQxhr ){
                                if(data) {
                                    $('#bookingHistoryModal .viewName').html((data.userName).charAt(0).toUpperCase() + (data.userName).slice(1));
                                }
                                callback({
                                    data: data.ticket,
                                });
                            },
                            error: function( jqXhr, textStatus, errorThrown ){
                                console.log(errorThrown);
                            }
                        });
                    },
                    columns: [
                    {
                        "mRender": function(data, type, row) {
                            let temp = '';

                            temp += '<p style="word-break: break-word;">' + row.ticketUniqueCode;

                            if(row.ticketStatus == '1') {
                                temp += '<span class="ml-2 activeStatus">Active</span>'
                            } 
                            else if(row.ticketStatus == '0') {
                                temp += '<span class="ml-2 inactiveStatus">Invalid</span>'
                            }
                                
                            temp += '</p><div style="word-break: break-word;" class="smallText">Purchased at <span style="font-weight: bold;">' + row.ticketPurchaseDate + '</span></div><p style="word-break: break-word;" class="smallText">Expires on ' + row.ticketExpiryDate + '</p>'

                            return temp;
                        }
                    },
                    {
                        "mRender": function(data, type, row) {
                            return '<div style="word-break: break-word;">' + row.ticketDeparture + '</div><p style="word-break: break-word;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ladder mx-2" viewBox="0 0 16 16" transform="rotate(90)" style="color:gray;"><path d="M4.5 1a.5.5 0 0 1 .5.5V2h6v-.5a.5.5 0 0 1 1 0v14a.5.5 0 0 1-1 0V15H5v.5a.5.5 0 0 1-1 0v-14a.5.5 0 0 1 .5-.5zM5 14h6v-2H5v2zm0-3h6V9H5v2zm0-3h6V6H5v2zm0-3h6V3H5v2z"/></svg>' + row.ticketArrival + '</p>'
                        }
                    },
                    {
                        "mRender": function(data, type, row) {
                            return '<div style="word-break: break-word;">RM ' + row.ticketPrice + '</div><p style="word-break: break-word; font-size: 0.85em;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/><path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/></svg> ' + row.ticketPaymentMethod + '</p>';
                        }
                    },
                ]
                });

            });
        });
    </script>
@endsection