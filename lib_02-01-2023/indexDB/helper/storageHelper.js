function getKey(key) {
	return localStorage.getItem(key);
}

function setKey(key, value) {
	localStorage.setItem(key, value);
}

function isHaveSkey(key)
{
	var valKey = getKey(key);
	
	if (valKey == null || valKey == '') 
	{
		return false;
	}
	
	return true;
}