/**
 * Get report page model
 * @autor: nesterone
 */
define(function (require) {

    var Backbone = require("backbone"),
        _ = require("underscore"),
        ColumnComponentModel = require("jr/report/jive/model/ColumnComponentModel"),
        TableComponentModel = require("jr/report/jive/model/TableComponentModel"),
        jiveTypes = require("jr/report/jive/enum/jiveTypes"),
        oldContext = require("jr/report/oldContext");

    var loader = oldContext.loader;
    var report = oldContext.report;

    return Backbone.Collection.extend({

           _parts : [],

           _root: null,

            initialize: function(){

                this._parts = [];
                this.root = null;

            },

           registerPart: function(part){

               var it = this;

               if (!part.get("parentId")){
                   it._root = part;
                   _.each(this._parts, function(part){
                       it._root.registerPart(part);
                   })
               }else{
                   if (it._root){
                       it._root.registerPart(part);
                   }else{
                       it._parts.push(part);
                   }
               }

           },

           model : function(attrs, options){

               var type = attrs["type"],
                   result;

               if (type == jiveTypes.TABLE){
                   result = new TableComponentModel(attrs, options);
                   //jive needs it
                   result.loader = loader;
                   result.parent = report;

                   //put components to report to make jive works
                   report.components[type] = report.components[type] || [];
                   report.components[type].push(result);

               }else if(type == jiveTypes.COLUMN){
                   result = new ColumnComponentModel(attrs, options)
               }

               //group components by parent id
               options.collection.registerPart(result);

               return result;
           }


    });
});
