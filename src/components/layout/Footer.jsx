export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<div className="footer-inner">
				<p>© {year} Sagar Maurya</p>
				<a href="#home" className="back-to-top">
					Back to top
				</a>
			</div>
		</footer>
	);
}
