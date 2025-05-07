import React from "react";
import "./pages.css";

const Dashboard = () => {
	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h1>Панель управления</h1>
			</header>

			<main className="dashboard-main">
				<section className="card">
					<h2>Добро пожаловать!</h2>
					<p>Здесь вы можете управлять своим аккаунтом и просматривать данные.</p>
				</section>

				<section className="grid">
					<div className="card">
						<h3>Пользователи</h3>
						<p>123 активных</p>
					</div>
					<div className="card">
						<h3>Заказы</h3>
						<p>98 новых</p>
					</div>
					<div className="card">
						<h3>Сообщения</h3>
						<p>5 непрочитанных</p>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Dashboard;
