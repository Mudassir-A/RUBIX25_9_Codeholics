import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API_URL = "http://localhost:5000/api/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-400px] ">
        <div className="hidden bg-muted lg:block">
          <div className="flex items-center justify-center h-full p-10 text-center bg-primary">
            <div>
              <h1 className="text-4xl font-bold">Welcome to Eco some name</h1>
              <h2 className="text-2xl">Some descc</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tabs value={tab} className="w-[400px] ">
            <TabsList className="grid w-full grid-cols-2 bg-primary">
              <TabsTrigger value="login" onClick={() => changeTab("login")}>
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                onClick={() => changeTab("register")}>
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline  text-secondary">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Link to="/dash">
                    <Button type="submit" className="w-full text-secondary" onClick={handleLogin}>
                      Login
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-center text-lg">
                  New to SecureSage?{" "}
                  <Link
                    onClick={() => changeTab("register")}
                    className="underline text-secondary">
                    Register
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Register</h1>
                  <p className="text-balance text-muted-foreground">
                    Create a new account to get started
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      required
                      placeholder="Enter username"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="m@example.com"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm password"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Button type="submit" className="w-full" onClick={handleRegister}>
                    Register
                  </Button>
                </div>
                <div className="mt-4 text-center text-lg">
                  Already have an account?{" "}
                  <Link
                    onClick={() => changeTab("login")}
                    className="underline  text-secondary">
                    Login
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
