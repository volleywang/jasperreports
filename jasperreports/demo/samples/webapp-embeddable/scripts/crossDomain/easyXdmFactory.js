
define(function (require) {

    "use strict";

    var easyXDM = require("easyXDM"),
        $ = require("jquery"),
        PubSub = require("PubSub"),
        RESPONSE_IS_READY = "EasyXdmRemoteResponse",
        _ = require("underscore");

    function buildRemote(options){

        var remotePromise = new $.Deferred(),
            remote = new easyXDM.Rpc({
                swf: options.swfUrl,
                remote: options.remotePageUrl,
                remoteHelper: options.remoteHelperUrl,
                local: options.localHelperUrl,
                onReady: function(data){
                    console.log("EasyXdm is ready for use");
                    remotePromise.resolve(remote);
                }
            }, {
                remote: {
                    request: {}
                },
                local: {
                    response : function(result, status, jXhr, id, header){
                        console.warn(header);
                        //use synchronous messaging to avoid decoupling result from request
                        PubSub.publishSync(RESPONSE_IS_READY+":"+id, {
                            result:result, status: status, jXhr:jXhr, header: header
                        });
                    }
                }
            });

        return remotePromise;

    }

    function emulateJqXhr(data){

        return _.extend(data.jXhr, {

            getResponseHeader : function(key){
                return data.header[key];
            }

        });
    }

//    PubSub.subscribe(RESPONSE_IS_READY+":", function(msg, data){
//        console.debug(msg, data);
//    });

    return {


        createRequest : function (options){


            var remotePromise = buildRemote(options);

            return  function(url, settings){


                var responsePromise = new $.Deferred();

                remotePromise.then(function(remote){
                    remote.request(url, settings, function(options){
                        console.debug(arguments);

                        var token = PubSub.subscribe(RESPONSE_IS_READY+":"+options.id , function(msg, data){
                            console.debug(msg, data);
                            responsePromise.resolve(data.result, data.status, emulateJqXhr(data));
                        });

                        function unsubscribeMe(){
                            PubSub.unsubscribe(token);
                        }

                        responsePromise.then(unsubscribeMe,unsubscribeMe);
                    });
                });





                return responsePromise;
            };

        }

    }
});
