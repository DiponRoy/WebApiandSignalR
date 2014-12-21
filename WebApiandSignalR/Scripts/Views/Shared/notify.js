/*
for messaging and push notifications
*/

define('notify',
    ['toastr', 'bootbox'],
    function (toastr, bootbox) {

        toastr.options = {
            "closeButton": true,
            "debug": true,
            "positionClass": "toast-top-right",
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        var
            /*toastr*/
            success = function (message) {
                toastr.success(message, 'Success.');
            },            
            info = function(message) {
                toastr.info(message, 'Info.');
            },            
            warning = function(message) {
                toastr.warning(message, 'Warning.');
            },            
            error = function(message) {
                toastr.error('There has been an error, please try again', 'Error.');
            },
            

            /*bootbox*/
            alert = function(message) {
                bootbox.alert(message);
            },
            confirm = function (message, callback) {
                bootbox.confirm(message, callback);
            };


        return {          
            success: success,
            info: info,
            warning: warning,
            error: error,
            
            alert: alert,
            confirm: confirm
        };
    });