/**
 * Css pluging to work with JR
 * User: nesterone
 */
define(function (require) {

    var cssPlugin = require("cssPlugin"),
        _ = require("underscore"),
        loadFn = cssPlugin.load,
        appContext = require("jr/appContext"),
        resourcesMap = {
            "jasperreports-global" : appContext.serverUrl + "/servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/jasperreports-global",
//            "jive.vm" : appContext.serverUrl + "/scripts/jr/report/jive/template/jive.vm"
        };

    return _.extend(cssPlugin, {

        load : function(){
            arguments[0] = resourcesMap[arguments[0]];
            loadFn.apply(cssPlugin, arguments);
        }


    });
});
