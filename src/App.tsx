import * as React from 'react';
import './styles/App.css';
import WebsiteList, { Status } from './components/WebsiteList';

const websites: string[] = 
	[
		'https://prover-tst2.udir.no',
		'https://testpgsc.udir.no/kursweb/idapp/admin'
	];

interface Props {
}

interface State {
	websitesWithStatus: Map<string, boolean>;
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.pingWebSites = this.pingWebSites.bind(this);
		this.isSiteOnline = this.isSiteOnline.bind(this);
		this.state = {
			websitesWithStatus: new Map([
				[websites[0], false],
				[websites[1], false]
			])
		};
	}

	isSiteOnline(url: string , callback: (isUp: boolean) => void) {
		// try to load favicon
		var timer = setTimeout(function() {
			// timeout after 1 seconds
		}, 1000);
	
		var img = document.createElement('img');
		img.onload = function() {
			clearTimeout(timer);
			callback(true);
		};
	
		img.onerror = function() {
			clearTimeout(timer);
			callback(false);			
		};
	
		img.src = url + '/favicon.ico';
	}

	pingWebSites(website: string) {
		this.isSiteOnline(website, (isUp) => {
			let newMap = this.state.websitesWithStatus;
			console.log(website, isUp);
			newMap.set(website, isUp);
			this.setState({websitesWithStatus: newMap});
		});
	}

	componentDidMount () {
		let that = this;
		websites.map(s => that.pingWebSites(s));		
		window.setInterval(function() {
			websites.map(s => that.pingWebSites(s));
		}, 10000);
	}
	render() {
		let keys = Array.from(this.state.websitesWithStatus.keys());
		let miljoer: Status[] = keys.map(k => {
			let isUp = this.state.websitesWithStatus.get(k);
			let item: Status = {
				name: k,
				isUp: isUp ? true : false };
			return item;
		});

		return (
			<div className="App">
				<header className="App-header">
					<h1>Testmiljøstatus</h1>
				</header>
				<WebsiteList 
					websites={ miljoer }
				/>
			</div>
		);
	}
}

export default App;
