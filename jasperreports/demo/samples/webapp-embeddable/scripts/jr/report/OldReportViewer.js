/**
 * Facade for report viewer application
 * @author: nesterone
 */


define(function (require, exports, module) {

    "use strict";

    var JRUtils = require("scripts/jr-utils"),
        $ = require("jquery-1.10.2"),
        wrapperTemplate = require("text!jr/report/template/defaultReportViewerTemplate.htm"),
        Viewer = require("jr/report/JasperReportsViewer"),
        _ = require("underscore"),
        //TODO: move to service locator
        baseContext = "/jr-app";

    var defaultSettings  = {
        width: 300,
        height: 400,
        containerid: 'jivecontainer'
    };


    function ReportViewer(options){

        var uri = options.uri,
            //take default viewer
            viewerServlet = options.viewer || "viewer";


        this.width = options.width || defaultSettings.width;
        this.height = options.height || defaultSettings.height;
        this.viewer = new Viewer({
            at: "reportContainer",
            reporturi: uri,
            async: false,
            page: 0,
            applicationContextPath: baseContext
        });

    }


    ReportViewer.prototype.dataToRender = function(){

        return {
            context : baseContext

        }
    };


    ReportViewer.prototype.render = function(container){

        var it = this;

        $(document).ready(function(){
            $(container)
                .css({ width: this.width})
                .css({ height: this.height})
                .append(_.template(wrapperTemplate, it.dataToRender()));

            it.viewer.loadReport();

        });

        return this;
    };


    return ReportViewer;
});
