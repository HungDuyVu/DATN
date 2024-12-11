import { Outlet } from "react-router-dom";
import welcome from "../../assets/welcome.jpg";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with the image */}
      <div className="hidden lg:flex items-center justify-center bg-pink w-1/2 relative">
        <img 
          src={welcome} 
          className="absolute inset-0 h-full w-full object-cover p-12" 
          alt="Welcome" 
        />
      </div>

      {/* Right side with content */}
      <div className="flex flex-col flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl font-extrabold text-center pb-12">
            Welcome to Our E-Commerce Site!
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
