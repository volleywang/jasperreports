/**
 * RequireJs text plugin wrapper
 * @author: nesterone
 */
define(function (require, exports, module) {

    var textPlugin = require("scripts/require/text"),
        _ = require("underscore"),
        request = require("jr/util/request");


    var textPluginXhrFactory = textPlugin.createXhr;


    return _.extend(textPlugin, {

          useXhr: function(){
              return true;
          },

          createXhr: function(){

              //clone xhr because it's readonly by default
              var xhr = _.clone(textPluginXhrFactory.apply(textPlugin, arguments));

              console.log("["+module.id+"] create Xhr:",  xhr);

              var requestParams = {};

              return _.extend(xhr, {


                  open : function(method, url, async){

                      requestParams.url = url;
                      xhr.status = 1;
                      console.log("["+module.id+"] open Xhr:",  arguments);

                  },

                  send: function(){

                      request(requestParams.url).then(function(resp, status, jqXhr){
                          console.log("["+module.id+"] response Xhr:",  arguments);
                          xhr.readyState = jqXhr.readyState;
                          xhr.status = jqXhr.status;
                          xhr.responseText = jqXhr.responseText;
                          xhr.onreadystatechange();
                      }, function(error){
                          console.error("["+module.id+"] response Xhr:",  arguments);
                          xhr.onerror(error);
                      });

                      console.log("["+module.id+"] send Request:",  arguments);
                  }




              });
          }


    });
});
