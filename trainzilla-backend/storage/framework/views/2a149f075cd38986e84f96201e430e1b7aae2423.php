<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="/css/admin1.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
         <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>        
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <title>TRAINZILLA | ADMIN PANEL</title>
        <script>
            localStorage.clear();
        </script>
        <style>
            .sentMsg {
                width: 100%;
                word-break: normal;
                margin-right: -288px;
                margin-left: 36px;
            }

            .resetBtn:disabled {
                background: #EEEEEE;
            }
        </style>
    </head>

    <body style="background-color: #E0E5FF; width: 100%; height: 100%;" id="login-page">
        <form action="/resetForgotPassword" method="post">
        <?php echo e(csrf_field()); ?>

        <input type="hidden" name="_token" value="<?php echo e(csrf_token()); ?>">

        <div id="login-card" class="wcard">
            <div style="font-size:1.2em;">Welcome to TRAINZILLA admin panel !</div>
            <div class="font-weight-bold mb-3">Reset Password : </div>

            <?php if(session()->has('failed')): ?>
                <div class="text-danger mt-2"><?php echo e(session()->pull('failed')); ?></div>
            <?php endif; ?>

            <?php if(session()->has('sent')): ?>
                <div class="text-danger mt-2 sentMsg text-center"><?php echo e(session()->pull('sent')); ?></div>
                <input type="hidden" value="emailSent" class="btnCheck"/>
            <?php endif; ?>

            <br/>
            <div>
                Admin Email : <input type="email" name="email" placeholder="Please enter your email address" class="input-group" size="29" required />
            </div>
            <div class="mb-3 mt-1">
                <a href="/adminlogin" >Back to SIGN IN page.</a>
            </div>
            <br/>
            <div class="d-flex justify-content-center" style="margin-left:58px;"><button type="submit" class="blue-btn resetBtn">RESET PASSWORD</button></div>
        </div>
        </form>
    </body>
    
    <script>
        $(document).ready(function() {
            if($('.btnCheck').val() == 'emailSent') {
                $('.resetBtn').prop('disabled', true);
            }
        });
    </script>
</html><?php /**PATH C:\XAMPP\htdocs\TRAINZILLA\trainzilla-backend\resources\views//adminforgetpassword.blade.php ENDPATH**/ ?>