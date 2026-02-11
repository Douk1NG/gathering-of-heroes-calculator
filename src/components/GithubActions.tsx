import { Star, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGithubActions } from "@/hooks/use-github-actions";
import { t } from "@/lib/utils";
import { T } from "@/translations";

export function GithubActions() {
    const { handleOpenGithub } = useGithubActions();

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3 pr-4 sm:border-r border-white/10">
                <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Github className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white">{t(T.githubActions.githubUser)}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                    variant="outline"
                    className="flex-1 sm:flex-none h-9 px-3 bg-white/5 border-white/10 hover:bg-yellow-500 hover:text-black transition-all group"
                    onClick={handleOpenGithub}
                >
                    <Star className="w-4 h-4 mr-2 group-hover:fill-current" />
                    {t(T.githubActions.star)}
                </Button>
            </div>
        </div>
    );
}
