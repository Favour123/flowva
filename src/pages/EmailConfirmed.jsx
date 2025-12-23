import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmed() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    const confirmEmail = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }

      if (data?.session) {
        setStatus("success");

        // Redirect after short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("error");
      }
    };

    confirmEmail();
  }, [navigate]);

  return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      {status === "confirming" && <h2>Confirming your email…</h2>}
      {status === "success" && (
        <>
          <h2>✅ Email confirmed successfully</h2>
          <p>Redirecting you to login…</p>
        </>
      )}
      {status === "error" && (
        <>
          <h2>❌ Confirmation failed</h2>
          <p>Please try logging in or request a new link.</p>
        </>
      )}
    </div>
  );
}
