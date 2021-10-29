

<?php $__env->startSection('content'); ?>
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" rel="Stylesheet" />
        <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" ></script>
        <style>
            input[type=number] {
                width: 240px !important;
            }

            input[type=time] {
                width: 218px !important;
            }

            input[type="time"].setTime:not(:valid):before {
                content:'Earliest Departure Time :';
                margin-right: 0.6em;
                color:#808080;
            }

            #seconds {
                background-color: white;
                display: inline-flex;
                border: 1px solid #808080;
            }

            input[type=number].setSeconds {
                width: 118px !important;
            }

            .setSeconds {
                border: none;
                text-align: center;
            }

            .blue-btn {
                background-color: #E0E5FF !important;
                border: #99AAFF 1px solid !important;
                padding: 5px 8px !important;
                font-size: 0.9em;
            }

            .blue-btn:hover {
                background-color: #99AAFF !important;
                color: white !important;
            }
            
            .newStationBtn {
                background-color: white !important;
                color: #99AAFF !important;
            }
        </style>
    </head>

    <div class="float-right newDiv mt-4 mr-4">
        <button class="btn discard-btn backBtn">Back to Route List</button>
    </div>
    <div class="card-ttl">Create New Route</div>

    <div>
    <form method="get" action="/newRoute">
        <input type="hidden" name="adminUC" class="adminUC" />
        <div class="d-flex flex-row mt-3">
            <div>
                <p>Route Title </p>
                <p class="mt-4">Number of Trains </p>
            </div>
            <div class="ml-3" style="width:380px;">
                <p><input type="text" class="input-group rTitle" placeholder="Insert the route title" size="27" maxlength="48" name="rTitle" required/></p>
                <p class="mt-1"><input type="number" class="input-group" value="1" min="1" name="rTrain" id="rTrain" required/></p>
            </div>
        </div>

        <div class="row">
            <div class="col-4 leftCard">
                <div class="stationCard mt-3">
                    <input class="input-group stationName" name="stationName[]" placeholder="Station Name" size="24" maxlength="48" required />
                    <br/><br/>
                    <input type="time" class="input-group setTime" name="stationDeparture[]" required />
                </div>

                <div class="m-0 p-0 mt-4 d-none newStationCard"></div>

                <div class="stationCard mt-3" style="margin-top:29px!important;">
                    <input class="input-group stationName" name="stationName[]" placeholder="Station Name" size="24" maxlength="48" required />
                    <br/><br/>
                    <input type="time" class="input-group setTime" name="stationDeparture[]" required />
                </div>
            </div>

            <div class="col-4 rightCard">
                <div class="stosCard" style="margin-top:92px;">
                    <input type="number" class="input-group stosD" name="stosDistance[]" placeholder="Distance (km)" min="1" step="0.1" required />
                    <br/><br/>
                    <div id="seconds"><input type="number" class="setSeconds" name="minutesTaken[]" min="00" max="59" placeholder="-- (minutes)" required> : 
                    <input type="number" class="setSeconds" name="secondsTaken[]" min="00" max="59" placeholder="-- (seconds)" required></div>
                </div>

                <div class="newStosCard m-0 p-0 d-none"></div>
            </div>
        </div>
        
        <div><button class="btn blue-btn font-weight-bold mt-3 newStationBtn" type="button">Add New Station</button></div>
        <div><button class="btn blue-btn font-weight-bold mt-2 mb-3 newRouteBtn" type=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle mr-1 mb-1" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        </svg>ADD ROUTE</button></div>

    </form>
    </div>

    <script>
        var adminUC = window.localStorage.getItem('adminUniqueCode');
        $('.adminUC').val(adminUC);

        $(document).on('change', '.setSeconds', function(){
            $('.setSeconds').each(function(){
                if($(this).val() > 59) {
                    $(this).val('59');
                }
            })
        });

        $(document).ready(function() {

            $(document).on('focus', '.stationName', function() {
                $(".stationName").autocomplete({
                    source: function(request, response) {
                        $.ajax({
                            url: "/searchStation",
                            method: 'get',
                            dataType: "json",
                            data: {
                                term : request.term
                            },
                            success: function(data) {
                                response(data);
                            },
                            error:function(xhr) {
                                console.log(xhr);
                            },
                        });
                    },
                    min_length: 2,
                });
            });

            $(document).on('change', '.rTitle', function(){
                $.ajax({
                    url: '/getRouteDetails',
                    method: 'get',
                    data: { 
                        adminUC: adminUC,
                    },
                    success: function(d) {
                        if(d.status) {
                            var data = d.data;
                            data.forEach(function(item) {
                                var t1 = $('.rTitle').val().replaceAll(" ","").toLowerCase();
                                var t2 = item.routeTitle.replaceAll(" ","").toLowerCase();
                                if( t1 == t2) {
                                    $('.rTitle').val('')
                                    $('.rTitle').attr('placeholder', 'Existing Route Title. Try again.');
                                }
                            });
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr);
                    }
                });
            });

            $(document).on('change', '.stationName', function() {
                var sName = $(this).val();
                var time = $(this).parent().find('input.setTime');
                $.ajax({
                    url: '/getStationDeparture',
                    method: 'get',
                    data: { 
                        adminUC: adminUC,
                        sName : sName,
                    },
                    success: function(d) {
                        if(d.status) {
                            data = d.data;
                            if(data.stationDeparture) {
                                var t = data.stationDeparture.split(':');
                                if(time.prop('disabled') == false) {
                                    time.attr('type' , 'text');
                                    time.val(t[0] + ":" + t[1] + " (24h)");
                                    time.prop('readonly' , true);
                                }
                            }
                            else {
                                time.prop('readonly' , false);
                                time.attr('type' , 'time');
                                time.val('');
                            }
                        }
                        else {
                            time.prop('readonly' , false);
                            time.attr('type' , 'time');
                            time.val('');
                        }
                    },
                    error: function(xhr) {
                        console.log(xhr);
                    }
                });
            });

            $(document).on('click', '.newStationBtn', function() {
                $('.newStationCard').removeClass('d-none');
                $('.newStationCard').append('<div class="stationCard mt-3" style="position:relative; margin-top:29px!important;"><button class="btn p-0 m-0 dltCardBtn" style="position:absolute; right:5px; top:0px;" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></button><input class="input-group stationName" name="stationName[]" placeholder="Station Name" size="24" maxlength="48" required /><br/><br/><input type="time" class="input-group setTime" name="stationDeparture[]" disabled /></div>');

                $('.newStosCard').removeClass('d-none');
                $('.newStosCard').append('<div class="stosCard" style="margin-top:29px;"><input type="number" class="input-group stosD" name="stosDistance[]" placeholder="Distance (km)" min="1" step="0.1" required /><br/><br/><div id="seconds"><input type="number" class="setSeconds" name="minutesTaken[]" min="00" max="59" placeholder="-- (minutes)" required> : <input type="number" class="setSeconds" name="secondsTaken[]" min="00" max="59" placeholder="-- (seconds)" required></div></div>');
            });

            $('.leftCard').on('click', '.dltCardBtn', function() {
                var index = $(this).parent().index() + 1;
                $(this).parent().remove();
                $('.rightCard').find('.stosCard').eq(index).remove();
            });

            $(document).on('click', '.backBtn', function() {
                    window.location.href = '/adminroute';
            });
            
        });


    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\XAMPP\htdocs\TRAINZILLA\trainzilla-backend\resources\views/adminroutecreate.blade.php ENDPATH**/ ?>