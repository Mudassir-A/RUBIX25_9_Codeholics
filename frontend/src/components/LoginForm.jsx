import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function LoginForm() {
  const [tab, setTab] = useState("login");

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  return (
    <> 
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-400px]">
        <div className="hidden bg-muted lg:block">
          <div className="flex items-center justify-center h-full p-10 text-center">
            <div>
              <h1 className="text-4xl font-bold">Welcome to Eco some name</h1>
              <h2 className="text-2xl">Some descc</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tabs value={tab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
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
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter password"
                    />
                  </div>
                  <Link to="/dash">
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-center text-lg">
                  New to SecureSage?{" "}
                  <Link
                    onClick={() => changeTab("register")}
                    className="underline">
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
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      placeholder="Confirm password"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
                <div className="mt-4 text-center text-lg">
                  Already have an account?{" "}
                  <Link
                    onClick={() => changeTab("login")}
                    className="underline">
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
