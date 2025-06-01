import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f5f6fa"
    }}>
      {/* Left Side */}
      <div style={{
        flex: 1.2,
        background: `url('/images/background.jpg') center center/cover no-repeat`,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        padding: "48px 40px",
        position: "relative"
      }}>
        <div style={{
          background: "rgba(30, 41, 59, 0.75)",
          borderRadius: 16,
          padding: "32px 24px",
          marginBottom: 32,
          maxWidth: 700
        }}>
          <img
            src="/logo-1.svg"
            alt="Logo"
            style={{ width: 200, height: 48, marginBottom: 16 }}
          />
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            margin: 0,
            marginBottom: 12
          }}>
            Welcome to AI Interview Mocker <span role="img" aria-label="rocket">🚀</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: "#cbd5e1",
            margin: 0
          }}>
            Get ready to practice and improve your interview skills with the help of AI!
            Preparing for your first job or next big role? We're here to help!
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div style={{
        flex: 1,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: "0 2px 24px rgba(0,0,0,0.08)"
      }}>
        <div style={{ width: 380, maxWidth: "100%", padding: "32px 0" }}>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
