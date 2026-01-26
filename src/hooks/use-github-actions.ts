import { useCallback } from "react";

export function useGithubActions() {
    const handleOpenGithub = useCallback(() => {
        window.open('https://github.com/Douk1NG/gathering-of-heroes-calculator', '_blank');
    }, []);

    return {
        handleOpenGithub
    };
}
