app.controller("weatherCntr", function ($scope, weatherFactory, NgMap) {
    $scope.plus = 0;
    var cityObject = {};
    $scope.cityData = [];
    $scope.array = [];
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
            //object to store on temprature data
            //            tempratureObj = {
            //                humidity: cityObject.temp.humidity
            //                , max_temp: cityObject.temp.temp_max
            //                , min_temp: cityObject.temp.temp_min
            //                , pressure: cityObject.temp.pressure
            //                , sea_level: cityObject.temp.sea_level
            //            }
            tempratureObj = [cityObject.temp.humidity, cityObject.temp.temp_max, cityObject.temp.temp_min, cityObject.temp.pressure, cityObject.temp.sea_level];
            $scope.array.push(tempratureObj);
            console.log("array", $scope.array);
            //            var array = $scope.cityData[$scope.cityData.length - 1];
            //            var key = Object.keys(array.temp);
            //            var len = key.length;
            //object
            //                        $scope.myValues = [array.temp.humidity, array.temp.temp_max, array.temp.temp_min, array.temp.pressure, array.temp.sea_level];
            //            var zingchart = angular.element("<div zingchart zc-values='myValues' zc-json='myJson' zc-width='100%' zc-height='100%'></div>");
            //            var target = document.getElementById('resizable');
            //    angular.element(resizable).append(zingchart);
            //                        for (i = 0; i < array.length; i++) {
            //                            $scope.nfLines[vm.nflLines[i].AwayAbbrev] = {
            //                                [Zingchart json configuration goes here]
            //                            }
            //                        }
            function thejson() {
                $scope.myJson = {
                    title: {
                        text: "Weather Report"
                        , fontSize: 16
                        , fontColor: "#fff"
                    }
                    , backgroundColor: "#2bbb9a"
                    , globals: {
                        shadow: false
                        , fontFamily: "Arial"
                    }
                    , type: "line"
                    , scaleX: {
                        markers: []
                        , labels: ['Humidity', 'Temp_max', 'Temp_min', 'Pressure', 'Sea_level']
                        , maxItems: 8
                        , lineColor: "white"
                        , lineWidth: "1px"
                        , tick: {
                            lineColor: "white"
                            , lineWidth: "1px"
                        }
                        , item: {
                            fontColor: "white"
                        }
                        , guide: {
                            visible: false
                        }
                    }
                    , scaleY: {
                        lineColor: "white"
                        , lineWidth: "1px"
                        , tick: {
                            lineColor: "white"
                            , lineWidth: "1px"
                        }
                        , guide: {
                            lineStyle: "solid"
                            , lineColor: "#249178"
                        }
                        , item: {
                            fontColor: "white"
                        }
                    , }
                    , tooltip: {
                        visible: false
                    }
                    , crosshairX: {
                        lineColor: "#fff"
                        , scaleLabel: {
                            backgroundColor: "#fff"
                            , fontColor: "#323232"
                        }
                        , plotLabel: {
                            backgroundColor: "#fff"
                            , fontColor: "#323232"
                            , text: "%v"
                            , borderColor: "transparent"
                        }
                    }
                    , plot: {
                        lineWidth: "2px"
                        , lineColor: "#FFF"
                        , aspect: "spline"
                        , marker: {
                            visible: false
                        }
                    }
                    , series: [{
                        //                        values: [$scope.array[$scope.plus].humidity, $scope.array[$scope.plus].max_temp, $scope.array[$scope.plus].min_temp, $scope.array[$scope.plus].pressure, $scope.array[$scope.plus].sea_level]
    }]
                }
                $scope.plus++;
                console.log("plus", $scope.plus);
            }
            thejson();
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
        $scope.zoom = 10;
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