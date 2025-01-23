import AppSidebar from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import RewardsTier from "@/components/RewardsTier";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  const user = JSON.parse(localStorage.getItem("user")) || { sustain_score: 0 };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-primary">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-semibold text-white">Your Profile</h1>
        </header>
        <div className="flex flex-1 flex-col p-4 bg-white">
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="rounded-xl bg-muted/50 p-4">
              <h3 className="font-semibold mb-2">Sustainability Score</h3>
              <p className="text-3xl font-bold">{user.sustain_score}</p>
            </div>
            <div className=" rounded-xl bg-muted/50 p-4">
              <h3 className="font-semibold mb-2">Completed Challenges</h3>
              <p className="text-3xl font-bold">{Math.floor(user.sustain_score / 10)}</p>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 p-4">
            <h2 className="text-2xl font-bold mb-4">Rewards & Achievements</h2>
            <RewardsTier />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
