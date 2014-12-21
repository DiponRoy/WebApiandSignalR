/*
represents Student table entity

*/


/*TODO: cann't create new object from it, only works as one*/
//define('model.student',
//    ['ko'],
//    function (ko) {

//        var
//        /*properties*/
//        id = ko.observable(),
//        firstName = ko.observable().extend({ required: true, maxLength: 25 }),
//        lastName = ko.observable().extend({ required: true, maxLength: 25 }),
//        address = ko.observable().extend({ required: true, maxLength: 50 }),

//        /*mapp vm to stuent object*/
//        toPostObject = function () {
//            return {
//                Id: id(),
//                FirstName: firstName(),
//                LastName: lastName(),
//                Address: address()
//            };
//        },

//        /*reset properties*/
//        reset = function () {
//            id('');
//            firstName('');
//            lastName('');
//            address('');
//        },

//        /*reset from given obj*/
//        resetFrom = function (obj) {
//            id(obj.Id);
//            firstName(obj.FirstName);
//            lastName(obj.LastName);
//            address(obj.Address);
//        };

//        return {
//            id: id,
//            firstName: firstName,
//            lastName: lastName,
//            address: address,

//            toPostObject: toPostObject,
//            reset: reset,
//            resetFrom: resetFrom
//        };
//    });






///*TODO: can create new object from it*/
//define('model.student',
//    ['ko'],
//    function (ko) {

//        var Student = function () {

//            var self = this;

//            /*properties*/
//            self.id = ko.observable();
//            self.firstName = ko.observable().extend({ required: true, maxLength: 25 });
//            self.lastName = ko.observable().extend({ required: true, maxLength: 25 });
//            self.address = ko.observable().extend({ required: true, maxLength: 50 });

//            /*mapp vm to stuent object*/
//            self.toPostObject = function () {
//                return {
//                    Id: self.id(),
//                    FirstName: self.firstName(),
//                    LastName: self.lastName(),
//                    Address: self.address()
//                };
//            };

//            /*reset properties*/
//            self.reset = function () {
//                self.id('');
//                self.firstName('');
//                self.lastName('');
//                self.address('');
//            };

//            /*reset from given obj*/
//            self.resetFrom = function (obj) {
//                self.id(obj.Id);
//                self.firstName(obj.FirstName);
//                self.lastName(obj.LastName);
//                self.address(obj.Address);
//            };

//        };


//        return Student;
//    });


/*TODO: can create new object from it*/
define('model.student',
    ['ko'],
    function (ko) {

        var student = function () {
            var self = this;
            self.id = ko.observable();
            self.firstName = ko.observable().extend({ required: true, maxLength: 25 });
            self.lastName = ko.observable().extend({ required: true, maxLength: 25 });
            self.address = ko.observable().extend({ required: true, maxLength: 50 });
        };

        student.prototype = function () {
            var
                /*mapp vm to stuent object*/
                toPostObject = function () {
                    var self = this;
                    return {
                        Id: self.id(),
                        FirstName: self.firstName(),
                        LastName: self.lastName(),
                        Address: self.address()
                    };
                },
                
                toHubedPostObject = function (connectionId) {
                    var self = this;
                    return {
                        Entity: self.toPostObject(),
                        ConnectionId: connectionId,
                    };
                },

                /*reset properties*/
                reset = function () {
                    var self = this;
                    self.id('');
                    self.firstName('');
                    self.lastName('');
                    self.address('');
                },

                /*reset from given obj*/
                resetFrom = function (obj) {
                    var self = this;
                    self.id(obj.Id);
                    self.firstName(obj.FirstName);
                    self.lastName(obj.LastName);
                    self.address(obj.Address);
                };

            return {
                toPostObject: toPostObject,
                toHubedPostObject: toHubedPostObject,
                reset: reset,
                resetFrom: resetFrom
            };
        }();

        return student;
    });



