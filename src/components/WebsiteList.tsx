import * as React from 'react';
import '../styles/website.css';
import Website from './Website';

interface OwnProps {
	websites: Status[];
}

export interface Status {
	name: string;
	isUp: boolean;
}

class WebsiteList extends React.Component<OwnProps> {
	render() {
		return (
			<div className="Website-container">
			{ this.props.websites.map(i => 
				<Website 
					isUp={ i.isUp }
					name={ i.name }
					key={ i.name }
				/>	
			)}
						
			</div>
		);
	}
}

export default WebsiteList;
