import { Link } from 'react-router-dom';

const Footer = () => {
    return (
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-auto border-top">
                <p className="col-md-4 mb-0 text-muted">© 2022 Company, Inc</p>
                <Link
                    href="/"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                >
                    <img
                        src="/assets/images/logoNew.png"
                        className="bi me-2"
                        width={50}
                        height={50}
                    />
                </Link>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/" className="nav-link px-2 text-muted">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/publications" className="nav-link px-2 text-muted">
                            Publications
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link px-2 text-muted">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link px-2 text-muted">
                            About
                        </Link>
                    </li>
                </ul>
            </footer>

    );
}

export default Footer;