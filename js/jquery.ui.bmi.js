(function($) {
    $.widget("ukr.bmi", {
        //default options
        options: {
            intervals: [
                {min: 0, max: 18.5, text: "нижче норми"},
                {min: 18.5, max: 25, text: "норма"},
                {min: 25, max: 30, text: "зайва вага"},
                {min: 30, max: 35, text: "ожиріння 1 ступеня"},
                {min: 35, max: 40, text: "ожиріння 2 ступеня"},
                {min: 40, max: Math.Infinity, text: "ожиріння 3 ступеня"}
            ],
            minHeight: 150,
            maxHeight: 195,
            height: 183,
            minWeight: 45,
            maxWeight: 170,
            weight: 87
        },
        //plugin constructor
        _create: function() {
            var self = this,
                    o = self.options,
                    el = self.element;

            //add cached JQuery objects containing all main elements
            this.$element = $(this.element);

            //set content
            var content = this._getInnerHTMLAsString();
            this.$element.addClass("jquery-ui-bmi").append(content);

            //init sliders
            var onHeightChange = $.proxy(function(event, ui) {
                this.$element.find("#jquery-ui-bmi-height-value").text(ui.value);
                this._updateResults();
            }, this);
            this.$element.find("#jquery-ui-bmi-height").slider({
                orientation: "vertical",
                range: "min",
                min: this.options.minHeight,
                max: this.options.maxHeight,
                value: this.options.height,
                slide: onHeightChange,
                change: onHeightChange
            });
            var onWeightChange = $.proxy(function(event, ui) {
                this.$element.find("#jquery-ui-bmi-weight-value").text(ui.value);
                this._updateResults();
            }, this);
            this.$element.find("#jquery-ui-bmi-weight").slider({
                orientation: "vertical",
                range: "min",
                min: this.options.minWeight,
                max: this.options.maxWeight,
                value: this.options.weight,
                slide: onWeightChange,
                change: onWeightChange
            });

            //init progress bar
            $("#jquery-ui-bmi-results-progress").progressbar({
                max: this.options.maxWeight / Math.pow((this.options.minHeight / 100), 2)
            });

            this.$element.find("#jquery-ui-bmi-height-value").text(this.$element.find("#jquery-ui-bmi-height").slider("value"));
            this.$element.find("#jquery-ui-bmi-weight-value").text(this.$element.find("#jquery-ui-bmi-weight").slider("value"));
            this._updateResults();
        },
        //plugin destructor
        destroy: function() {
            this.$element.find("#jquery-ui-bmi-height").slider("destroy");
            this.$element.find("#jquery-ui-bmi-weight").slider("destroy");
            this.$element.find(".jquery-ui-bmi-header").remove();
            this.$element.find(".jquery-ui-bmi-content").remove();
            this.$element.removeClass("jquery-ui-bmi");

            return this.$element;
        },
        _updateResults: function() {
            var height = this.$element.find("#jquery-ui-bmi-height").slider("value");
            var weight = this.$element.find("#jquery-ui-bmi-weight").slider("value");
            var bmi = weight / Math.pow((height / 100), 2);

            //update text value
            this.$element.find("#jquery-ui-bmi-result").text(bmi.toFixed(2));

            //find interval
            var mathedIntervals = $.grep(this.options.intervals, function(interval) {
                return interval.min <= bmi && bmi < interval.max;
            });
            if (mathedIntervals.length > 0) {
                var mathedInterval = mathedIntervals[0];

                //update diagnosis test
                this.$element.find("#jquery-ui-bmi-results-diagnosis")
                        .text("ІМТ від " + mathedInterval.min + " до " 
                        + mathedInterval.max + " - " + mathedInterval.text);

                //update progress bar
                $("#jquery-ui-bmi-results-progress").progressbar("value", bmi);
            }
        },
        _getInnerHTMLAsString: function() {
            var content = "";
            content += "            <div class=\"jquery-ui-bmi-header\">Визначте індекс маси свого тіла<\/div>";
            content += "            <div class=\"jquery-ui-bmi-content\">";
            content += "                <div class=\"jquery-ui-bmi-row\">";
            content += "                <div class=\"jquery-ui-bmi-cell\">";
            content += "                    <div>Зріст <span id=\"jquery-ui-bmi-height-value\" class=\"jquery-ui-bmi-value\"><\/span> см<\/div>";
            content += "                    <div id=\"jquery-ui-bmi-height\" class=\"jquery-ui-bmi-slider\"><\/div>";
            content += "                <\/div>";
            content += "                <div class=\"jquery-ui-bmi-cell\">";
            content += "                    <div>Вага <span id=\"jquery-ui-bmi-weight-value\" class=\"jquery-ui-bmi-value\"><\/span> кг<\/div>";
            content += "                    <div id=\"jquery-ui-bmi-weight\" class=\"jquery-ui-bmi-slider\"><\/div>";
            content += "                <\/div>";
            content += "            <\/div>  ";
            content += "            <div class=\"jquery-ui-bmi-results\"> ";
            content += "                <div>";
            content += "                    <div class=\"jquery-ui-bmi-results-bmi-row\">";
            content += "                        <span>ІМТ<\/span>";
            content += "                        <span id=\"jquery-ui-bmi-result\">25.97<\/span>";
            content += "                    <\/div>";
            content += "                <\/div>";
            content += "                <div>                    ";
            content += "                    <div>";
            content += "                        <div id=\"jquery-ui-bmi-results-progress\" class=\"jquery-ui-bmi-results-progress\"><\/div>";
            content += "                        <div id=\"jquery-ui-bmi-results-diagnosis\" class=\"jquery-ui-bmi-results-diagnosis\"><\/div>";
            content += "                    <\/div>";
            content += "                <\/tbody>";
            content += "            <\/div>";
            content += "            <\/div>  ";

            return content;
        }
    });
})(jQuery);