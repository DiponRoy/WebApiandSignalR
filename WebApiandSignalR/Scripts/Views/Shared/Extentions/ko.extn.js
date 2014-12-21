/*custom bindingHandler for error message*/

; (function (ko) {
    ko.bindingHandlers.validationCore = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var span = document.createElement('SPAN');
            span.className = 'validationMessage';
            var parent = $(element).parent().closest(".input-group");
            if (parent.length > 0) {
                $(parent).after(span);
            } else {
                $(element).after(span);
            }
            ko.applyBindingsToNode(span, { validationMessage: valueAccessor() });
        }
    };
})(ko);



/*track the number of re-evaluations for a computed observable*/
; (function (ko) {
    ko.observableArray.fn.trackReevaluations = function () {
        var self = this;
        self.reevaluationCount = ko.observable(0);
        self.subscribe(function () {
            this.reevaluationCount(this.reevaluationCount() + 1);
        }, self);
        return self;
    };
    ko.utils.debugInfo = function (items) {
        return ko.computed(function () {
            //new in KO 2.1. it used to be JSON.stringify(ko.toJS(timeslots), null, 2)
            return ko.toJSON(items, null, 2);
        });
    };
})(ko);


/*Knockout.DirtyFlag*/
; (function (ko) {
    ko.DirtyFlag = function (objectToTrack, isInitiallyDirty, hashFunction) {

        hashFunction = hashFunction || ko.toJSON;

        var
            _objectToTrack = objectToTrack,
            _lastCleanState = ko.observable(hashFunction(_objectToTrack)),
            _isInitiallyDirty = ko.observable(isInitiallyDirty),

            result = function () {
                var self = this;

                self.isDirty = ko.computed(function () {
                    return _isInitiallyDirty() || hashFunction(_objectToTrack) !== _lastCleanState();
                });

                self.makeDirty = function() {
                    _isInitiallyDirty(true);
                };

                self.reset = function () {
                    _lastCleanState(hashFunction(_objectToTrack));
                    _isInitiallyDirty(false);
                };

                return self;
            };

        return result;
    };
})(ko);
