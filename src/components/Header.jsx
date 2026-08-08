import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="header glass">

      <div className="logo-area">

        <img
          src={logo}
          alt="Alamdar Logo"
          className="logo-image"
        />

        <div className="header-text">

          <h1 className="project-title">
            ALAMDAR
          </h1>

          <h2 className="project-verse">
            قُومُوا لِلَّهِ
          </h2>

          <p className="project-slogan">
            اهتزاز پرچم ارزش‌ها در شبکه بلاکچین
          </p>

          <p className="project-desc">
            جایی که یاد قهرمانان، در بلاکچین جاودانه می‌شود
          </p>

        </div>

      </div>

    </header>
  );
}

export default Header;