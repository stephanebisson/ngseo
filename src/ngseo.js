var phantom = require('phantom');

var isCrawled = function(req) {
	return !!getFragment(req);
};

var getFragment = function(req) {
	return req.query['_escaped_fragment_'];
};

var extractHtml = function() { 
	return document.querySelector('html').outerHTML;
};

module.exports = function() {
    return function(req, res, next) {
    	console.log(req.originalUrl);
        if (isCrawled(req)) {
        	phantom.create(function(ph) {
        		ph.createPage(function(page) {
        			page.open('.' + req.path + '#' + getFragment(req), function(status) {
        				page.evaluate(extractHtml, 
        					function(html) { res.send(html.replace(/ng-app=\".*?\"/,'')); ph.exit(); });
        			});
        		});
        	});
        }
        else { next(); }
    }
    
};