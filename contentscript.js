var observer = new window.MutationObserver(observer_callback);
observer.observe(document, {
  childList: true,
  subtree: true,
  characterData: true
});

function observer_callback(m, o) {
	addHyperlinks();
}

function addHyperlinks() {
	let locationMarkers = document.getElementsByClassName("fal fa-map-marker-alt")

	for(let i = 0; i < locationMarkers.length; i++) {
		let parentNode = findParent(locationMarkers[i].parentNode);

		let text = parentNode.lastChild.textContent;
		if(!hasLink(parentNode) && isLinkText(text)) {

			let hyperlink = document.createElement("a");
			hyperlink.onmouseenter = function() {
				this.style.textDecoration = "underline";
			}
			hyperlink.onmouseleave = function() {
				this.style.textDecoration = "none";
			}
			hyperlink.href = text;

			let textNode = document.createTextNode(text);
			hyperlink.appendChild(textNode);

			parentNode.removeChild(parentNode.lastChild);
			parentNode.appendChild(hyperlink);
		}
	}
}

function findParent(parentNode) {
	if(parentNode.lastChild.nodeName != "#text") {
		return parentNode.lastChild;
	}
	return parentNode;
}


function hasLink(parentNode) {
	let link = parentNode.lastChild;

	return link.nodeName == "A";
}

var re_weburl = new RegExp(
  "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
        "(?:" +
          "[a-z0-9\\u00a1-\\uffff]" +
          "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
        ")?" +
        "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
  "$", "i"
);
function isLinkText(text) {
	return re_weburl.test(text);
}


