define('vm.student.update',
    ['jquery', 'ko', 'notify', 'model.student', 'dataservice.student', 'hub.student'],
    function ($, ko, notify, model, service, hub) {

        var
            oldStudent = new model(),
            student = new model(),

            /*errors*/
            errors = ko.validation.group(student),
            hasErrors = function () { return (errors().length > 0) ? true : false; },
            showErrors = function () { errors.showAllMessages(); },
            removeErrors = function () { errors.showAllMessages(false); },

             /*dirtyFlag*/
            dirtyFlag = new ko.DirtyFlag(student),
            isDirty = function () { return dirtyFlag().isDirty(); },
            resetDirtyFlag = function () { dirtyFlag().reset(); },
            makeDirty = function () { dirtyFlag().makeDirty(); },

            
            /*already affected flags*/
            isUpdatedByOthers = ko.observable(false),
            isRemovedByOthers = ko.observable(false),


            setId = function(studentId) {
                student.id(studentId);
                resetDirtyFlag();
            },
            
            get = function () {
                return service.single({
                    success: function (data) {
                        oldStudent.resetFrom(data);
                        reset();
                        notify.info('Student loaded.');
                    },
                    error: function (a, d, f) {
                        notify.error('Error.');
                    }
                }, student.id());
            },

            update = function () {
                if (hasErrors()) {
                    showErrors();
                    return;
                }
                service.update({
                    success: function (data) {
                        oldStudent.resetFrom(student.toPostObject());
                        reset();
                        notify.success('Student updated.');
                    },
                    error: function () {
                        notify.error('Error.');
                    }
                }, student.toHubedPostObject(hub.connectionId()));
            },

            reset = function () {
                student.resetFrom(oldStudent.toPostObject());
                removeErrors();
                resetDirtyFlag();
                isUpdatedByOthers(false);
            };
        

        /*notifications from controller*/
        hub.notifyBySelf.afterUpdated(function (updatedStudent) {
            oldStudent.resetFrom(updatedStudent);
            reset();
            hub.notifyOthers.updated(updatedStudent); // send notifications to others
        });

        /*notifications from Hub*/
        hub.notifyByOthers.updated(function (updatedStd) {
            if (oldStudent.id() === updatedStd.Id) {
                isUpdatedByOthers(true);
                oldStudent.resetFrom(updatedStd);
                makeDirty();
                notify.warning('This student was been updated.');
            }
        });
        hub.notifyByOthers.removed(function (studentId) {
            if (oldStudent.id() === studentId) {
                isRemovedByOthers(true);
                notify.warning('This student is been removed.');
            }
        });
        
        //important to set callbacks before connection
        hub.connect();

        return {
            student: student,
            isDirty: isDirty,
            isUpdatedByOthers: isUpdatedByOthers,
            isRemovedByOthers: isRemovedByOthers,
            
            setId: setId,
            get: get,
            update: update,
            reset: reset,
        };
    });