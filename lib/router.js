Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/', {name: 'welcome'});
Router.route('talk');
Router.route('listen');
Router.route('dialogue');