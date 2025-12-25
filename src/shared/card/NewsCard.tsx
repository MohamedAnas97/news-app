import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { translations } from "../../language/translations";
import { translateToArabic } from "../../utils/translate";
import type { Post, User } from "../../features/news/types";
import type { Lang } from "../../language/translations";
import { FaUser } from "react-icons/fa";

interface NewsCardProps {
  post: Post;
  author?: User;
  lang: Lang;
}

export default function NewsCard({ post, author, lang }: NewsCardProps) {
  const theme = useAppSelector((state) => state.theme.mode);
  const [translated, setTranslated] = useState({
    title: post?.title,
    body: post?.body,
  });

  useEffect(() => {
    if (!post) return;
    let active = true;
    const translate = async () => {
      if (lang === "ar") {
        const [tTitle, tBody] = await Promise.all([
          translateToArabic(post?.title),
          translateToArabic(post?.body),
        ]);
        if (active) setTranslated({ title: tTitle, body: tBody });
      } else {
        setTranslated({ title: post?.title, body: post?.body });
      }
    };
    translate();
    return () => {
      active = false;
    };
  }, [lang, post]);

  const capitalizeEachWord = (text: string) =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());
  const capitalizeBody = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="border rounded-md overflow-hidden transition-all duration-300 dark:border-slate-700 shadow-[0px_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0px_1px_6px_rgba(0,0,0,0.04)]">
      <div className="overflow-hidden">
        <img
          src={`https://picsum.photos/600/300?random=${post?.id}`}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x300";
          }}
          alt="thumbnail"
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-[1.06]"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        {/* news title */}
        <h2
          className="font-bold text-[22px] truncate"
          style={{ color: theme === "dark" ? "white" : "#006fac" }}
        >
          {capitalizeEachWord(translated?.title)}
        </h2>
        {/* news author name */}
        <p className="flex items-baseline text-sm font-medium gap-1">
          <span className="font-bold">{translations[lang]?.author}:</span>
          <FaUser size={11} className="text-gray-500 dark:text-gray-400" />
          <span className="text-gray-800 dark:text-slate-200 font-medium">
            {author?.name ?? "—"}
          </span>
        </p>
        {/* news description */}
        <p className="text-sm font-medium text-[#121212] dark:text-gray-400 line-clamp-2">
          {capitalizeBody(translated?.body)}
        </p>
        {/* read more link */}
        <Link
          to={`/post/${post.id}`}
          className={`inline-flex items-center justify-center gap-1 text-white bg-gradient-to-r from-[#006fac] to-blue-700 dark:from-blue-600 dark:to-blue-800
    hover:opacity-90 px-4 py-2 rounded-sm font-semibold shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_1px_2px_rgba(0,0,0,0.03)]
    transition-all duration-300 text-sm`}
        >
          {translations[lang]?.readMore}
          <span
            className={`transition-transform duration-300 ${
              lang === "ar" ? "rotate-180" : ""
            }`}
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
