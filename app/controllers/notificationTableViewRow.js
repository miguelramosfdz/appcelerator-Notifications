var args = arguments[0] || {};

var parent;
$.parent = parent;

var notificationData;
$.notificationData = notificationData;

// initialize function that takes row data as input
function initialize(doseInformation /*Date doseTime*/, modifyMode /*bool*/) {
	
	$.notificationData = doseInformation;
	$.modifyMode = modifyMode;
	
	// build current time label for 
	var doseHours = doseInformation.doseTime.getHours();
	var doseMinutes = doseInformation.doseTime.getMinutes();
	var doseMeridiem = "";
	
	$.notificationData.doseHours = doseHours;
	$.notificationData.doseMinutes = doseMinutes;
	$.notificationData.doseMeridiem = doseMeridiem;
	
	if (doseHours > 11) {
		doseMeridiem = "PM";
		if (doseHours > 12) {
			doseHours = doseHours - 12;
		}
	} else {
		doseMeridiem = "AM";
		if (doseHours === 0) {
			doseHours = 12;
		}
	}
		
	$.timeLabel.text = doseHours + ":" + doseMinutes + " " + doseMeridiem;
	$.timeLabel.font = {"fontSize": "20dp"};
	
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
		
		// build our picker
		var hourColumn = Ti.UI.createPickerColumn();
		
		for (var i=1; i < 13; i++) {
			var row = Ti.UI.createPickerRow();
			row.title = i + ":00";
	
			hourColumn.addRow(row);
		}
		
		hourColumn.applyProperties({right: "0px", backgroundColor: "green"});
		
		var meridienColumn = Ti.UI.createPickerColumn();
		var amRow = Ti.UI.createPickerRow();
		var pmRow = Ti.UI.createPickerRow();
		amRow.title = "AM";	
		pmRow.title = "PM";
		
		meridienColumn.right = "0px";
		
		meridienColumn.addRow(amRow);
		meridienColumn.addRow(pmRow);
		
		$.notificationTimePicker.columns = [hourColumn, meridienColumn];
	}

}

$.initialize = initialize;

function toggleModify(e) {
	
	$.modifyMode = !$.modifyMode;
	
	// we can accomplish all this stuff with classes on tss 
	// instead of manually modifying these heights
	if ($.modifyMode) {
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
		
		// build our picker
		var hourColumn = Ti.UI.createPickerColumn();
		
		for (var i=1; i < 13; i++) {
			var row = Ti.UI.createPickerRow();
			row.title = i + ":00";
	
			hourColumn.addRow(row);
		}
		
		hourColumn.applyProperties({right: "0px", backgroundColor: "green"});
		
		var meridienColumn = Ti.UI.createPickerColumn();
		var amRow = Ti.UI.createPickerRow();
		var pmRow = Ti.UI.createPickerRow();
		amRow.title = "AM";	
		pmRow.title = "PM";
		
		meridienColumn.right = "0px";
		
		meridienColumn.addRow(amRow);
		meridienColumn.addRow(pmRow);
		
		notificationTimePicker.columns = [hourColumn, meridienColumn];
		
		$.rowContainer.add(notificationTimePicker);
		$.notificationTimePicker = notificationTimePicker;
		
		$.notificationTableViewRow.height = "550px";
		$.rowContainer.height = "540px";
		
		
		var deleteLabel = Ti.UI.createLabel();
		deleteLabel.applyProperties({
			id: "deleteLabel",
			left: "5%",
			top: -20,
			zIndex :  1,
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
