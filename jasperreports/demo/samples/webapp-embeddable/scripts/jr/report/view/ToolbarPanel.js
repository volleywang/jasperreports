/**
 * Default pagination panel
 * @autor: nesterone
 */

define(function (require) {

    "use strict";

    var template = require("text!jr/report/template/toolbarTemplate.htm"),
        _ = require("underscore"),
        $ = require("jquery-1.10.2"),
        appContext = require("jr/appContext"),
        serverUrl = appContext.serverUrl,
        Backbone = require("backbone"),
        imageServerUrl = serverUrl + "/" + appContext.REPORT_IMAGES,

        enableClass = "enabledViewerButton",
        disableClass = "disabledViewerButton",
        enable = function(el){
            var $el = $(el);
            if ($el.hasClass(disableClass)){
                $el.removeClass(disableClass);
            }
            el.addClass(enableClass);
        },
        disable = function(el){
            var $el = $(el);
            if ($el.hasClass(enableClass)){
                $el.removeClass(enableClass);
            }
            el.addClass(disableClass);
        };



    return Backbone.View.extend({

        initialize: function() {
            this.model.on("change", this.render, this);
        },

        events: {
            "click .pageNext" : "nextPage",
            "click .pagePrevious" : "previousPage",
            "click .pageLast" : "lastPage",
            "click .pageFirst" : "firstPage"
        },

        nextPage: function(){
           this.model.next();
        },

        previousPage: function(){
           this.model.prev();
        },

        lastPage: function(){
            this.model.last();
        },

        firstPage: function(){
            this.model.first();
        },

        el: function() {
            return _.template(template, { context: imageServerUrl});
        },

        render: function(){

            var it = this,
                buttons = {
                    next :  this.$el.find(".pageNext"),
                    last :  this.$el.find(".pageLast"),
                    prev :  this.$el.find(".pagePrevious"),
                    first :  this.$el.find(".pageFirst")
                };


            _.each(buttons, function(el, key){

                if (key == "next" || key == "last"){
                    if (it.model.hasNext()){
                        enable(el);
                    }else{
                        disable(el);
                    }
                }

                if (key == "prev" || key == "first"){
                    if (it.model.hasPrevious()){
                        enable(el);
                    }else{
                        disable(el);
                    }
                }

            });

            return this;
        }


    });

});


