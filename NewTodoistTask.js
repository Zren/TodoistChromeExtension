function funcToString(f) {
  return f.toString() + '\n' + f.name + '();';
}

function scriptFromFunc(f) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = funcToString(f);
  return script;
}

function injectScript(script) {
  document.getElementsByTagName('head')[0].appendChild(script);
}

function injectFunc(f) {
	injectScript(scriptFromFunc(f));
	f();
}



function InjectedScript() {
	var InjectedScriptTaskId;

	function isTodoistLoaded() {
		return SyncEngine.sync_queue.get().length == 0;
	}

	InjectedScriptTaskId = setInterval(function(){
		try {
			if (isTodoistLoaded()) {
				QuickAddTasks.toggle();
				clearInterval(InjectedScriptTaskId);
				console.log('test3b');
			}
		} catch (e) {
		}
	}, 100);
}

function main() {
	injectFunc(InjectedScript);
	console.log('test');
}

main();