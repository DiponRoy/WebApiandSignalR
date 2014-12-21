define('vm.student.list',
    ['jquery', 'ko', 'notify', 'model.student', 'dataservice.student', 'hub.student'],
    function ($, ko, notify, model, service, hub) {

        var students = ko.observableArray([]),            
            getById = function(id) {
                var value = $.grep(students(), function(obj) {
                    return obj.id() === id;
                });
                return value[0];
            },

            showInNewPage = function (item) {
                window.location = '/StudentManage/Update/' + item.id();
            },
            
            remove = function (item) {
                service.remove({
                    success: function () {
                        notify.success('Student removed.');
                        students.remove(item);
                    },
                    error: function () {
                        notify.error();
                    }
                }, item.toHubedPostObject(hub.connectionId()));
            },
            
            confirmToRemove = function(item) {
                notify.confirm("Are you sure, you want to delete the stuent ?", function(result) {
                    if (result === true) {
                        remove(item);
                    }
                });
            },
            
            getAll = function() {
                students([]);
                service.all({
                    success: function (data) {
                        notify.info('Students loaded.');
                        var arr = new Array();
                        $.each(data, function (index) {
                            var value = new model();
                            value.resetFrom(data[index]);
                            arr.push(value);
                        });
                        students(arr);
                    },
                    error: function() {
                        notify.error();
                    }
                });
            };
        
        
        /*notifications from controller*/
        hub.notifyBySelf.afterRemoved(function (updatedStudent) {
            hub.notifyOthers.removed(updatedStudent.Id); // send notifications to others
        });

        /*notifications from hub*/
        hub.notifyByOthers.created(function (student) {
            notify.warning('new student created. Id = ' + student.Id);
            var createdStudent = new model();
            createdStudent.resetFrom(student);
            students.push(createdStudent);
        });
        hub.notifyByOthers.updated(function (student) {
            notify.warning('a student was been updated. Id = ' + student.Id);
            var aStudent = getById(student.Id);
            aStudent.resetFrom(student);
        });
        hub.notifyByOthers.removed(function (studentId) {
            notify.warning('a student is been removed. Id = ' + studentId);
            var aStudent = getById(studentId);
            students.remove(aStudent);
        });
        
        //important to set callbacks before connection
        hub.connect();

        return {
            students: students,
            
            getAll: getAll,
            showInNewPage: showInNewPage,
            confirmToRemove: confirmToRemove,
        };
    });