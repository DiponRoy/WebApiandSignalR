/*
represents Student Hub
*/
define('hub.student',
    ['jquery', 'ko'],
    function ($) {

        /*Hub connections*/
        var connectionId = ko.observable(),

            hub = $.connection.studentHub,

            connect = function () {
                $.connection.hub.start().done(function () {
                    connectionId($.connection.hub.id);
                });
            };

        /*let others know about created, updated, or removed student*/
        var notifyOthers = {
                created: function (student) {
                    hub.server.created(student);
                },
                updated: function (student) {
                    hub.server.updated(student);
                },
                removed: function (studentId) {
                    hub.server.removed(studentId);
                }
        };

        /*get notifications from others, if a student is been created, updated, or removed*/
        var notifyByOthers = {
            created: function (callBackFunction) {
                hub.client.created = function (student) {
                    callBackFunction(student);
                };
            },
            updated: function (callBackFunction) {
                hub.client.updated = function (student) {
                    callBackFunction(student);
                };
            },
            removed: function (callBackFunction) {
                hub.client.removed = function (studentId) {
                    callBackFunction(studentId);
                };
            }
        };

        /*get notifications from own affects*/
        var notifyBySelf = {
            afterCreated: function (callBackFunction) {
                hub.client.afterCreated = function (student) {
                    callBackFunction(student);
                };
            },
            afterUpdated: function (callBackFunction) {
                hub.client.afterUpdated = function (student) {
                    callBackFunction(student);
                };
            },
            afterRemoved: function (callBackFunction) {
                hub.client.afterRemoved = function (student) {
                    callBackFunction(student);
                };
            }
        };

        return {
            connectionId: connectionId,

            notifyOthers: notifyOthers,
            notifyBySelf: notifyBySelf,
            notifyByOthers: notifyByOthers,

            connect: connect
        };
    });