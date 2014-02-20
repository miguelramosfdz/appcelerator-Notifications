function Controller() {
    function initialize(doseInformation, modifyMode) {
        $.notificationData = doseInformation;
        $.modifyMode = modifyMode;
        var doseHours = doseInformation.doseTime.getHours();
        var doseMinutes = doseInformation.doseTime.getMinutes();
        var doseMeridiem = "";
        $.notificationData.doseHours = doseHours;
        $.notificationData.doseMinutes = doseMinutes;
        $.notificationData.doseMeridiem = doseMeridiem;
        if (doseHours > 11) {
            doseMeridiem = "PM";
            doseHours > 12 && (doseHours -= 12);
        } else {
            doseMeridiem = "AM";
            0 === doseHours && (doseHours = 12);
        }
        $.timeLabel.text = doseHours + ":" + doseMinutes + " " + doseMeridiem;
        $.timeLabel.font = {
            fontSize: "20dp"
        };
        if (modifyMode) {
            var notificationTimePicker = Ti.UI.createPicker();
            notificationTimePicker.applyProperties({
                id: "notificationTimePicker",
                backgroundColor: "green",
                selectionIndicator: false,
                useSpinner: true,
                minuteInterval: 30,
                layout: "composite",
                top: -20
            });
            $.notificationTimePicker = notificationTimePicker;
            var hourColumn = Ti.UI.createPickerColumn();
            for (var i = 1; 13 > i; i++) {
                var row = Ti.UI.createPickerRow();
                row.title = i + ":00";
                hourColumn.addRow(row);
            }
            hourColumn.applyProperties({
                right: "0px",
                backgroundColor: "green"
            });
            var meridienColumn = Ti.UI.createPickerColumn();
            var amRow = Ti.UI.createPickerRow();
            var pmRow = Ti.UI.createPickerRow();
            amRow.title = "AM";
            pmRow.title = "PM";
            meridienColumn.right = "0px";
            meridienColumn.addRow(amRow);
            meridienColumn.addRow(pmRow);
            $.notificationTimePicker.columns = [ hourColumn, meridienColumn ];
            $.rowContainer.add(notificationTimePicker);
            $.notificationTableViewRow.height = "550px";
            $.rowContainer.height = "540px";
            var deleteLabel = Ti.UI.createLabel();
            deleteLabel.applyProperties({
                id: "deleteLabel",
                left: "5%",
                top: -20,
                zIndex: 1,
                width: Ti.UI.FILL,
                bottom: 0,
                height: "100px",
                backgroundColor: "#ffffff",
                verticalAlign: "TEXT_VERTICAL_ALIGNMENT_CENTER",
                text: "Delete Dose"
            });
            $.rowContainer.add(deleteLabel);
            $.deleteLabel = deleteLabel;
            $.rowContainer.backgroundColor = "white";
        }
    }
    function toggleModify() {
        $.modifyMode = !$.modifyMode;
        if ($.modifyMode) {
            var notificationTimePicker = Ti.UI.createPicker();
            notificationTimePicker.applyProperties({
                id: "notificationTimePicker",
                backgroundColor: "green",
                selectionIndicator: false,
                useSpinner: true,
                layout: "composite",
                top: -20
            });
            var hourColumn = Ti.UI.createPickerColumn();
            for (var i = 1; 13 > i; i++) {
                var row = Ti.UI.createPickerRow();
                row.title = i + ":00";
                hourColumn.addRow(row);
            }
            hourColumn.applyProperties({
                right: "0px",
                backgroundColor: "green"
            });
            var meridienColumn = Ti.UI.createPickerColumn();
            var amRow = Ti.UI.createPickerRow();
            var pmRow = Ti.UI.createPickerRow();
            amRow.title = "AM";
            pmRow.title = "PM";
            meridienColumn.right = "0px";
            meridienColumn.addRow(amRow);
            meridienColumn.addRow(pmRow);
            notificationTimePicker.columns = [ hourColumn, meridienColumn ];
            $.rowContainer.add(notificationTimePicker);
            $.notificationTimePicker = notificationTimePicker;
            $.notificationTableViewRow.height = "550px";
            $.rowContainer.height = "540px";
            var deleteLabel = Ti.UI.createLabel();
            deleteLabel.applyProperties({
                id: "deleteLabel",
                left: "5%",
                top: -20,
                zIndex: 1,
                width: Ti.UI.FILL,
                bottom: 0,
                height: "100px",
                backgroundColor: "#ffffff",
                verticalAlign: "TEXT_VERTICAL_ALIGNMENT_CENTER",
                text: "Delete Dose"
            });
            $.rowContainer.add(deleteLabel);
            $.deleteLabel = deleteLabel;
            $.rowContainer.backgroundColor = "white";
        } else {
            $.rowContainer.remove($.notificationTimePicker);
            $.rowContainer.remove($.deleteLabel);
            $.notificationTableViewRow.height = "100px";
            $.rowContainer.height = "90px";
            $.rowContainer.backgroundColor = "white";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "notificationTableViewRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.notificationTableViewRow = Ti.UI.createTableViewRow({
        id: "notificationTableViewRow",
        height: "100px",
        backgroundColor: "transparent",
        selectedBackgroundColor: "transparent"
    });
    $.__views.notificationTableViewRow && $.addTopLevelView($.__views.notificationTableViewRow);
    $.__views.rowContainer = Ti.UI.createView({
        id: "rowContainer",
        top: "10px",
        backgroundColor: "#ffffff",
        layout: "vertical"
    });
    $.__views.notificationTableViewRow.add($.__views.rowContainer);
    $.__views.timeLabel = Ti.UI.createLabel({
        id: "timeLabel",
        left: "5%",
        top: "0",
        height: "100px",
        backgroundColor: "ffffff",
        width: Ti.UI.FILL,
        verticalAlign: "TEXT_VERTICAL_ALIGNMENT_CENTER",
        zIndex: "1"
    });
    $.__views.rowContainer.add($.__views.timeLabel);
    toggleModify ? $.__views.timeLabel.addEventListener("click", toggleModify) : __defers["$.__views.timeLabel!click!toggleModify"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var parent;
    $.parent = parent;
    var notificationData;
    $.notificationData = notificationData;
    $.initialize = initialize;
    __defers["$.__views.timeLabel!click!toggleModify"] && $.__views.timeLabel.addEventListener("click", toggleModify);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;