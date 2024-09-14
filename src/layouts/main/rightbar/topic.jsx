import { Link } from "react-router-dom";

export default function Topic({item}){


    return(
    <Link
    to='/'
    className="py-3 px-4 hover:bg-[#eff3f41a] transition-colors border-t-2 border-[#2f3336] overflow-hidden"
    >
        
        <div className="text-[16px] font-bold">
            {item.title}
        </div>

        {item?.posts && (
            <div className="text-[13px] text-[#71767b]">
                {item.posts} posts
            </div>
        )}
    </Link>
    )
}