/**
 * EasyXdm solution for cross-domain request
 * @author: nesterone
 */
define(function (require, exports, module) {

     "use strict";

    var factory = require("crossDomain/easyXdmFactory").createRequest,
        hostUrl = require("jr/appContext").serverUrl;

    var options = {
        remoteHost : hostUrl,
        swfUrl : hostUrl + "/provicer/easyxdm.swf",
        remotePageUrl: hostUrl + "/provider/provider.html",
        remoteHelperUrl: hostUrl + "/provider/name.html",
        localHelperUrl: "/provider/name.html"
    };

    console.debug("["+module.id+"]" + "Start to create xdm with", options);

    return factory(options);
});
