import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline, IoBusinessOutline, IoChevronForward } from "react-icons/io5";

export default function ChooseFizUr() {
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.state?.email || "";

	return (
		<div style={styles.container}>
			<div style={styles.content}>
				<h1 style={styles.title}>Зарегистрируйтесь</h1>
				<p style={styles.subtitle}>Заполните данные</p>

				{/* Физическое лицо */}
				<div style={styles.option} onClick={() => navigate("/personal-info", {
					state: {
						email: email
					}
				})}>
					<IoPersonCircleOutline size={32} style={styles.iconPrimary} />
					<span style={styles.optionText}>Физическое лицо</span>
					<IoChevronForward size={24} style={styles.iconSecondary} />
				</div>

				{/* Компания */}
				<div style={styles.option} onClick={() => navigate("/company-detail", {
					state: {
						email: email
					}
				})}>
					<IoBusinessOutline size={32} style={styles.iconPrimary} />
					<span style={styles.optionText}>Компания</span>
					<IoChevronForward size={24} style={styles.iconSecondary} />
				</div>
			</div>
		</div>
	);
}

const styles = {
	container: {
		backgroundColor: "#f8f8f8",
		minHeight: "100vh",
		padding: "40px 0",
	},
	content: {
		maxWidth: 500,
		margin: "0 auto",
		padding: "0 20px",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#000000", // черный
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#666666", // серый
		marginBottom: 30,
	},
	option: {
		display: "flex",
		alignItems: "center",
		padding: 16,
		marginBottom: 15,
		backgroundColor: "#ffffff",
		borderRadius: 12,
		border: "1px solid #cccccc",
		cursor: "pointer",
		transition: "box-shadow 0.2s",
	},
	optionText: {
		flex: 1,
		fontSize: 16,
		marginLeft: 16,
		color: "#000000", // черный
	},
	iconPrimary: {
		color: "#ff0000", // красный
	},
	iconSecondary: {
		color: "#666666", // серый
	},
};
