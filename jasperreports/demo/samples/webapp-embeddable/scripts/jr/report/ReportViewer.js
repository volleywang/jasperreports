/**
 * Facade for report viewer application
 * @author: nesterone
 */


define(function (require) {

    "use strict";

    require("css!jasperreports-global");

    var $ = require("jquery-1.10.2"),
        _ = require("underscore"),
        reportEvents = require("jr/report/enum/reportEvents"),
        Backbone = require("backbone"),
        defaultTemplate = require("text!jr/report/template/defaultReportViewerTemplate.htm"),
        ReportModel = require("jr/report/model/ReportModel"),
        ReportView = require("jr/report/view/ReportView"),
        ToolbarPanel = require("jr/report/view/ToolbarPanel"),
        reportStatuses = require("jr/report/enum/reportStatuses"),
        baseJiveComponent = require("jr/report/jive/BaseJiveComponent");


    return Backbone.View.extend({

        template: defaultTemplate,

        isAddedToDom: false,

        initialize: function(options) {

            var it = this;

            this.model = new ReportModel({uri: options.uri, async: options.async});
            this.view = new ReportView({model: this.model});
            this.toolbar = new ToolbarPanel({model: this.model.get("pagination")});

            if(options && options.template){
                this.template = options.template;
            }

            this.view.on(reportEvents.MARKUP_UPDATED, function($report){
                if (it.isAddedToDom){
                    baseJiveComponent($report, it.model.get("components"));
                }else{
                    throw new Error("Can't initialize JIVE functionality because report not added to DOM yet");
                }
            });

            this.model.fetch();
        },

        el: function() {
            return this.template;
        },

        render : function(){

            var toolbarEl = this.toolbar.render().el;

            this.$el
                .find("[data-view-id='toolbar']")
                .append(toolbarEl);

            this.$el
                .find("[data-view-id='report']")
                .append(this.view.el);

            return this;
        },

        appendTo : function(container){

            if (container){
                $(container).append(this.$el);
                this.isAddedToDom = true;
            }

            return this;
        }


    });
});
