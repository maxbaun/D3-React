import Home from './components/home';
import About from './components/about';

export default [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/about',
		component: About
	}
];
