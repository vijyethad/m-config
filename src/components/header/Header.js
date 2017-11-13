import React from 'react';
import { Col, Row, Breadcrumb } from 'react-bootstrap';
import './header.css';

export default function Header(props) {
	return (
		<div className="header">
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
						<Col>
							<div className="no-pad">
								{props.location.pathname === '/' ?
									<Breadcrumb>
										<Breadcrumb.Item active href="/">
											Home
										</Breadcrumb.Item>
									</Breadcrumb>
									:
									null}
								{
									props.location.pathname === '/enterTableValues' ?
										<Breadcrumb>
											<Breadcrumb.Item href="/">
												Home
											</Breadcrumb.Item>
											<Breadcrumb.Item active href="/enterTableValues">
												enterTableValues
											</Breadcrumb.Item>
										</Breadcrumb>
										:
										null
								}
							</div>
						</Col>
					</Row>
				</div>
			</header>
		</div>
	)
}
