@extends('app')

@section('content')
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            #textarea {
                resize: none!important;
            }

            .ruleBtn , .editBtn {
                background-color: #E0E5FF !important;
            }

            .ruleBtn:hover {
                border: #99AAFF 1px solid !important;
                background-color: #99AAFF !important;
                color: white !important;
            }

            .editBtn {
                font-size: 0.8em;
                border: #E0E5FF solid 2px!important;
            }
            
            .editBtn:hover {
                border: #007bff 1px solid !important;
                background-color: #007bff !important;
                color: white !important;
            }
        </style>
    </head>

    <div class="float-right newDiv mt-4 mr-4">
        <button class="btn blue-btn font-weight-bold ruleBtn" id="newRule" data-toggle="modal" data-target="#newRuleModal">New Rules & Regulations</button>
    </div>
    <div class="card-ttl">Rules & Regulations List</div>

    @if(session()->has('success'))
        <div class="text-success mt-3">{{ session()->pull('success') }}</div>
    @endif

    @if(session()->has('failed'))
        <div class="text-danger mt-3">{{ session()->pull('failed') }}</div>
    @endif

    <div class="mt-5">
        <table class="table table-bordered table-striped" id="ruleTable">
            <thead>
                <tr>
                    <th style="width:5%;">#</th>
                    <th style="width:24%;">Title</th>
                    <th style="width:;">Details</th>
                    <th style="width:16%;">Date</th>
                    <th style="width:12%;">Action</th>
                </tr>
            </thead>
            <tbody id="ruleTableBody">
            @if(isset($list) && count($list)>0)
            @foreach ($list as $index => $l)
            <tr>
                <td>{{ $index+1 }}</td>
                <td>
                    <p style="word-break: break-word;" class="titleD">{{ $l->ruleTitle }} 
                    @if($l->ruleStatus == '1')
                        <span class="ml-2 activeStatus">Active</span>
                    @elseif($l->ruleStatus == '0')
                        <span class="ml-2 inactiveStatus">Inactive</span>
                    @endif
                    </p>
                </td>
                <td>
                    <p style="word-break: break-word;">{{ $l->ruleDetails }}</p>
                </td>
                <td>
                    <div style="color:#A0A0A0;"><small><em>Last updated at</em></small></div>
                    <div>{{ $l->ruleDate }}</div>
                    <p style="color:#000099;"><small><em>by</em> {{ $l->adminName }}</small></p>
                </td>
                <td style="text-align:center;">
                    <div>
                        <button class="btn blue-btn editBtn mb-2 font-weight-bold" data-toggle="modal" data-target="#editRuleModal" value="{{ $l->ruleID }}">EDIT</button>
                        <button class="btn p-0 m-0 mr-2 dltBtn" style="margin-bottom:12px!important;" data-toggle="modal" data-target="#dltModal" value="{{ $l->ruleID }}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                    <form method="get" action="/changeRuleStatus">
                        <input type="hidden" class="aUC" name="aUC" />
                        <input type="hidden" name="rid" value="{{ $l->ruleID }}"/>
                        <p>
                        @if($l->ruleStatus == '1')
                            <button class="btn deactivateBtn" value="deac" name="sAction">Deactivate</button>
                        @elseif($l->ruleStatus == '0')
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

    <div id="newRuleModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/newRule" method="get" id="newForm" autocomplete="off">
                <input type="hidden" class="aUC" name="aUC" />
                <div class="modal-body">
                    <div>
                        <div class="modal-title" style="text-align:center;">NEW RULES & REGULATIONS</div>
                        <div class="ml-4">
                            Rules & Regulations Title : <input type="text" name="rTitle" placeholder="Please enter the Rules & Regulations title" size="45" maxlength="42" required/>
                        </div>
                        <div class="ml-4 mt-2">
                            Rules & Regulations Details : <br/><textarea cols="68" rows="5" name="rDetails" placeholder="Please enter the Rules & Regulations details" maxlength="480" id="textarea" required></textarea>
                        </div>
                        <div style="text-align:center;">
                            <button type="submit" class="btn blue-btn m-3 ruleBtn">New Rules & Regulations</button>
                            <button type="button" class="btn discard-btn m-3" data-dismiss="modal">Discard</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div id="editRuleModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <form action="/editRule" method="get" id="editForm" autocomplete="off">
                <input type="hidden" class="aUC" name="aUC" />
                <input type="hidden" class="edit-rid" name="rid"/>
                <div class="modal-body">
                    <div>
                        <div class="modal-title" style="text-align:center;">EDIT RULES & REGULATIONS</div>
                        <div class="ml-4">
                            Rules & Regulations Title : <input type="text" class="edit-title" name="rTitle" placeholder="Please enter the Rules & Regulations title" size="45" maxlength="42" required/>
                        </div>
                        <div class="ml-4 mt-2">
                            Rules & Regulations Details : <br/><textarea cols="68" rows="5" name="rDetails" placeholder="Please enter the Rules & Regulations details" maxlength="480" id="textarea" class="edit-details" required></textarea>
                        </div>
                        <p style="color:blue;" class="ml-4 d-none reminder"><small>*This rules & regulations will be automatically activated after you update, even if it is initially inactive.</small></p>
                        <div style="text-align:center;">
                            <button type="submit" class="btn blue-btn m-3 ruleBtn">Update Rules & Regulations</button>
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
            <form action="/dltRule" method="get" id="dltForm" autocomplete="off">
                <input type="hidden" class="dlt-rid" name="rid"/>
                <div class="modal-body">
                    <div>
                        <div class="modal-title text-secondary" style="text-align:center;">CONFIRMATION</div>
                        <div class="ml-2">Are you sure you want to <span id="action_s"></span> this rules & regulations?
                        <br/> >> <em><small>Title</small></em> : <strong><span class="ml-1" id="title_r"></span></strong>
                        </div>
                        <p class="ml-2 text-danger"><em><small>*The rules & regulations cannot be restored once it is is deleted.</small></em></p>
                        <div style="text-align:center;">
                            <button type="submit" class="btn deactivateBtn m-3">DELETE rules & regulations</button>
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

            $('#ruleTable').DataTable();

            $(document).on('click', '.editBtn', function() {
                var rid = $(this).val();
                $.ajax({
                    url: '/getRuleDetails',
                    method: 'get',
                    data: { 
                        rid: rid,
                    },
                    success: function(d) {
                        if(d.status) {
                            var data = d.data;
                            $('.edit-rid').val(data.ruleID);
                            $('.edit-title').val(data.ruleTitle);
                            $('.edit-details').val(data.ruleDetails);

                            if(data.ruleStatus == '1') {
                                $('.reminder').addClass('d-none');
                            } else if(data.ruleStatus == '0') {
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
