import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT_TIME = 15 * 60 * 1000;

export default function AutoLogoutOff() {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, AUTO_LOGOUT_TIME);
  }, [logout]);

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  return null;
}
