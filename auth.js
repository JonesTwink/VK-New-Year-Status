const ONE_MINUTE = 60000;

function sendTokenRequest(){
	window.location='https://oauth.vk.com/authorize?client_id=5800054&display=page&redirect_uri=http://oauth.vk.com/blank.html&scope=status&response_type=token&v=5.60';
}
function sendStartupRequest(){	

	document.getElementById("is-running").value = 'true';
	var token = document.getElementById("token-val").value;

	httpGetAsync('serverside.php?token='+token, recursiveCallback);
}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); 
    xmlHttp.send(null);
}
function recursiveCallback(data){
		var token = document.getElementById("token-val").value;
		console.log(data);
		document.getElementById("log").innerHTML += parseResponse(data);
		setTimeout(function(){
			if (document.getElementById("is-running").value !== 'false'){
				httpGetAsync('serverside.php?token='+token, recursiveCallback);
			}
		}, ONE_MINUTE);
}
function parseResponse(jsonString){
	var response = JSON.parse(jsonString);
	var currentTime = new Date();
	currentTime = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
	if (response.response == 1)
		return  '['+ currentTime +']: status has been updated...&#013;&#010;';
	else if (response.response == 14)
		return  '['+ currentTime +']: Error: the server requested captcha...&#013;&#010;';
	else 
		return '['+ currentTime +']: Error: unknown error [code' + response.response + ']...&#013;&#010;';
}

function stopStatusUpdating(){
	document.getElementById("is-running").value = 'false';
}