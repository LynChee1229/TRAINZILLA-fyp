

<?php $__env->startSection('content'); ?>
    <head>
        <title>TRAINZILLA | ADMIN</title>
        <style>
            .mapBtn , .newBtn {
                background-color: #E0E5FF !important;
                border: #99AAFF 1px solid !important;
                padding: 5px 8px !important;
                font-size: 0.9em;
            }

            .mapBtn:hover , .newBtn:hover {
                background-color: #99AAFF !important;
                color: white !important;
            }

            .editBtn {
                font-size: 0.8em;
                color: #415BDE;
                box-shadow: #C0C0C0 2px 2px 4px;
            }

            .editBtn:hover {
                color: #415BDE;
                box-shadow: blue 1px 1px 5px;
            }
        </style>
    </head>

    <div class="card-ttl">Transit Map</div>
    <a href="/routemap" target="_blank">
    <button class="btn blue-btn font-weight-bold mt-2 mb-5 mapBtn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-map mr-2 mb-1" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
    </svg>Preview Transit Map</button>
    </a>

    <div class="card-ttl">Route List</div>
    <?php if(session()->has('success')): ?>
        <div class="text-success my-3"><?php echo e(session()->pull('success')); ?></div>
    <?php endif; ?>

    <?php if(session()->has('failed')): ?>
        <div class="text-danger my-3"><?php echo e(session()->pull('failed')); ?></div>
    <?php endif; ?>
    <div>
        <table class="table table-bordered table-striped" id="routeTable">
            <thead>
                <tr>
                    <th style="width:24%;">Route Title</th>
                    <th style="width:%;">Station Details</th>
                    <th style="width:18%;">Static Time Table</th>
                    <th style="width:12%;">Action</th>
                </tr>
            </thead>
            <tbody id="routeTableBody">
            <?php if(isset($list) && count($list)>0): ?>
            <?php $__currentLoopData = $list; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $l): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
                <td>
                    <p style="word-break: break-word;"><?php echo e($l->routeTitle); ?>

                    <?php if($l->routeStatus == '1'): ?>
                        <span class="ml-2 activeStatus">Active</span>
                    <?php elseif($l->routeStatus == '0'): ?>
                        <span class="ml-2 inactiveStatus">Inactive</span>
                    <?php endif; ?>
                    </p>
                </td>
                <td>
                    <div class="float-right">
                        <form action="/editRoutePage" method="post">
                        <?php echo e(csrf_field()); ?>

                        <input type="hidden" name="_token" value="<?php echo e(csrf_token()); ?>">
                        <input type="hidden" class="aUC" name="aUC" />
                            <button class="btn editBtn m-0 p-1" name="rid" value="<?php echo e($l->routeID); ?>"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square mr-1 mb-1" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>Edit</button>
                        </form>
                    </div>
                    <p style="word-break: break-word;"><?php echo e($station[$index]['firstStation']); ?> --- <?php echo e($station[$index]['lastStation']); ?> <span class="ml-2 text-info">| <span class="ml-1"><?php echo e($station[$index]['stationNum']); ?> stations </span></span></p>
                </td>
                <td style="text-align:center;">
                    <p><button type="button" class="btn timetableBtn mb-2 p-0" style="color:#516BEC;" value="<?php echo e($l->routeID); ?>" onclick="location.href='/timetable?id=<?php echo e($l->routeID); ?>'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4 mr-2 mb-1" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
                    </svg>View Time Table</button></p>
                </td>
                <td style="text-align:center;">
                    <div>
                        <form method="get" action="/changeRouteStatus">
                            <input type="hidden" class="aUC" name="aUC" />
                            <input type="hidden" name="rid" value="<?php echo e($l->routeID); ?>"/>
                            <?php if($l->routeStatus == '1'): ?>
                                <button class="btn deactivateBtn mb-2" value="deac" name="sAction">Deactivate</button>
                            <?php elseif($l->routeStatus == '0'): ?>
                                <button class="btn activateBtn mb-2" value="act" name="sAction">Activate</button>
                            <?php endif; ?>
                        </form>
                    </div>
                </td>
            </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php endif; ?>
            </tbody>
        </table>
    </div>
    <div>
        <button class="btn blue-btn font-weight-bold my-3 newBtn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bezier2 mr-1 mb-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/></svg>Create New Route</button>
    </div>

    <script>
        var adminUC = window.localStorage.getItem('adminUniqueCode');
        $('.aUC').val(adminUC);

        $(document).ready(function() {

            $('#routeTable').DataTable();

            $(document).on('click', '.newBtn', function() {
                window.location.href = '/createroute';
            });

        });
    </script>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\XAMPP\htdocs\TRAINZILLA\trainzilla-backend\resources\views/adminroute.blade.php ENDPATH**/ ?>