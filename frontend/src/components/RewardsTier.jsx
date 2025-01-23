import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

export default function RewardsTier() {
    const user = JSON.parse(localStorage.getItem("user")) || { sustain_score: 0 };
    const score = user.sustain_score || 0;

    const tiers = [
        { name: "Bronze", minPoints: 0, maxPoints: 49, color: "bg-amber-600" },
        { name: "Silver", minPoints: 50, maxPoints: 99, color: "bg-gray-400" },
        { name: "Gold", minPoints: 100, maxPoints: 149, color: "bg-yellow-400" },
        { name: "Platinum", minPoints: 150, maxPoints: 199, color: "bg-purple-400" },
        { name: "Diamond", minPoints: 200, maxPoints: Infinity, color: "bg-blue-400" }
    ];

    const getCurrentTier = (points) => {
        return tiers.find(tier => points >= tier.minPoints && points <= tier.maxPoints);
    };

    const getNextTier = (currentTier) => {
        const currentIndex = tiers.findIndex(tier => tier.name === currentTier.name);
        return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
    };

    const currentTier = getCurrentTier(score);
    const nextTier = getNextTier(currentTier);

    const getProgressToNextTier = () => {
        if (!nextTier) return 100;
        const pointsInCurrentTier = score - currentTier.minPoints;
        const tierRange = nextTier.minPoints - currentTier.minPoints;
        return (pointsInCurrentTier / tierRange) * 100;
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className={`h-6 w-6 ${currentTier.color}`} />
                        Current Tier: {currentTier.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Current Points: {score}</p>
                            {nextTier && (
                                <p className="text-sm text-muted-foreground">
                                    Next Tier: {nextTier.name} ({nextTier.minPoints - score} points needed)
                                </p>
                            )}
                        </div>
                        <Progress value={getProgressToNextTier()} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tiers.map((tier) => (
                    <Card key={tier.name} className={score >= tier.minPoints ? "border-2 border-green-500" : ""}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className={`h-6 w-6 ${tier.color}`} />
                                {tier.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Required Points: {tier.minPoints}+
                            </p>
                            {score >= tier.minPoints && (
                                <p className="text-green-500 font-semibold mt-2">Unlocked!</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 