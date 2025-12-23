import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Email Confirmed 🎉</h1>
      <p>Thank you for confirming your email.</p>
      <p>Redirecting you to login…</p>
    </div>
  );
}
