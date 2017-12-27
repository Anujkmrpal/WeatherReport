app.controller("weatherCntr", function ($scope, weatherFactory) {
    var cityObject = {};
    $scope.cityData = [];
    $scope.submitForm = function () {
        var cityName = $scope.cityName;
        //time of usa
        var d = new Date();
        var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000 * 5.5));
        console.log("time usa ", nd);
        //end time code
        // creation of object of cityinfo and push to array
        var promise = weatherFactory.callServer(cityName);
        promise.then(function (data) {
            cityObject = {
                leti: data.data.city.coord.lat
                , lon: data.data.city.coord.lon
                , temp: data.data.list[0].main
            }
            $scope.cityData.push(cityObject);
            console.log("array", $scope.cityData);
            initialize();
        }, function (error) {
            $scope.result = error;
        });
        //chart
        //chart end
    }
})