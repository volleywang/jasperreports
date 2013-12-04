/**
 * Jive Column component
 * @autor: nesterone
 */

define(function (require) {

    var Backbone = require("backbone"),
        $ = require("jquery-1.10.2"),
        reportEvents = require("jr/report/enum/reportEvents");

    return Backbone.Model.extend({

        api : {
            sort: {},
            move: {},
            format: {},
            filter: {},
            hide: {},
            unhide: {},
            resize: {}
        },

        defaults: {
            canFilter: false,
            canFormatConditionally: false,
            canSort: false,
            clearData: {},
            columnIndex: 0,
            columnLabel: "",
            conditionalFormattingData: {},
            dataType: null,
            filterData: {},
            filtering: {},
            headerToolbar: {},
            headingsTabContent: {},
            id: null,
            parentId: null,
            proxySelector: null,
            selector: null,
            type: "column",
            valuesTabContent: {}
        },

        initialize: function(config){

            this.config = config;
            this.parent = null;
            this.loader = null;

            this.events = {
                ACTION_PERFORMED: "action",
                BEFORE_ACTION_PERFORMED: "beforeAction"
            };
        },

        sort: function(parms) {
            var it = this,
                payload = {
                    action: this.config.headerToolbar['sort' + parms.order + 'Btn'].sortData
                };
            payload.action.sortData.tableUuid = it.config.parentId;
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        move: function(parms) {
            var it = this,
                payload = {
                    action: {
                        actionName: 'move',
                        moveColumnData: {
                            tableUuid: it.config.parentId,
                            columnToMoveIndex: it.config.columnIndex,
                            columnToMoveNewIndex: parms.index
                        }
                    }
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        format: function(parms) {
            var it = this,
                payload = {
                    action: parms
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        filter: function(parms) {
            var it = this,
                filterParms = $.extend({}, it.config.filtering.filterData, parms),
                payload = {
                    action: {
                        actionName: 'filter',
                        filterData: filterParms
                    }
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        hide: function() {
            var it = this,
                payload = {
                    action: {
                        actionName: 'hideUnhideColumns',
                        columnData: {
                            tableUuid: it.config.parentId,
                            hide: true,
                            columnIndexes: [this.config.columnIndex]
                        }
                    }
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        unhide: function(columnIds) {
            var it = this,
                payload = {
                    action: {
                        actionName: 'hideUnhideColumns',
                        columnData: {
                            tableUuid: it.config.parentId,
                            hide: false,
                            columnIndexes: columnIds ? columnIds : [this.config.columnIndex]
                        }
                    }
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },
        resize: function(parms) {
            var it = this,
                payload = {
                    action: {
                        actionName: 'resize',
                        resizeColumnData: {
                            tableUuid: it.config.parentId,
                            columnIndex: this.config.columnIndex,
                            direction: "right",
                            width: parms.width
                        }
                    }
                };
            it._notify({name: it.events.BEFORE_ACTION_PERFORMED});
            it.trigger(reportEvents.ACTION, payload.action);
        },

        // internal functions
        _notify: function(evt) {
            // bubble the event
            this.parent._notify(evt);
        }

    });
});
