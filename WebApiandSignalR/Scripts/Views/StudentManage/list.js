
(function () {
    var root = this;

    function defineJslibraries() {
        define('jquery', [], function () { return root.jQuery; });
        define('amplify', [], function () { return root.amplify; });
        define('ko', [], function () { return root.ko; });
        define('toastr', [], function () { return root.toastr; });
        define('bootbox', [], function () { return root.bootbox; });
    }

    function loadDefinedModules() {
        require.config({
            baseUrl: "/Scripts/Views/Shared"
        });
    }

    function boot() {
        require(['jquery', 'ko', 'vm.student.list'], function ($, ko, vm) {
            ko.applyBindings(vm, $('#divStudentList').get(0));
            vm.getAll();
        });
    }
    
    defineJslibraries();
    loadDefinedModules();
    boot();
})();