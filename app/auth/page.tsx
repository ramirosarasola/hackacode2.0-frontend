import LoginForm from "./login/login-form";

export default function Auth() {
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-blue rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Log In</h1>
        <LoginForm />
      </div>
    </>
  );
}
