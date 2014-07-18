(function($) {
    $.widget("ukr.bmi", {
        //default options
        options: {
        },
        //plugin constructor
        _create: function() {
            var self = this,
                    o = self.options,
                    el = self.element;

            //add cached JQuery objects containing all main elements
            this.$element = $(this.element);
        },
        //plugin destructor
        destroy: function() {

            return this.$element;
        }
    });

    $(".jquery-ui-bmi-slider").slider({
        orientation: "vertical",
        range: "min",
        min: 140,
        max: 210,
        value: 175,
        slide: function(event, ui) {
            $("#amount").val(ui.value);
        }
    });
})(jQuery);