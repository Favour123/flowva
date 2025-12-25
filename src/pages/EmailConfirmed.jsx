import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    let mounted = true;
    const confirmEmail = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      if (data?.session) {
        setStatus("success");
        setTimeout(() => {
          navigate("/login");
        }, 200);
      } else {
        setStatus("error");
      }
    };

    confirmEmail();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleGoLogin = () => navigate("/login");
  const handleHome = () => navigate("/");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg,#f8fafc 0%, #eef2ff 100%)",
      padding: "24px",
    }}>
      <style>{`\n        .card { width: 100%; max-width: 520px; background: white; border-radius:16px; box-shadow: 0 10px 30px rgba(16,24,40,0.08); padding:28px; }\n        .icon { width:84px; height:84px; display:flex; align-items:center; justify-content:center; border-radius:999px; margin:0 auto 12px; }\n        .success-bg { background: linear-gradient(135deg,#6ee7b7,#10b981); color: white }\n        .error-bg { background: linear-gradient(135deg,#fecaca,#f97316); color: white }\n        .title { font-size:20px; font-weight:700; margin:8px 0 6px; color:#0f172a }\n        .desc { color:#475569; margin:0 0 18px }\n        .actions { display:flex; gap:10px; justify-content:center }\n        .btn { padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer; border:0 }\n        .btn-primary { background:#111827; color:white }\n        .btn-ghost { background:transparent; color:#111827; border:1px solid #e6e9ee }\n        @keyframes floaty { 0%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } 100%{ transform: translateY(0) } }\n        .float { animation: floaty 3s ease-in-out infinite }\n      `}</style>

      <div className="card" role="status" aria-live="polite">
        {status === "confirming" && (
          <div style={{ textAlign: "center", paddingTop: 8 }}>
            <div className="icon float" style={{ background: "linear-gradient(135deg,#c7d2fe,#a78bfa)", color: "white" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="title">Confirming your email…</h3>
            <p className="desc">Hang on — we're verifying your confirmation link.</p>
          </div>
        )}

        {status === "success" && (
          <div style={{ textAlign: "center" }}>
            <div className="icon success-bg" aria-hidden>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="title">Email confirmed — you're all set!</h3>
            <p className="desc">We've activated your account. You'll be redirected to login shortly.</p>

            <div className="actions">
              <button className="btn btn-primary" onClick={handleGoLogin}>Go to Login</button>
              <button className="btn btn-ghost" onClick={handleHome}>Back to Home</button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center" }}>
            <div className="icon error-bg" aria-hidden>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="title">Confirmation failed</h3>
            <p className="desc">We couldn't verify the link. Try logging in, or request a new confirmation email.</p>
            <div className="actions">
              <button className="btn btn-primary" onClick={handleGoLogin}>Try Login</button>
              <button className="btn btn-ghost" onClick={handleHome}>Back to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
