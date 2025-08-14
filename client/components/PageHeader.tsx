import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Crown } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  iconColor: string;
  credits?: number;
  isPremium?: boolean;
  rightContent?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  icon,
  iconColor,
  credits,
  isPremium = false,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center ${iconColor}`}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {rightContent || (
            <>
              {isPremium && (
                <Badge className="bg-yellow-500 text-black border-0 font-medium">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              {typeof credits === "number" && (
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2">
                  <CreditCard className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">
                    {credits}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
