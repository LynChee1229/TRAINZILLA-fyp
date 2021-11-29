@extends('app')

@section('content')
    <head><title>TRAINZILLA | ADMIN</title></head>
    <div class="card-ttl">Ticket List</div>

    <style>
        svg {
            margin-bottom: 2px;
        }

        .smallText {
            font-size: 0.8em;
            font-style: italic;
            color: #990000;
        }

        .myTab .btn {
            padding: 0;
            margin-right: 1.4em;
            text-decoration: none;
            color: gray;
        }

        .myTab .btn:hover {
            border-bottom: gray 2px solid;
            border-radius: 0;
        }

        .myTab .activeClass , .myTab .activeClass:hover{
            color: blue;
            font-weight: bold;
            border-bottom: blue 2px solid;
            border-radius: 0;
        }
    </style>
    
    <script>
        $(document).ready(function() {
            var status = "all";

            table = $('#tickeTable').DataTable({
                ajax: function ( data, callback, settings ) {
                    $.ajax({
                        url: '/getTicketList',
                        method: 'get',
                        data: { 
                            ticketStatus: status,
                        },
                        success: function( data, textStatus, jQxhr ){
                            callback({
                                data: data,
                            });
                        },
                        error: function( jqXhr, textStatus, errorThrown ){
                            console.log(errorThrown);
                        }
                    });
                },
                columns: [
                    {
                        "mRender": function(data, type, row, meta) {
                            return (meta.row + 1);
                        }
                    },
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
                            return '<div style="word-break: break-word;">' + row.userName + '</div><div style="word-break: break-word;"><em>+60' + row.userContact + '</em></div><p style="word-break: break-word;"><em>' + row.userEmail + '</em></p>';
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
            
            $(document).on('click', '.myTab .btn', function() {
                $('.myTab .btn').removeClass('activeClass');
                $(this).addClass('activeClass');
                status = $(this).val();
                table.ajax.reload();
            });
        });

    </script>

    <div class="mt-3 myTab">
        <button class="btn btn-link activeClass" value="all">All</button>
        <button class="btn btn-link" value="active">Active</button>
        <button class="btn btn-link" value="invalid">Invalid</button>
    </div>

    <div class="mt-3">
        <table class="table table-bordered table-striped" id="tickeTable">
            <thead>
                <tr>
                    <th style="width:4%;">#</th>
                    <th style="width:24%;">Ticket Code</th>
                    <th style="width:22%;">User Details</th>
                    <th style="width:22%;">
                        Departure 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ladder" viewBox="0 0 16 16" transform="rotate(90)"><path d="M4.5 1a.5.5 0 0 1 .5.5V2h6v-.5a.5.5 0 0 1 1 0v14a.5.5 0 0 1-1 0V15H5v.5a.5.5 0 0 1-1 0v-14a.5.5 0 0 1 .5-.5zM5 14h6v-2H5v2zm0-3h6V9H5v2zm0-3h6V6H5v2zm0-3h6V3H5v2z"/></svg>
                        Arrival
                    </th>
                    <th style="width:17%;">Payment Details</th>
                </tr>
            </thead>

            <tbody id="ticketTableBody"></tbody>
        </table>
    </div>

@endsection