import Link from 'next/link';
import { blogsData } from '@/data/blogs'; 

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D12] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            VibeShort <span className="text-[#B8F000]">Blog</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Insights, updates, and deep dives into AI-powered short dramas, mobile streaming trends, and app guides.
          </p>
        </div>

        {/* Horizontal Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <article 
              key={blog.slug}
              className="p-6 rounded-2xl bg-[#121218] border border-white/10 hover:border-[#B8F000]/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-[#B8F000] transition line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {blog.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#B8F000] hover:underline"
                >
                  Read Full Blog →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}