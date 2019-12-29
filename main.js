function event_hook() {
	window.addEventListener('load', function() {
		org_renderer();
		setup_text();
	}, false);
	gid('vanilla-text').addEventListener('input', setup_text, false);
	gid('copy').addEventListener('click', copy, false);
}

function setup_text() {
	org_marked();
	org_highlight();
	org_convert();
}

function org_renderer() {
	var renderer = new marked.Renderer();
	renderer.heading = function (text, level) {
		return '<h' + level + '>' + text + '</h' + level + '>\n\n';
	};
	marked.setOptions({
		renderer: renderer,
	});
}

function org_marked() {
	var text = marked(gid('vanilla-text').value);
	text = text.replace(/<p>\[(.*?)\]<\/p>/g, '\n[$1]\n')
	.replace(/<p>\[\/(.*?)\]<\/p>/g, '\n[/$1]\n')
	.replace(/^\n\n/, '');
	gid('md-area').innerHTML = text;
}

function org_highlight() {
	var trg = document.querySelectorAll('#md-area pre code');
	for (var i=0;i<trg.length;i++) {
		hljs.highlightBlock(trg[i]);
	}
}

function org_convert() {
	var text = gid('md-area').innerHTML;
	gid('copy-area').value = text;
}

function copy() {
	var d = document, w = window, range, sel;
	copy_area = gid('copy-area'),
	copy_area.select();
	range = d.createRange();
	range.selectNodeContents(copy_area);
	sel = w.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	copy_area.setSelectionRange(0, 999999);
	d.execCommand('copy');
	gid('copy-span').innerText = 'コピーしました！';
}
