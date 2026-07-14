import "./Auth.css";

function AuthLayout({ children, title, description }) {
    return (
        <div className="auth-page">
            <div className="auth-background-shape auth-shape-one"></div>
            <div className="auth-background-shape auth-shape-two"></div>

            <main className="auth-container">
                <section className="auth-introduction">
                    <p className="auth-label">CLASSQUEST</p>

                    <h1>
                        Build better attendance habits, one class at a time.
                    </h1>

                    <p className="auth-introduction-text">
                        Track your attendance, maintain your streak and earn XP by
                        attending your scheduled classes.
                    </p>

                    <div className="auth-preview">
                        <div className="preview-item">
                            <span className="preview-value">12</span>
                            <span className="preview-label">Day streak</span>
                        </div>

                        <div className="preview-divider"></div>

                        <div className="preview-item">
                            <span className="preview-value">450</span>
                            <span className="preview-label">Total XP</span>
                        </div>

                        <div className="preview-divider"></div>

                        <div className="preview-item">
                            <span className="preview-value">86%</span>
                            <span className="preview-label">Attendance</span>
                        </div>
                    </div>
                </section>

                <section className="auth-card">
                    <div className="auth-card-heading">
                        <p className="auth-brand">ClassQuest</p>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>

                    {children}
                </section>
            </main>
        </div>
    );
}

export default AuthLayout;