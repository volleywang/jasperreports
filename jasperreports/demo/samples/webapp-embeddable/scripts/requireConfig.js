/**
 * Just copy paste code from the server to start
 *
 */

define({


    //TODO: move to bootstrap run-time configuration
    baseUrl: "/jr-app",
    paths: {

        "jr": "scripts/jr",
        "crossDomain": "scripts/crossDomain",
        //TODO: remove version from alias
//        "jquery": "scripts/jquery/core/jquery-1.10.2.min",
        "backbone": "scripts/lib/backbone-1.1.0",
        "underscore": "scripts/lib/underscore-1.5.2",
        "cssPlugin": "scripts/lib/require-css-0.0.8",
        "css": "scripts/jr/plugin/css",
        "purl" : "scripts/lib/purl/purl",
        "PubSub": "scripts/lib/PubSubJS/src/pubsub",
        "easyXDM": "scripts/lib/easyXDM/easyXDM.debug",
        "json": "scripts/lib/json2/json2",

//        "text": "scripts/require/text",
        "text": "scripts/jr/plugin/text",

        "jquery.ui-1.10.3": "scripts/jquery/ui/jquery-ui-1.10.3.min",
        "jquery-1.10.2": "scripts/jquery/core/jquery-1.10.2.min",
        "async": "scripts/require/async",
        "jqueryui-1.10.3-timepicker": "scripts/jquery/ui/jquery-ui-timepicker-addon",
        "validator": "scripts/utils/validator",
        "jive.table": "servlets/resources?jr.resource=net/sf/jasperreports/components/headertoolbar/resources/require/jive.table.js",
        "jive": "servlets/resources?jr.resource=net/sf/jasperreports/components/headertoolbar/resources/require/jive.js",
        "jive.column": "servlets/resources?jr.resource=net/sf/jasperreports/components/headertoolbar/resources/require/jive.column.js",
        "jasperreports-component-registrar": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/report/jasperreports-component-registrar.js",
        //TODO: Workaround for image urls defined in css,
        //FIX IT on server-side; or move completely to client
        "jive.vm": "scripts/jr/report/jive/template/jive.vm",
        //Server appends host according to user's request but should use internal value
//        "jive.vm": "servlets/resources?jr.resource=jive.vm",
        "jasperreports-loader": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/util/jasperreports-loader.js",
        "jive.templates": "servlets/resources?jr.resource=jive.templates",
        "jasperreports-status-checker": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/report/jasperreports-status-checker.js",
        "jive.crosstab.interactive": "servlets/resources?jr.resource=net/sf/jasperreports/crosstabs/interactive/jive.crosstab.interactive.js",
        "jasperreports-viewer": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/viewer/jasperreports-viewer.js",
        "jasperreports-report-processor": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/report/jasperreports-report-processor.js",
        "jasperreports-utils": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/util/jasperreports-utils.js",
        "jive.sort": "servlets/resources?jr.resource=net/sf/jasperreports/components/sort/resources/jive.sort.js",
        "jive.crosstab.templates": "servlets/resources?jr.resource=net/sf/jasperreports/crosstabs/interactive/jive.crosstab.templates",
        "jive.i18n": "servlets/resources?jr.resource=jive.i18n.vm.js",
        "jive.crosstab": "servlets/resources?jr.resource=net/sf/jasperreports/crosstabs/interactive/jive.crosstab.js",
        "jive.interactive.column": "servlets/resources?jr.resource=net/sf/jasperreports/components/headertoolbar/resources/require/jive.interactive.column.js",
        "jasperreports-event-manager": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/util/jasperreports-event-manager.js",
        "jive.filterDialog": "servlets/resources?jr.resource=jive.filterDialog",
        "jive.sort.vm": "servlets/resources?jr.resource=jive.sort.vm",
        "jive.crosstab.templates.styles": "servlets/resources?jr.resource=jive.crosstab.templates.styles",
        "jasperreports-report": "servlets/resources?jr.resource=net/sf/jasperreports/web/servlets/resources/require/report/jasperreports-report.js",
        "jive.interactive.sort": "servlets/resources?jr.resource=net/sf/jasperreports/components/sort/resources/jive.interactive.sort.js"




    },

    shim: {

        "underscore": {
            exports: "_"
        },

        "backbone" : {
            deps :["underscore"],
            exports:'Backbone',
            init: function () {
                var backbone = this.Backbone.noConflict();
                return backbone;
            }
        },

        json : {
            exports: "JSON"
        },

        easyXDM : {
            deps : ["json"],
            exports: "easyXDM"
        }

    },

    waitSeconds: 60
});
