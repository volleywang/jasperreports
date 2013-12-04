/**
 * Default report view
 * @autor: nesterone
 */

define(function (require) {

    "use strict";

    var _ = require("underscore"),
        Backbone = require("backbone"),
        reportEvents = require("jr/report/enum/reportEvents"),
        $ = require("jquery-1.10.2"),
        purl = require("purl"),
        appContext = require("jr/appContext"),
        serverUrl = appContext.serverUrl;

    return Backbone.View.extend({

        initialize: function() {
            this.model.on("change:markup", this.render, this);
        },

        el: function() {
            var markup = this.model.get("markup");
            if (!markup){
                return "<div></div>"
            }
            return markup ;
        },

        render: function(){

            var $markup = $(this.model.get("markup"));

            //TODO: remove workaround
            $markup.find(".jrWebFont").each(function(index, link){

                var $link = $(link);

                var href = $link.attr("href");

                var  relative =  purl(href).attr("relative");

                var protocol =  purl(serverUrl).attr("protocol"),
                    host =  purl(serverUrl).attr("host"),
                    port = purl(serverUrl).attr("port");

                var fontsUrl =  relative;

                if (host){
                    fontsUrl =   protocol + "://" + host + ":" + port + "/" + relative;
                }

                //TODO: remove workaround
                $link.attr("href", fontsUrl);

            });


            this.$el
                .empty()
                .append($markup);

            this.trigger(reportEvents.MARKUP_UPDATED, this.$el);

            return this;
        }

    });

});


