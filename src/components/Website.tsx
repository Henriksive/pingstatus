import * as React from 'react';
import '../styles/website.css';

interface OwnProps {
	isUp: boolean;
	name: string;
}

class Website extends React.Component<OwnProps> {
	render() {
		const classnames = `Website-item${this.props.isUp ? ' green' : ' red'}`;
		return (
			<div className={ classnames }>
				<div className="Name-container">
					{ this.props.name }
				</div>
			</div>
		);
	}
}

export default Website;
