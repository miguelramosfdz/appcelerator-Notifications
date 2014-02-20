function Controller() {
    function initialize(doseInformation) {
        $.notificationData = doseInformation;
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
    }
    function removeNotification() {}
    function userSetNotification(e) {
        $.timeLabel.text = e.selectedValue[0] + " " + e.selectedValue[1];
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
        height: "550px",
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
    $.__views.notificationTimePicker = Ti.UI.createPicker({
        id: "notificationTimePicker",
        backgroundColor: "green",
        selectionIndicator: "false",
        useSpinner: "true",
        minuteInterval: "30",
        layout: "composite",
        top: "-20"
    });
    $.__views.rowContainer.add($.__views.notificationTimePicker);
    userSetNotification ? $.__views.notificationTimePicker.addEventListener("change", userSetNotification) : __defers["$.__views.notificationTimePicker!change!userSetNotification"] = true;
    $.__views.deleteLabel = Ti.UI.createLabel({
        text: "Delete Dose",
        id: "deleteLabel",
        left: "5%",
        top: "-20",
        zIndex: "1",
        width: Ti.UI.FILL,
        bottom: "0",
        height: "100px",
        backgroundColor: "ffffff",
        verticalAlign: "TEXT_VERTICAL_ALIGNMENT_CENTER"
    });
    $.__views.rowContainer.add($.__views.deleteLabel);
    removeNotification ? $.__views.deleteLabel.addEventListener("click", removeNotification) : __defers["$.__views.deleteLabel!click!removeNotification"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var parent;
    $.parent = parent;
    var notificationData;
    $.notificationData = notificationData;
    $.initialize = initialize;
    __defers["$.__views.notificationTimePicker!change!userSetNotification"] && $.__views.notificationTimePicker.addEventListener("change", userSetNotification);
    __defers["$.__views.deleteLabel!click!removeNotification"] && $.__views.deleteLabel.addEventListener("click", removeNotification);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;