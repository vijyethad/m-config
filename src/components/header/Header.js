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
								{
									props.location.pathname === '/' ?
										<Breadcrumb>
											<Breadcrumb.Item active href= {`${process.env.PUBLIC_URL}/`}>
												Home
											</Breadcrumb.Item>
										</Breadcrumb>
										:
										null
								}
								{
									props.location.pathname === '/createTable' ?
										<Breadcrumb>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/`}>
												Home
											</Breadcrumb.Item>
											<Breadcrumb.Item active href = {`${process.env.PUBLIC_URL}/createTable`}>
												createTable
											</Breadcrumb.Item>
										</Breadcrumb>
										:
										null
								}
								{
									props.location.pathname === '/enterFieldsInfo' ?
										<Breadcrumb>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/`}>
												Home
											</Breadcrumb.Item>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/createTable`}>
												createTable
											</Breadcrumb.Item>
											<Breadcrumb.Item active href = {`${process.env.PUBLIC_URL}/enterFieldsInfo`}>
												enterFieldsInfo
											</Breadcrumb.Item>
										</Breadcrumb>
										:
										null
								}
								{
									props.location.pathname === '/enterTableValues' ?
										<Breadcrumb>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/`}>
												Home
											</Breadcrumb.Item>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/createTable`}>
												createTable
											</Breadcrumb.Item>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/enterFieldsInfo`}>
												enterFieldsInfo
											</Breadcrumb.Item>
											<Breadcrumb.Item active href = {`${process.env.PUBLIC_URL}/enterTableValues`}>
												enterTableValues
											</Breadcrumb.Item>
										</Breadcrumb>
										:
										null
								}
								{
									props.location.pathname === '/updateTable' ?
										<Breadcrumb>
											<Breadcrumb.Item href = {`${process.env.PUBLIC_URL}/`}>
												Home
											</Breadcrumb.Item>
											<Breadcrumb.Item active href = {`${process.env.PUBLIC_URL}/updateTable`}>
												View/Update Table
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
