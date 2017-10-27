import React from 'react';
import {Col, Row} from 'react-bootstrap';
import './header.css';

export default function Header() {
	return (
		<div>
			<Col md={3}>
				<div className="cts-logo"/>
			</Col>
			<Col md={6} className="mxref-title">
				<h1>mConfig</h1>
			</Col>
			<Col md={3}/>
			<header className="global-header-wrapper">
				<div className="mega-menu-wrapper">
					<Row className="mega-menu-row">
						<Col className="no-pad"/>
					</Row>
				</div>
			</header>
		</div>
	)
}
