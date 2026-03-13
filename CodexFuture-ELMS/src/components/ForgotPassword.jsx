import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000/api";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
    const [token, setToken] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);
    const [msg, setMsg] = useState({ error: "", success: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Resend OTP cooldown
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown((t) => t - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Common fetch handler
    const handleFetch = async (url, body, nextStep, successHandler) => {
        setLoading(true);
        setMsg({ error: "", success: "" });
        try {
            const res = await fetch(`${BACKEND_URL}/${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (data.success) {
                setMsg({ success: data.message, error: "" });
                successHandler && successHandler(data);
                nextStep && setStep(nextStep);
            } else setMsg({ error: data.message, success: "" });
        } catch {
            setMsg({ error: "Server error!", success: "" });
        } finally {
            setLoading(false);
        }
    };

    // Step Handlers
    const sendOtp = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setMsg({ error: "Enter a valid email" });
        handleFetch("forgot-password", { email: form.email }, 2, (d) => {
            setToken(d.token);
            setResendCooldown(60);
        });
    };

    const verifyOtp = () => {
        if (!/^\d{6}$/.test(form.otp)) return setMsg({ error: "Enter a valid 6-digit OTP" });
        handleFetch("verify-otp", { token, otp: form.otp }, 3);
    };

    const resetPassword = () => {
        if (form.newPassword.length < 6)
        return setMsg({ error: "Password must be at least 6 characters" });
        handleFetch("reset-password", { email: form.email, newPassword: form.newPassword }, null, () =>
        setTimeout(() => navigate("/login"), 1000)
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-6">
                <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
                <p className="text-center text-gray-500">Step {step} of 3</p>

                {msg.error && <p className="text-red-500 text-center">{msg.error}</p>}
                {msg.success && <p className="text-green-500 text-center">{msg.success}</p>}

                {step === 1 && (
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-input w-full"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <button className="btn btn-primary w-full" onClick={sendOtp} disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </div>
                )}

                {step === 2 && (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="form-input w-full"
                        value={form.otp}
                        onChange={(e) => setForm({ ...form, otp: e.target.value })}
                    />
                    <button className="btn btn-primary w-full" onClick={verifyOtp} disabled={loading}>
                        {loading ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                    <button
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                        onClick={sendOtp}
                        disabled={resendCooldown > 0}
                    >
                        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
                    </button>
                </div>
                )}

                {step === 3 && (
                <div className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="form-input w-full"
                        value={form.newPassword}
                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                    />
                    <button className="btn btn-primary w-full" onClick={resetPassword} disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;