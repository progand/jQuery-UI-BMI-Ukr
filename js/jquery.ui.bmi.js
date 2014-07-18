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

    function updateResults() {
        var height = $("#jquery-ui-bmi-height").slider("value");
        var weight = $("#jquery-ui-bmi-weight").slider("value");
        var bmi = weight/Math.pow((height/100), 2);
        
        //update text value
        $("#jquery-ui-bmi-result").text(bmi.toFixed(2));
        
        //update diagnosis row
        $("#jquery-ui-bmi-results-diagnosis tr").removeClass("active");
        if(bmi<18.5){
            $("#jquery-ui-bmi-results-diagnosis tr").eq(0).addClass("active");
        } else if(bmi<25){
            $("#jquery-ui-bmi-results-diagnosis tr").eq(1).addClass("active");
        }else if(bmi<30){
            $("#jquery-ui-bmi-results-diagnosis tr").eq(2).addClass("active");
        }else if(bmi<35){
            $("#jquery-ui-bmi-results-diagnosis tr").eq(3).addClass("active");
        }else if(bmi<40){
            $("#jquery-ui-bmi-results-diagnosis tr").eq(4).addClass("active");
        }else {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(5).addClass("active");
        }
    }

    $("#jquery-ui-bmi-height").slider({
        orientation: "vertical",
        range: "min",
        min: 140,
        max: 210,
        value: 175,
        slide: function(event, ui) {
            $("#jquery-ui-bmi-height-value").text(ui.value);
            updateResults();
        }
    });
    $("#jquery-ui-bmi-weight").slider({
        orientation: "vertical",
        range: "min",
        min: 40,
        max: 180,
        value: 70,
        slide: function(event, ui) {
            $("#jquery-ui-bmi-weight-value").text(ui.value);
            updateResults();
        }
    });

    $("#jquery-ui-bmi-height-value").text($("#jquery-ui-bmi-height").slider("value"));
    $("#jquery-ui-bmi-weight-value").text($("#jquery-ui-bmi-weight").slider("value"));
    updateResults();

})(jQuery);