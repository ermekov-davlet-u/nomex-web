import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";

const NotFound = () => {
	return (
		<div className="not-found">
			<h1>404</h1>
			<p>Страница не найдена</p>
			<Link to="/" className="home-link">На главную</Link>
		</div>
	);
};

export default NotFound;
