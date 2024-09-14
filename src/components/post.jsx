import '../assets/css/border.css';

export default function Post({ post }) {
    
    if (!post || !post.account || !post.content.message) {
      return;
    }
  
    return (
      
      <div className="px-4 py-3 gap-3 border border-[#2f3336] flex rounded-xl mx-5 my-3 relative bg-black cool-border">
        <img src={post.account.img} className="w-10 h-10 rounded-full object-cover" alt="" />
        <div className="flex-1 w-[90%] overflow-x-hidden">
            <header className="leading-5 flex gap-2 items-center mb-0.5">
                <a href={`/${post.account.name}`} className="hover:underline font-bold">
                    {post.account.name}
                </a>
                <div className="text-[#585858] flex items-center gap-1.5">
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis w-[150px]">
                        @{post.account.pub_key}
                    </div>
                    <div>‧</div>
                    <div>{post.time}</div>
                </div>
            </header>
              <div className="break-words hyphens-manual" dangerouslySetInnerHTML={{ __html: post.content.message }}></div>
        </div>
        
      </div>
      
    );
  }