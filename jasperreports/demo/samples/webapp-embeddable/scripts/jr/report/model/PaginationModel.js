/**
 * Pagination model
 * @autor: nesterone
 */

define(function (require) {

    var Backbone = require("backbone");

    return Backbone.Model.extend({

        defaults: {
            total:0,
            offset:0
        },

        hasNext: function(){
            return this.get("total") - this.get("offset") - 1 > 0;
        },

        hasPrevious: function(){
            return this.get("offset") > 0
        },

        next: function(){
            if (this.hasNext()){
                this.set("offset", this.get("offset") + 1);
            }
            return this;
        },

        prev: function(){
            if (this.hasPrevious()){
                this.set("offset", this.get("offset") - 1);
            }
            return this;
        },

        first: function(){
            if (this.hasPrevious()){
                this.set("offset", 0);
            }
            return this;
        },

        last: function(){
            if(this.hasNext()){
                this.set("offset", this.get("total") - 1);
            }
            return this;
        }

    });

});


