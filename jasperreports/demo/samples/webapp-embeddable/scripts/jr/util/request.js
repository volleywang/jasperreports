/**
 * Wrapper around jQuery ajax to switch to cross-domain in future
 * @author: nesterone
 */
define(function (require, exports, module) {

    var jqReq = require("jquery-1.10.2").ajax,
        xdmReq = require("crossDomain/easyXdmRequest"),
        purl = require("purl"),
        $ = require("jquery-1.10.2");


    function isCrossDomainRequest(targetUrl){

        var targetHost = purl(targetUrl).attr("host")+":"+ purl(targetUrl).attr("port");

        if (targetHost == ":"){
            //relative url, it's not cross domain
            return false;
        }else{
            return window.location.host != targetHost;
        }
    }


    return function(url, options){

        if(!isCrossDomainRequest(url)){
            console.debug("["+module.id+"]" + "Use jqXhr request");
            return jqReq.apply(null,arguments);
        }else{
            console.debug("["+module.id+"]" + "Use xdmReq request");
            return xdmReq.apply(null, arguments);

        }
    };
});
