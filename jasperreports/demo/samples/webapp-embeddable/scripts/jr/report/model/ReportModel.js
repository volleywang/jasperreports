/**
 * Report page model
 * @author: nesterone
 */

define(function (require) {

    var Backbone = require("backbone"),
        request = require("jr/util/request"),
        _ = require("underscore"),
        $ = require("jquery-1.10.2"),
        ReportComponentsCollection = require("jr/report/jive/collection/ReportComponentsCollection"),
        PaginationModel = require("jr/report/model/PaginationModel"),
        reportStatuses = require("jr/report/enum/reportStatuses"),
        reportEvents = require("jr/report/enum/reportEvents"),
        appContext = require("jr/appContext"),
        baseUrl = appContext.serverUrl,
        reportContextUrl =  baseUrl + "/" + appContext.REPORT_CONTEXT,
        reportOutputUrl =  baseUrl + "/" + appContext.REPORT_OUTPUT,
        reportComponentsUrl =  baseUrl + "/" + appContext.REPORT_COMPONENTS,
        reportActionUrl = baseUrl + "/" + appContext.REPORT_ACTION;

    return Backbone.Model.extend({

        defaults : {
            contextId: null,
            reportStatus: reportStatuses.FINISHED,
            markup : "",
            async : false,
            uri : null,
            isComponentMetadataEmbedded: false,
            components: new ReportComponentsCollection(),
            pagination : new PaginationModel()
        },

        initialize: function(){

            var it = this,
                pagination = it.get("pagination"),
                components = it.get("components");

            pagination.on("change:offset",function(){
                it.fetch();
            });

            components.on("reset", function(components){
                components.each(function(componentModel){
                    componentModel.on(reportEvents.ACTION, function(action){
                        it.fetch({action: action});  // execute report action
                    });
                });
            });

        },

        fetch: function(options){
            if(!options){
                options = {};
            }
            options.parse = true;
            return Backbone.Model.prototype.fetch.call(this, options);
        },

        sync: function(method, model, options){

            console.log("Sync ", options);

            var it = this,
                contextIdDfd = $.Deferred();

            if (!it.get("contextId")) {
                contextIdDfd = it.fetchContextId(options);
            } else  {
                if (!options.action){
                    contextIdDfd.resolve(it.get("contextId"));
                }else{
                    contextIdDfd = it.runAction(options.action, options);
                }
            }

            contextIdDfd.then(function (contextId) {

                var page = it.get("pagination").get("offset");

                return $.when(
                    request(reportOutputUrl, {
                        type: "POST",
                        dataType: "html",
                        data: {
                            jr_ctxid: contextId,
                            jr_page: page
                        }
                    }),
                    request(reportComponentsUrl, {
                        type: "POST",
                        dataType: "json",
                        data: {
                            jr_ctxid: contextId,
                            jr_page: page
                        }
                    })
                )

            }, options.error)
                .then(function (reportOutputResponse, reportComponents) {

                    var jqXhr = reportOutputResponse[2],
                        status = jqXhr.getResponseHeader("jasperreports-report-status");

                    status = $.parseJSON(status);

                    return {
                        reportStatus: status.reportStatus,
                        isComponentMetadataEmbedded: status.isComponentMetadataEmbedded,
                        markup: reportOutputResponse[0],
                        components: reportComponents[0],
                        pagination: {
                            total: status.totalPages
                        }
                    }
                }, options.error)
                .then(options.success, options.error);

            model.trigger('request', model, contextIdDfd, options);

            return contextIdDfd;
        },

        fetchContextId: function(options){

            var it = this;

            return  request(reportContextUrl, {
                type: "POST",
                dataType: "json",
                data: {
                    jr_report_uri: it.get("uri"),
                    jr_async: it.get("async")
                }
            }).then(function(response){
                 it.set("contextId", response.contextid);
                 return response.contextid;
            }, options.error);

        },

        runAction: function(action, options){
            var it = this;

            return  request(reportActionUrl, {
                type: "POST",
                dataType: "json",
                data: {
                    jr_ctxid: it.get("contextId"),
                    jr_action: JSON.stringify(action)
                }
            }).then(function(response){
                    it.set("contextId", response.contextid);
                    return response.contextid;
                }, options && options.error);
        },

        parse : function(resp){
            var it = this,
                pagination = it.get("pagination");

            if (resp.pagination.total > 0 && pagination.get("total") === 0){
                pagination.set("total", resp.pagination.total);
            }

            it.get("components")
              .reset(_.values(resp.components));

            return _.extend(this.toJSON(), {
                markup: resp.markup,
                reportStatus: resp.reportStatus,
                isComponentMetadataEmbedded: resp.isComponentMetadataEmbedded
            });
        }


    });
});
