@extends('app')

@section('content')
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            #textarea {
                resize: none!important;
            }

            .recordBtn , .editBtn {
                background-color: #E0E5FF !important;
            }

            .recordBtn:hover {
                border: #99AAFF 1px solid !important;
                background-color: #99AAFF !important;
                color: white !important;
            }

            .editBtn {
                font-size: 0.8em;
            }
            
            .editBtn:hover {
                border: #007bff 1px solid !important;
                background-color: #007bff !important;
                color: white !important;
            }
        </style>
    </head>

    <div class="float-right newDiv mt-4 mr-4">
        <button class="btn blue-btn font-weight-bold recordBtn" id="newAnnounce" data-toggle="modal" data-target="#newAnnounceModal">New Announcement</button>
    </div>
    <div class="card-ttl">Announcement List</div>

    @if(session()->has('success'))
        <div class="text-success mt-3">{{ session()->pull('success') }}</div>
    @endif

    @if(session()->has('failed'))
        <div class="text-danger mt-3">{{ session()->pull('failed') }}</div>
    @endif

    <div class="mt-5">
        <table class="table table-bordered table-striped" id="announcementTable">
            <thead>
                <tr>
                    <th style="width:5%;">#</th>
                    <th style="width:24%;">Title</th>
                    <th style="width:;">Details</th>
                    <th style="width:16%;">Date</th>
                    <th style="width:12%;">Action</th>
                </tr>
            </thead>
            <tbody id="announcementTableBody">
            @if(isset($list) && count($list)>0)
            @foreach ($list as $index => $l)
            <tr>
                <td>{{ $index+1 }}</td>
                <td>
                    <p style="word-break: break-all;" class="titleD">{{ $l->reportTitle }} 
                    @if($l->reportStatus == '1')
                        <span class="ml-2 activeStatus">Active</span>
                    @elseif($l->reportStatus == '0')
                        <span class="ml-2 inactiveStatus">Inactive</span>
                    @endif
                    </p>
                </td>
                <td>
                    <p style="word-break: break-all;">{{ $l->reportDetails }}</p>
                </td>
                <td>
                    <div style="color:#A0A0A0;"><small><em>Last updated at</em></small></div>
                    <div>{{ $l->reportDate }}</div>
                    <p style="color:#000099;"><small><em>by</em> {{ $l->adminName }}</small></p>
                </td>
                <td style="text-align:center;">
                    <div>
                        <button class="btn blue-btn editBtn mb-2 font-weight-bold" data-toggle="modal" data-target="#editAnnounceModal" value="{{ $l->reportID }}">EDIT</button>
                        <button class="btn p-0 m-0 mr-2 dltBtn" style="margin-bottom:12px!important;" data-toggle="modal" data-target="#dltModal" value="{{ $l->reportID }}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                    <form method="post" action="/changeAnnouncementStatus">
                        {{ csrf_field() }}
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">  
                        <input type="hidden" class="aUC" name="aUC" />
                        <input type="hidden" name="rid" value="{{ $l->reportID }}"/>
                        <p>
                        @if($l->reportStatus == '1')
                            <button class="btn deactivateBtn" value="deac" name="sAction">Deactivate</button>
                        @elseif($l->reportStatus == '0')
                            <button class="btn activateBtn" value="act" name="sAction">Activate</button>
                        @endif
                        </p>
                    </form>
                </td>
            </tr>
            @endforeach
            @else
                <td></td><td><p>No record.</p></td><td></td><td></td><td></td>
            @endif
            </tbody>
        </table>
    </div>

    <div id="newAnnounceModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/newAnnouncement" method="post" id="newForm" autocomplete="off">
            {{ csrf_field() }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}">  
                <input type="hidden" class="aUC" name="aUC" />
                <div class="modal-body">
                    <div>
                        <div class="modal-title" style="text-align:center;">NEW ANNOUNCEMENT</div>
                        <div class="ml-4">
                            Announcement Title : <input type="text" name="rTitle" placeholder="Please enter the announcement title" size="45" maxlength="42" required/>
                        </div>
                        <div class="ml-4 mt-2">
                            Announcement Details : <br/><textarea cols="68" rows="5" name="rDetails" placeholder="Please enter the announcement details" maxlength="180" id="textarea" required></textarea>
                        </div>
                        <div style="text-align:center;">
                            <button type="submit" class="btn blue-btn m-3 recordBtn">New Announcement</button>
                            <button type="button" class="btn discard-btn m-3" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div id="editAnnounceModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/editAnnouncement" method="get" id="editForm" autocomplete="off">
                <input type="hidden" class="aUC" name="aUC" />
                <input type="hidden" class="edit-rid" name="rid"/>
                <div class="modal-body">
                    <div>
                        <div class="modal-title" style="text-align:center;">EDIT ANNOUNCEMENT</div>
                        <div class="ml-4">
                            Announcement Title : <input type="text" class="edit-title" name="rTitle" placeholder="Please enter the announcement title" size="45" maxlength="42" required/>
                        </div>
                        <div class="ml-4 mt-2">
                            Announcement Details : <br/><textarea cols="68" rows="5" name="rDetails" placeholder="Please enter the announcement details" maxlength="180" id="textarea" class="edit-details" required></textarea>
                        </div>
                        <p style="color:blue;" class="ml-4 d-none reminder"><small>*This announcement will be automatically activated after you update, even if it is initially inactive.</small></p>
                        <div style="text-align:center;">
                            <button type="submit" class="btn blue-btn m-3 recordBtn">Update Announcement</button>
                            <button type="button" class="btn discard-btn m-3" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div id="dltModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
            <form action="/dltAnnouncement" method="get" id="dltForm" autocomplete="off">
                <input type="hidden" class="dlt-rid" name="rid"/>
                <div class="modal-body">
                    <div>
                        <div class="modal-title text-secondary" style="text-align:center;">CONFIRMATION</div>
                        <div class="ml-2">Are you sure you want to <span id="action_s"></span> this announcement?
                        <br/> >> <em><small>Title</small></em> : <strong><span class="ml-1" id="title_r"></span></strong>
                        </div>
                        <p class="ml-2 text-danger"><small>*The announcement cannot be restored once it is is deleted.</small></p>
                        <div style="text-align:center;">
                            <button type="submit" class="btn deactivateBtn m-3">DELETE Announcement</button>
                            <button type="button" class="btn discard-btn m-3" data-dismiss="modal">Discard</button>
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

            $('#announcementTable').DataTable();

            $(document).on('click', '.editBtn', function() {
                var rid = $(this).val();
                $.ajax({
                    url: '/getAnnouncementDetails',
                    method: 'get',
                    data: { 
                        rid: rid,
                    },
                    success: function(d) {
                        if(d.status) {
                            var data = d.data;
                            $('.edit-rid').val(data.reportID);
                            $('.edit-title').val(data.reportTitle);
                            $('.edit-details').val(data.reportDetails);

                            if(data.reportStatus == '1') {
                                $('.reminder').addClass('d-none');
                            } else if(data.reportStatus == '0') {
                                $('.reminder').removeClass('d-none');
                            }
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr);
                    }
                });
            });

            $('#editForm .discard-btn').click(function() {
                $('#editForm .modal-body').find(':input').val("");
                $('.reminder').addClass('d-none');
            });

            $(document).on('click', '.dltBtn', function() {
                var rid = $(this).val();
                var ttl = $(this).parents('tr').find('.titleD').html();
                $('#dltForm .dlt-rid').val(rid);
                $('#dltForm #title_r').html(ttl);
            });

        });
    </script>
@endsection