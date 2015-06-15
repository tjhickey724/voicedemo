Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/', {name: 'welcome'});
Router.route('/talk', {name: 'talk'});
Router.route('/listen', {name: 'listen'});