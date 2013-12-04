/**
 * Factory function for manipulation with require configs,
 * discovery of services, working with different envs
 * @author: nesterone
 */

//TODO: add amd support

(function(root, requirejs){

    "use strict";

    /**
     * Base url to discovery services and configs
     * @param url
     */

    function jasper(url, callback){

        //TODO: load config from servlet
        var requireJsUrl = url + "/scripts/requireConfig.js";

        requirejs([requireJsUrl], function(requireConfig){

            requireConfig.baseUrl = url;

            var jasperRequire = requirejs.config(requireConfig);

            jasperRequire(["jr/appContext"], function(appContext){
                appContext.serverUrl = url;
                callback.apply(this, [jasperRequire]);
            });


        });
    }

    //export to globals
    root.jasper = jasper;

})(
  window,
  requirejs
);
