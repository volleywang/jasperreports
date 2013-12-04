/**
 * Base jive functionality
 * @author: nesterone
 */
define(function (require) {

    "use strict";

//    require("css!jive.vm");

    var $ = require("jquery-1.10.2"),
        _ = require("underscore"),
        jive = require("jive"),
//        jiveColumn = require("jr/report/jive/jiveInteractiveColumn"),
        jiveColumn = require("jive.interactive.column"),
        ComponentRegistrar = require("jasperreports-component-registrar"),
        oldContext = require("jr/report/oldContext");




    var componentRegister = new ComponentRegistrar(oldContext.loader);

    return function($report, componentsCollection){

        jiveColumn.init(oldContext.report);

        console.log(componentsCollection);

//        componentsCollection.on("reset", function(newComponents){
//
//
//
//        });
//
//            var componentsArr = newComponents.map(function(model){ return [model.id, model.toJSON()]});
//
//            var componentsObj = _.object(componentsArr);
//
//            console.log("Got new components... ", componentsObj);
//
//            //populate report mock instance with jive components
//            componentRegister
//                .registerComponents(componentsObj, oldContext.report)
//                .then(function(){
//                    //prepare jive environment (templates for dialogs, default listeners, etc)
//                    //TODO: load  javascript templates, decouple components per modules, use css plugin
//                    jiveColumn.init(oldContext.report);
//                });
//
//
//        });

    };
});
