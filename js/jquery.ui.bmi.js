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

            //set content
            var content = this._getInnerHTMLAsString();
            this.$element.addClass("jquery-ui-bmi").append(content);

            //init sliders
            this.$element.find("#jquery-ui-bmi-height").slider({
                orientation: "vertical",
                range: "min",
                min: 140,
                max: 210,
                value: 175,
                slide: $.proxy(function(event, ui) {
                    this.$element.find("#jquery-ui-bmi-height-value").text(ui.value);
                    this._updateResults();
                }, this)
            });
            this.$element.find("#jquery-ui-bmi-weight").slider({
                orientation: "vertical",
                range: "min",
                min: 40,
                max: 180,
                value: 70,
                slide: $.proxy(function(event, ui) {
                    this.$element.find("#jquery-ui-bmi-weight-value").text(ui.value);
                    this._updateResults();
                }, this)
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
            //update diagnosis row
            this.$element.find("#jquery-ui-bmi-results-diagnosis tr").removeClass("active");
            if (bmi < 18.5) {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(0).addClass("active");
            } else if (bmi < 25) {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(1).addClass("active");
            } else if (bmi < 30) {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(2).addClass("active");
            } else if (bmi < 35) {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(3).addClass("active");
            } else if (bmi < 40) {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(4).addClass("active");
            } else {
                this.$element.find("#jquery-ui-bmi-results-diagnosis tr").eq(5).addClass("active");
            }
        },
        _getInnerHTMLAsString: function() {
            var content = "";
            content += "            <div class=\"jquery-ui-bmi-header ui-state-default\">Визначте індекс маси свого тіла<\/div>";
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
            content += "            <table class=\"jquery-ui-bmi-results\"> ";
            content += "                <thead>";
            content += "                    <tr>";
            content += "                        <th>ІМТ<\/th>";
            content += "                        <th id=\"jquery-ui-bmi-result\">25.97<\/th>";
            content += "                    <\/tr>";
            content += "                <\/thead>";
            content += "                <tbody id=\"jquery-ui-bmi-results-diagnosis\">                    ";
            content += "                    <tr>";
            content += "                        <td>нижче норми<\/td>";
            content += "                        <td>менше 18.5<\/td>";
            content += "                    <\/tr>";
            content += "                    <tr>";
            content += "                        <td>норма<\/td>";
            content += "                        <td>від 18.5 до 25<\/td>";
            content += "                    <\/tr>";
            content += "                    <tr>";
            content += "                        <td>зайва вага<\/td>";
            content += "                        <td>від 25 до 30<\/td>";
            content += "                    <\/tr>";
            content += "                    <tr>";
            content += "                        <td>ожиріння 1 стадії<\/td>";
            content += "                        <td>від 30 до 35<\/td>";
            content += "                    <\/tr>";
            content += "                    <tr>";
            content += "                        <td>ожиріння 2 стадії<\/td>";
            content += "                        <td>від 35 до 40<\/td>";
            content += "                    <\/tr>";
            content += "                    <tr>";
            content += "                        <td>ожиріння 3 стадії<\/td>";
            content += "                        <td>понад 40<\/td>";
            content += "                    <\/tr>";
            content += "                <\/tbody>";
            content += "            <\/table>";
            content += "            <\/div>  ";

            return content;
        }
    });

    function updateResults() {
        var height = $("#jquery-ui-bmi-height").slider("value");
        var weight = $("#jquery-ui-bmi-weight").slider("value");
        var bmi = weight / Math.pow((height / 100), 2);

        //update text value
        $("#jquery-ui-bmi-result").text(bmi.toFixed(2));

        //update diagnosis row
        $("#jquery-ui-bmi-results-diagnosis tr").removeClass("active");
        if (bmi < 18.5) {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(0).addClass("active");
        } else if (bmi < 25) {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(1).addClass("active");
        } else if (bmi < 30) {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(2).addClass("active");
        } else if (bmi < 35) {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(3).addClass("active");
        } else if (bmi < 40) {
            $("#jquery-ui-bmi-results-diagnosis tr").eq(4).addClass("active");
        } else {
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