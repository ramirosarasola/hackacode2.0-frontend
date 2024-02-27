import LoginForm from "./login/login-form";

export default function Auth() {
  return (
    <>
      <main className="bg-secondary flex justify-end w-full h-[100vh]">
        <div className="welcome w-[40%] h-[60%] m-auto flex items-end justify-start">
          <div className="w-[70%]">
            <h1 className="text-[48px]">Welcome Back!</h1>
            <p className="text-[16px] text-left">
              Welcome to our exclusive employee portal! Designed to streamline
              the sale of our travel products. This intuitive tool will enhance
              your ability to offer unique experiences.{" "}
            </p>
          </div>
        </div>
        <div className="login bg-white w-[50vw] h-[100vh] rounded-l-3xl flex items-center justify-center">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
