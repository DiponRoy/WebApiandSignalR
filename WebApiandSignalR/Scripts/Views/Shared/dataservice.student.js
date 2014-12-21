/*
represents Student Api Controller
*/


define('dataservice.student',
    ['amplify'],
    function (amplify) {
        
        var init = function() {

            amplify.request.define('students.all', 'ajax', {
                url: '/api/student/get',
                dataType: 'json',
                type: 'GET'
            }),            
            amplify.request.define('students.single', 'ajax', {
                url: '/api/student/get/{Id}',
                dataType: 'json',
                type: 'GET'
            });

            amplify.request.define('students.create', 'ajax', {
                url: '/api/student/post',
                dataType: 'json',
                type: 'POST',
            });
            
            amplify.request.define('students.update', 'ajax', {
                url: '/api/student/put',
                dataType: 'json',
                type: 'PUT',
            });
            
            amplify.request.define('students.remove', 'ajax', {
                url: '/api/student/delete',
                dataType: 'json',
                type: 'DELETE',
            });
        },
            
            all = function(callbacks) {
                return amplify.request({
                    resourceId: 'students.all',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            single = function(callbacks, id) {
                return amplify.request({
                    resourceId: 'students.single',
                    data: { Id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            create = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'students.create',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            update = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'students.update',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            remove = function(callbacks, data) {
                return amplify.request({
                    resourceId: 'students.remove',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            all: all,
            single: single,
            create: create,
            update: update,
            remove: remove
        };
    });