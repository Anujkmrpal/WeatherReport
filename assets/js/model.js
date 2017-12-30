app.factory("weatherFactory", function ($http, $q) {
    var object = {};
    object.callServer = function (cityName) {
        var defered = $q.defer();
        var url = "https://api.openweathermap.org/data/2.5/forecast?appid=41759783c8ef8257cd229fff2283fe50&q=" + cityName;
        $http.get(url).then(success, fail);

        function success(data) {
            defered.resolve(data);
        }

        function fail(error) {
            defered.reject(error);
        }
        return defered.promise;
    }
    return object;
});