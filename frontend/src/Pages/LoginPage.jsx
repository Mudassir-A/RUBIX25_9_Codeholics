import React from "react";
import ThemeToggle from "@/Components/themeToggle";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <LoginForm />
      <div className="absolute top-4 right-4">
      </div>
    </div>
  );
}
