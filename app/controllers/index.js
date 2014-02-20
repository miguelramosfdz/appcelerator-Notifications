// delcare globals to app
Alloy.Globals.scheduledNotificationsList = Ti.App.Properties.getList('scheduledNotifications', []);
var scheduledNotificationsList = Alloy.Globals.scheduledNotificationsList;

// add notification
function addNotification() {
	// build new localNotification object and push
	var testDateNow = new Date();
	var notificationData = {
		"id": testDateNow.getTime(),
		"doseTime": testDateNow
	};
	scheduledNotificationsList.push(notificationData);
	Ti.App.Properties.setList('scheduledNotifications', scheduledNotificationsList);
	
	// push notificationData to NSUserDefaults scheduledNotifications list
	Ti.App.iOS.scheduleLocalNotification({
		alertBody:"BACKGROUND NOTIFICATION FIReD",
		alertAction:"Re-Launch!",
		userInfo:notificationData,
		sound:"pop.caf",
		date:testDateNow
	});
	
	addNewNotificationRow(notificationData, true);
	
	var currentScheduledNotificationsList = Ti.App.Properties.getList('scheduledNotifications') || [];
	console.log("store scheudled notificaitons list is now " + currentScheduledNotificationsList.length + " long");
}

function addNewNotificationRow(notificationData, modifyMode) {
	// add new notificationTableViewRow object to table
	var newNotificationRow = Alloy.createController('notificationTableViewRow');
	newNotificationRow.initialize(notificationData, modifyMode);
	newNotificationRow.timeLabel.addEventListener('click', function(e) {
		console.log('~~~ toggle modify mode ~~~');
		
		newNotificationRow.notificationTimePicker.addEventListener('change', function(e) {
			console.log('~~~ change in child view ~~~');
			reviseNotification(notificationData, e.selectedValue);
			newNotificationRow.timeLabel.text = e.selectedValue[0] + " " + e.selectedValue[1];
		});
		
		newNotificationRow.deleteLabel.addEventListener('click', function(e) {
			console.log('~~~ delete label clicked ~~~');
			removeNotification(e.row.notificationData);
			$.notificationTableView.deleteRow(e.row);
		});
	});
	
	newNotificationRow.notificationTableViewRow.notificationData = notificationData;

	$.notificationTableView.appendRow(newNotificationRow.getView());
}

// remove notification, called from child notificationTableViewRow view
// removes notification from nsUserDefaults and from OS
function removeNotification(notificationData) {
	// remove localNotification object by id
	Ti.App.iOS.cancelLocalNotification(notificationData.id);
	console.log("deleting said notification from iOS with id " + notificationData.id);
	
	// find notificationData object in NSUserDefaults and delete
	_.each(scheduledNotificationsList, function(element, index, list) {
		if (notificationData.id ===  element.id) {
						
			scheduledNotificationsList.splice(index);
			console.log("deleting said notification from NSUserDefaults with id " + notificationData.id);
			
			var currentScheduledNotificationsList = Ti.App.Properties.getList('scheduledNotifications') || [];
			console.log("store scheudled notificaitons list is now " + currentScheduledNotificationsList.length + " long");
			
			Ti.App.Properties.setList('scheduledNotifications', scheduledNotificationsList);
			var finalScheduledNotificationsList = Ti.App.Properties.getList('scheduledNotifications') || [];
			console.log("after deletion scheudled notificaitons list is now " + finalScheduledNotificationsList.length + " long");
		}
	});
}

function reviseNotification(notificationData, selectedValueArray) {
	var newNotificationData = {};
	_.extend(newNotificationData, notificationData);
	
	// create new notification time from selected values
	newNotificationData.doseHours = selectedValueArray[0].replace(":00", "");
	newNotificationData.doseMinutes = selectedValueArray[0].substr(selectedValueArray[0].length - 2);
	newNotificationData.doseMeridiem = selectedValueArray[1];
	
	var newDoseTimeHours = newNotificationData.doseHours;
	if (newNotificationData.doseMeridiem === "PM") {
		if (newNotificationData.doseMeridiem < 12) {
			newDoseTimeHours = newNotificationData.doseHours + 12;
		}
	} else {
		if (newNotificationData.doseHours === "12") {
			newDoseTimeHours = 0;
		}
	}
	
	var newDoseTime = notificationData.doseTime;
	newDoseTime.setHours(newDoseTimeHours);
	newDoseTime.setMinutes(parseInt(newNotificationData.doseMinutes));
	newNotificationData.doseTime = newDoseTime;  
	
	// remove localNotification object by id
	removeNotification(notificationData);
	
	// separate below code out into another 'add' method that doesn't impact table row
	// maybe adding stuff can return tableViewRow
	// build new localNotification object and push
	scheduledNotificationsList.push(newNotificationData);
	Ti.App.Properties.setList('scheduledNotifications', scheduledNotificationsList);
	
	// push notificationData to NSUserDefaults scheduledNotifications list
	Ti.App.iOS.scheduleLocalNotification({
		alertBody:"BACKGROUND NOTIFICATION FIReD",
		alertAction:"Re-Launch!",
		userInfo:newNotificationData,
		sound:"pop.caf",
		date:newNotificationData.doseTime
	});

	console.log(notificationData);
	console.log(selectedValueArray);
}

function userRequestsNewNotification() {

	addNotification();

}

// life cycle methods
function windowPostlayout(e) {
	
	_.each(scheduledNotificationsList, function(element, index, list) {
		addNewNotificationRow(element, false);
	});
	
	
	// build tableViewFooter
	var footerContainer = Ti.UI.createView({
		backgroundColor: "transparent",
		left : "10px",
		right : "10px",
		height: "100px",
		layout: "vertical"
	});
	
	var addNewNotificationFooterLabel = Ti.UI.createLabel({
		text: " + Add Scheduled Dose",
		top: "10px",
		left:0,
		right:0,
		height: "80px",
		color: "#8b8e8a",
		backgroundColor: "#ffffff"
	});

	addNewNotificationFooterLabel.addEventListener('click', userRequestsNewNotification);
	footerContainer.add(addNewNotificationFooterLabel);
	
	$.notificationTableView.footerView = footerContainer;
}

function publicConsoleTest() {
	console.log("pringitng from our global console");
}
$.publicConsoleTest = publicConsoleTest;

// boilerplate
$.index.open();
