import Link from "next/link";

export const BlogCard = ({ title, date, description, imageUrl, slug }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm text-gray-600">{date}</p>
        <p className="mb-4 text-gray-700">
          {description.split(" ").slice(0, 25).join(" ")}
          {description.split(" ").length > 25 && " ..."}
        </p>
        <Link className="text-blue-500 hover:underline" href={`/blogs/${slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};
