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


function getHtml(url) {
    if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	}
    else
	{// code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}    
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;

    return xmlDoc;
}

function getXmlValue(v) {
    var x = v;
    for(var i=0; i < x.length; i++) {
	if (x[i].nodeName == "value") {
	    return x[i].textContent;
	}
    }
    return "";
}

function getWeather() {
    var data = {};
    var xmlDoc = getHtml("http://forecast.weather.gov/MapClick.php?lat=39.47040&lon=-87.3835&unit=0&lg=english&FcstType=dwml");

    data.maxTemp = getXmlValue(xmlDoc.getElementsByTagName("temperature")[0].childNodes);
    data.minTemp = getXmlValue(xmlDoc.getElementsByTagName("temperature")[1].childNodes);
    data.currTemp = getXmlValue(xmlDoc.getElementsByTagName("temperature")[2].childNodes);
    data.forecast = xmlDoc.getElementsByTagName("text")[0].textContent;

    return data;
}

function geolocationSuccess(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

    //
    var rootlat = 39.472046;
    var rootlong = -87.407752;
    

    var R = 6371; // km
    var dLat = (rootlat-position.coords.latitude)*3.14159/180;
    var dLon = (rootlong-position.coords.longitude)*3.14159/180;
    var lat1 = position.coords.latitude*3.14159/180;
    var lat2 = rootlat*3.14159/180;

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;

    document.getElementById("distance").innerHTML = d + " km";
}

function geolocationError(error) {
    document.getElementById("distance").innerHTML = "GPS error" + error.code + " " + error.message;
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

	weatherData = getWeather();
	document.getElementById("temperature").innerHTML = weatherData.currTemp + ", " + weatherData.maxTemp + ", " +
	weatherData.minTemp;
	document.getElementById("forecast").innerHTML = weatherData.forecast;

	//alert("Hello...");
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	//alert("Cheers!");
	if (!navigator) alert("No navigator");
	else if (!navigator.geolocation) alert("No navigator.geolocation");
	else if (!navigator.geolocation.getCurrentPosition) alert("No navigator.geolocation.getCurrentPosition");
	else navigator.geolocation.getCurrentPosition(geolocationSuccess,
						 geolocationError,
                                                 {enableHighAccuracy:true});
    }
};

