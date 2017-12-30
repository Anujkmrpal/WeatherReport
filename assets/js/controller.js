app.controller("weatherCntr", function ($scope, weatherFactory, NgMap) {
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
            var array = $scope.cityData[$scope.cityData.length - 1];
            console.log("array", array);
            $scope.myValues = [[array.temp.humidity, array.temp.temp_max, array.temp.temp_min, array.temp.temp]];
            $scope.myObj = {
                series: [
                    {
                        lineColor: "#900000"
                        , marker: {
                            backgroundColor: "#dc3737"
                            , borderWidth: 1
                            , shadow: 0
                            , borderColor: "#f56b6b"
                        }
            }
            ]
            };
        }, function (error) {
            $scope.result = error;
        });
        //chart
        //
        //chart end
        //map
        $scope.zoom = 12;
        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbPS1Kz6lF4e6C9_lo9ex1jH6VqLr7gqY";
        NgMap.getMap().then(function (map) {
            //            var tsry = map.getBounds().contains(marker.getPosition());
            //            console.log("try", tsry);
            //            console.log("map", map);
            //            console.log('markers', map.markers);
            //            console.log('shapes', map.shapes);
        });
        //    })
    }
})