export default function Footer() {
	const year = new Date().getFullYear();

	const handleBackToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className="site-footer">
			<div className="footer-inner">
				<p>© {year} Sagar Maurya</p>
				<button
					type="button"
					className="back-to-top reveal reveal-button"
					style={{ animationDelay: '0.08s' }}
					onClick={handleBackToTop}
					aria-label="Back to top"
					title="Back to top"
				>
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M12 19V5M5.5 11.5 12 5l6.5 6.5"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				</button>
			</div>
		</footer>
	);
}
