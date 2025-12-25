import {
  useGetPostsQuery,
  useGetUsersQuery,
} from "../../features/news/newsApi";
import { useAppSelector } from "../../app/hooks";
import NewsCard from "../../shared/card/NewsCard";
import Skeleton from "../../shared/skeleton/Skeleton1";
import { translations } from "../../language/translations";

export default function NewsList() {
  const { data: posts, isLoading } = useGetPostsQuery();
  const { data: users } = useGetUsersQuery();
  const lang = useAppSelector((state) => state.language.lang);
  // skeleton loader here
  if (isLoading) return <Skeleton />;

  if (!posts || posts.length === 0)
    return <p className="p-4">{translations[lang].noPosts}</p>;

  const usersMap = new Map(users?.map((u) => [u.id, u]) ?? []);

  const uniquePosts = posts.slice(0, users?.length ?? 10).map((p, idx) => ({
    ...p,
    userId: users?.[idx]?.id ?? p.userId,
  }));

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="px-4 lg:px-16 py-10">
        {/* news main title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#006fac] dark:text-white">
          {translations[lang]?.latestNews}
        </h2>
        {/* news card information */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-2">
          {uniquePosts.map((post) => {
            const author = usersMap.get(post?.userId);
            return (
              <NewsCard key={post?.id} post={post} author={author} lang={lang} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
