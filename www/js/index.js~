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

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

	weatherData = getWeather();
	document.getElementById("temperature").innerHTML = weatherData.currTemp + ", " + weatherData.maxTemp + ", " +
	weatherData.minTemp;
	document.getElementById("forecast").innerHTML = weatherData.forecast;
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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        //console.log('Received Event: ' + id);
    }
};

