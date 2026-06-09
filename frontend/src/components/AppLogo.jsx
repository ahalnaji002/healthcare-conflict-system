import logo from "../assets/war-injuries-logo.png";

function AppLogo({ variant = "default" }) {
  return (
    <div className={`app-logo app-logo-${variant}`}>
      <img src={logo} alt="War Injuries Care Logo" />
    </div>
  );
}

export default AppLogo;
