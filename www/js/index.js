/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$(document).ready(function(){
    console.log("Hello world...");

    getLocation().then((location)=>{
        return weatherData(location);
    }).then((weatherData)=>{
        console.log(weatherData);
        renderData(weatherData);
    })
    
});

//get location coordinates


var getLocation = function(){
   return new Promise((resolve, reject)=>{
        $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWO8tV87DC4tCaHOLoADkL71G-jcyBdwk",
            (data)=>{
                resolve({lat: data.location.lat, lng: data.location.lng});
            }
        );
   });
};

var weatherData = function(location){
    return new Promise((resolve, reject)=>{
        $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + location.lat + "&lon=" + location.lng + "&units=metric&APPID=2048abd4ff09cb4eaa1f62dc9a077ba6",
            (weatherData)=>{
                
                resolve(weatherData);
            }
        );


    })
};

var renderData = function(data){
    $("#cityName").append("<center>"+data.name+"</center>");
    
    var temperature = Math.round(data.main.temp);

    $("#temp").append("<center>"+temperature+" <span>&#8451;</span></center>");

    $("#w_description").append("<center>"+data.weather[0].description+"</center>")
};


