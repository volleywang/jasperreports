/**
 * Jive Table Model
 * @autor: nesterone
 */

define(function (require) {

    var Backbone = require("backbone"),
        $ = require("jquery-1.10.2"),
        _ = require("underscore");
//        ColumnComponentModel = require("jr/report/jive/model/ColumnComponentModel");

    var genericProperties = null;

    return Backbone.Model.extend({

        defaults: {
            calendarPatterns: {},
            filterPatterns: {},
            fontSizes: [],
            fonts: {},
            operators: {},
            patterns: {},
            id: null,
            genericProperties : {},
            module: "jive.table",
            type: "table",
            uimodule: "jive.interactive.column"
        },

        initialize: function(o){
            this.config = {
                id: null,

                /**
                 * {"1":{"index":"1","label":"Name","uuid":"ace5fd47-03c8-4d26-b2c0-354ca60560e0","visible":false,"interactive":true},..}
                 */
                allColumnsData: null
            };
            $.extend(this.config, o);

            if(o.genericProperties) {
                genericProperties = o.genericProperties;
            } else {
                this.config.genericProperties = genericProperties;
            }

            this.parent = null;
            this.columns = [];
            this.columnMap = {};
            this.loader = null;
        },

        registerPart: function(column) {

//            var column = new Column(partConfig);
            column.parent = this;
            column.loader = this.loader;
            this.columns[column.get("columnIndex")] = column;
            this.columnMap[column.get("id")] = column;
        },
        getId: function() {
            return this.config.id;
        },

        // internal functions
        /**
         *
         * @param evt {object} The event object: {type, name, data}
         */
        _notify: function(evt) {
            // bubble the event
            this.parent._notify(evt);
        }

    });

});


