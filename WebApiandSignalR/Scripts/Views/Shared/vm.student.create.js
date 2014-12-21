define('vm.student.create',
    ['jquery', 'ko', 'notify', 'model.student', 'dataservice.student', 'hub.student'],
    function ($, ko, notify, model, service, hub) {

        var student = new model(),

            /*errors*/
            errors = ko.validation.group(student),
            hasErrors = function () { return (errors().length > 0) ? true : false; },
            showErrors = function () { errors.showAllMessages(); },
            removeErrors = function () { errors.showAllMessages(false); },

            /*dirtyFlag*/
            dirtyFlag = new ko.DirtyFlag(student),
            isDirty = function () { return dirtyFlag().isDirty(); },
            resetDirtyFlag = function () { dirtyFlag().reset(); },

            create = function () {
                if (hasErrors()) {
                    showErrors();
                    return;
                }
                service.create({
                    success: function (data) {
                        notify.success('Student created.');
                        reset();
                    },
                    error: function () {
                        notify.error('Error.');
                    }
                }, student.toHubedPostObject(hub.connectionId()));
            },

            reset = function () {
                student.reset();
                removeErrors();
                resetDirtyFlag();
            };


        /*notifications from controller*/
        hub.notifyBySelf.afterCreated(function (createdStudent) {
            hub.notifyOthers.created(createdStudent); // send notifications to others
        });
        
        /*connect to the hub*/
        hub.connect();

        return {
            student: student,           
            isDirty: isDirty,
            
            create: create,
            reset: reset
        };
    });