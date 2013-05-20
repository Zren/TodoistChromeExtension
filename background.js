function onCommand(command) {
	if (command == 'new-task') {
		openNewTask();
	}
}

function sendNewTaskToTodoistTab(tab) {
	chrome.tabs.update(tab.id, {
		"active": true
	});
	chrome.windows.update(tab.windowId, {
		"focused": true
	});
	chrome.tabs.executeScript(tab.id, {
		"file": "NewTodoistTask.js"
	});
}

function openNewTodoistTab(onOpenTab) {
	chrome.tabs.create({
		"url": "https://todoist.com/app"
	}, onOpenTab);
}

function openNewTask() {
	getTodoistTab(sendNewTaskToTodoistTab, function() {
		openNewTodoistTab(sendNewTaskToTodoistTab);
	});
}

function getTodoistTab(onOpenTab, onNoOpenTab) {
	chrome.windows.getAll({"populate": true}, function(windows) {
		var todoistTab;
		for (var i = 0; i < windows.length; i++) {
			var win = windows[i];

			for (var j = 0; j < win.tabs.length; j++) {
				var tab = win.tabs[j];

				console.log(tab.url);
				if (tab.url.match(/^https?:\/\/todoist\.com\/app/i)) {
					console.log('MATCH');
					todoistTab = tab;
				}
			}
		}

		if (todoistTab) {
			onOpenTab(todoistTab);
		} else {
			onNoOpenTab();
		}
	});
}

chrome.commands.onCommand.addListener(onCommand);