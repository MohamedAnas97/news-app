import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetPostByIdQuery,
  useGetUsersQuery,
} from "../../features/news/newsApi";
import { useAppSelector } from "../../app/hooks";
import { translations } from "../../language/translations";
import type { Lang } from "../../language/translations";
import { translateToArabic } from "../../utils/translate";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";
import Skeleton from "../../shared/skeleton/Skeleton2";
// capitalize each word
const capitalizeEachWord = (text: string) =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());
export default function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const lang = useAppSelector((state) => state.language.lang) as Lang;
  const theme = useAppSelector((state) => state.theme.mode);

  const { data: post, isLoading: postLoading } = useGetPostByIdQuery(
    Number(id),
    { skip: !id }
  );
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const usersMap = users ? new Map(users.map((u) => [u.id, u])) : new Map();
  // override post for unique author
  const uniquePost =
    post && users
      ? { ...post, userId: users[(post.id - 1) % users.length].id }
      : post;

  const author = uniquePost ? usersMap.get(uniquePost.userId) : undefined;
  const isPageLoading = postLoading || usersLoading;

  useEffect(() => {
    if (!post) return;
    let active = true;
    const run = async () => {
      if (lang === "ar") {
        const [tTitle, tBody] = await Promise.all([
          translateToArabic(post.title),
          translateToArabic(post.body),
        ]);
        if (active) {
          setTitle(tTitle);
          setBody(tBody);
        }
      } else {
        setTitle(post.title);
        setBody(post.body);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [post, lang]);

  if (isPageLoading) {
    return (
      // skeleton loader here
      <div className="px-4 lg:px-16 py-8">
        <Skeleton />
      </div>
    );
  }

  if (!post || !author) {
    return <p className="p-4">{translations[lang].loading}</p>;
  }
  return (
    <div className="px-4 lg:px-16 py-8 font-sans">
      <nav className="text-sm mb-4 flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FaHome /> {translations[lang].home}
        </Link>
        <span> &gt; </span>
        <span className="font-medium truncate">
          {capitalizeEachWord(title)}
        </span>
      </nav>
      {/* news post Image */}
      <div className="overflow-hidden rounded-lg mb-6 shadow-md">
        <img
          src={`https://picsum.photos/800/400?random=${post.id}`}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/800x400";
          }}
          alt="Post"
          className="w-full h-[350px] object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {/* news title */}
      <h1
        className="text-xl lg:text-3xl font-bold mb-6"
        style={{ color: theme === "dark" ? "white" : "#006fac" }}
      >
        {capitalizeEachWord(title)}
      </h1>
      {/* news description */}
      <p className="text-[#121212] dark:text-gray-300 mb-8 text-md font-medium leading-relaxed">
        {body.charAt(0).toUpperCase() + body.slice(1)}
      </p>
      {/* author more information */}
      <div className="bg-[#46ebae26] dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <p className="flex items-baseline gap-1 text-gray-700 dark:text-gray-300">
            <FaUser /> {translations[lang].author}:{" "}
            <span className="font-semibold">{author.name}</span>
          </p>
          <p className="flex items-center gap-1  text-gray-700 dark:text-gray-300">
            <FaEnvelope /> {translations[lang].email ?? "Email"}:{" "}
            <span className="font-medium">{author.email}</span>
          </p>
          <p className="flex items-baseline gap-1 text-gray-700 dark:text-gray-300">
            <FaBuilding /> {translations[lang].company ?? "Company"}:{" "}
            <span className="font-medium">{author.company.name}</span>
          </p>
          <p className="flex items-baseline gap-1 text-gray-700 dark:text-gray-300">
            <FaGlobe /> {translations[lang].website ?? "Website"}:{" "}
            <span className="font-medium">{author.website}</span>
          </p>
          <p className="flex items-baseline gap-1 text-gray-700 dark:text-gray-300">
            <FaMapMarkerAlt /> {translations[lang].address ?? "Address"}:{" "}
            <span className="font-medium">
              {author.address.suite}, {author.address.street},{" "}
              {author.address.city}, {author.address.zipcode}
            </span>
          </p>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden shadow-md">
          <iframe
            title="author-location"
            className="w-full h-48 lg:h-full rounded-lg"
            src={`https://maps.google.com/maps?q=${author.address.geo.lat},${author.address.geo.lng}&z=15&output=embed`}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
