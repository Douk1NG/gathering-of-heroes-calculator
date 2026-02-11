import { t } from "@/lib/utils";
import { T } from "@/translations";

export function TitleSection() {
    return (
        <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-white via-white to-white/40 mb-2">
                {t(T.header.title).split(' ')[0]} {t(T.header.title).split(' ').slice(1).join(' ')} OF <span className="text-yellow-500">{t(T.header.subtitle).split(' ')[0]}</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
                {t(T.header.disclaimer)}
            </p>
        </div>
    );
}
