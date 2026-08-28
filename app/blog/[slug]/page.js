import Link from 'next/link';
import { blogsData } from '@/data/blogs';
import { notFound } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Article Content */}
      <main className="flex-grow py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Back Link */}
          <div>
            <Link 
              href="/blog" 
              className="text-sm font-semibold text-gray-400 hover:text-[#B8F000] transition inline-flex items-center gap-1.5"
            >
              ← Back to Blogs
            </Link>
          </div>

          {/* Article Header */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {blog.title.split(' ')[0]} <span className="text-[#B8F000]">{blog.title.split(' ').slice(1).join(' ')}</span>
            </h1>
          </div>

          {/* Article Content with HTML links */}
          <div 
            className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
            <Link 
              href="/blog" 
              className="px-6 py-3 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition text-sm shadow-lg shadow-[#B8F000]/20"
            >
              Explore More Articles
            </Link>
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}