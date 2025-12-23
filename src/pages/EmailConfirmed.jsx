import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase'
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    const handleConfirmation = async () => {
      // This consumes the hash and sets the session
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setStatus("error");
        return;
      }

      if (data?.session) {
        setStatus("success");

        // Redirect to login after 3s
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    handleConfirmation();
  }, [navigate]);

  if (status === "confirming") {
    return <p style={{ textAlign: "center" }}>Confirming your email…</p>;
  }

  if (status === "error") {
    return <p style={{ textAlign: "center" }}>Invalid or expired link.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎉 Email Confirmed</h1>
      <p>Thank you for confirming your email.</p>
      <p>Redirecting you to login…</p>
    </div>
  );
}
