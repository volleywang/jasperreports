/**
 * Old context objects
 * @author: nesterone
 */
define(function (require) {

    "use strict";

    var $ = require("jquery-1.10.2"),
        _ = require("underscore"),
        jive = require("jive"),
        Loader = require("jasperreports-loader"),
        EventManager = require("jasperreports-event-manager"),
        appContext = require("jr/appContext");

    var options = {
        async : false,
        eventManager: EventManager,
        reporturi : "reports/TableReport.jasper"
    };

    var loader = new Loader(options);

    loader.UrlManager.applicationContextPath =  appContext.serverUrl;

    var fakeReport = {

        components : {},

        eventManager : new EventManager(),

        _notify : function(evt){
            console.log("Mock Report notification... ", evt.name);
        },

        loader : loader

    };

    return {

        report: fakeReport,

        loader: loader

    };
});
