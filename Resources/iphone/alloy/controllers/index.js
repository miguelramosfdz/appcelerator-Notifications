function Controller() {
    function addNotification() {
        var testDateNow = new Date();
        testDateNow.setMinutes(0);
        var notificationData = {
            id: testDateNow.getTime(),
            doseTime: testDateNow
        };
        scheduledNotificationsList.push(notificationData);
        Ti.App.Properties.setList("scheduledNotifications", scheduledNotificationsList);
        Ti.App.iOS.scheduleLocalNotification({
            alertBody: "BACKGROUND NOTIFICATION FIReD",
            alertAction: "Re-Launch!",
            userInfo: notificationData,
            repeat: "daily",
            sound: "pop.caf",
            date: testDateNow
        });
        addNewNotificationRow(notificationData, true);
        var currentScheduledNotificationsList = Ti.App.Properties.getList("scheduledNotifications") || [];
        console.log("store scheudled notificaitons list is now " + currentScheduledNotificationsList.length + " long");
    }
    function addNewNotificationRow(notificationData, modifyMode) {
        var newNotificationRow = Alloy.createController("notificationTableViewRow");
        newNotificationRow.initialize(notificationData, modifyMode);
        if (modifyMode) {
            newNotificationRow.notificationTimePicker.addEventListener("change", function(e) {
                console.log("~~~ change in child view ~~~");
                reviseNotification(notificationData, e.selectedValue);
                newNotificationRow.timeLabel.text = e.selectedValue[0] + " " + e.selectedValue[1];
            });
            newNotificationRow.deleteLabel.addEventListener("click", function(e) {
                console.log("~~~ delete label clicked ~~~");
                removeNotification(notificationData);
                $.notificationTableView.deleteRow(e.row);
            });
        }
        newNotificationRow.timeLabel.addEventListener("click", function() {
            console.log("~~~ toggle modify mode ~~~");
            modifyMode = !modifyMode;
            if (modifyMode) {
                newNotificationRow.notificationTimePicker.addEventListener("change", function(e) {
                    console.log("~~~ change in child view ~~~");
                    reviseNotification(notificationData, e.selectedValue);
                    newNotificationRow.timeLabel.text = e.selectedValue[0] + " " + e.selectedValue[1];
                });
                newNotificationRow.deleteLabel.addEventListener("click", function(e) {
                    console.log("~~~ delete label clicked ~~~");
                    removeNotification(notificationData);
                    $.notificationTableView.deleteRow(e.row);
                });
            }
        });
        newNotificationRow.notificationTableViewRow.notificationData = notificationData;
        $.notificationTableView.appendRow(newNotificationRow.getView());
    }
    function removeNotification(notificationData) {
        Ti.App.iOS.cancelLocalNotification(notificationData.id);
        console.log("deleting said notification from iOS with id " + notificationData.id);
        _.each(scheduledNotificationsList, function(element, index) {
            if (notificationData.id === element.id) {
                scheduledNotificationsList.splice(index);
                console.log("deleting said notification from NSUserDefaults with id " + notificationData.id);
                var currentScheduledNotificationsList = Ti.App.Properties.getList("scheduledNotifications") || [];
                console.log("store scheudled notificaitons list is now " + currentScheduledNotificationsList.length + " long");
                Ti.App.Properties.setList("scheduledNotifications", scheduledNotificationsList);
                var finalScheduledNotificationsList = Ti.App.Properties.getList("scheduledNotifications") || [];
                console.log("after deletion scheudled notificaitons list is now " + finalScheduledNotificationsList.length + " long");
            }
        });
    }
    function reviseNotification(notificationData, selectedValueArray) {
        var newNotificationData = {};
        _.extend(newNotificationData, notificationData);
        newNotificationData.doseHours = selectedValueArray[0].replace(":00", "");
        newNotificationData.doseMinutes = selectedValueArray[0].substr(selectedValueArray[0].length - 2);
        newNotificationData.doseMeridiem = selectedValueArray[1];
        var newDoseTimeHours = newNotificationData.doseHours;
        "PM" === newNotificationData.doseMeridiem ? 12 > newNotificationData.doseMeridiem && (newDoseTimeHours = newNotificationData.doseHours + 12) : "12" === newNotificationData.doseHours && (newDoseTimeHours = 0);
        var newDoseTime = notificationData.doseTime;
        newDoseTime.setHours(newDoseTimeHours);
        newDoseTime.setMinutes(parseInt(newNotificationData.doseMinutes));
        newNotificationData.doseTime = newDoseTime;
        removeNotification(notificationData);
        scheduledNotificationsList.push(newNotificationData);
        Ti.App.Properties.setList("scheduledNotifications", scheduledNotificationsList);
        Ti.App.iOS.scheduleLocalNotification({
            alertBody: "BACKGROUND NOTIFICATION FIReD",
            alertAction: "Re-Launch!",
            userInfo: newNotificationData,
            repeat: "daily",
            sound: "pop.caf",
            date: newNotificationData.doseTime
        });
        console.log(notificationData);
        console.log(selectedValueArray);
    }
    function userRequestsNewNotification() {
        addNotification();
    }
    function windowPostlayout() {
        _.each(scheduledNotificationsList, function(element) {
            addNewNotificationRow(element, false);
        });
        var footerContainer = Ti.UI.createView({
            backgroundColor: "transparent",
            left: "10px",
            right: "10px",
            height: "100px",
            layout: "vertical"
        });
        var addNewNotificationFooterLabel = Ti.UI.createLabel({
            text: " + Add Scheduled Dose",
            top: "10px",
            left: 0,
            right: 0,
            height: "80px",
            color: "#8b8e8a",
            backgroundColor: "#ffffff"
        });
        addNewNotificationFooterLabel.addEventListener("click", userRequestsNewNotification);
        footerContainer.add(addNewNotificationFooterLabel);
        $.notificationTableView.footerView = footerContainer;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "efefee",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    windowPostlayout ? $.__views.index.addEventListener("postlayout", windowPostlayout) : __defers["$.__views.index!postlayout!windowPostlayout"] = true;
    $.__views.notificationTableView = Ti.UI.createTableView({
        id: "notificationTableView",
        left: "10px",
        right: "10px",
        top: "50px",
        width: Ti.UI.FILL,
        separatorColor: "transparent",
        separatorStyle: "NONE",
        backgroundColor: "efefee",
        layout: "vertical"
    });
    $.__views.index.add($.__views.notificationTableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.scheduledNotificationsList = Ti.App.Properties.getList("scheduledNotifications", []);
    var scheduledNotificationsList = Alloy.Globals.scheduledNotificationsList;
    $.index.open();
    __defers["$.__views.index!postlayout!windowPostlayout"] && $.__views.index.addEventListener("postlayout", windowPostlayout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;