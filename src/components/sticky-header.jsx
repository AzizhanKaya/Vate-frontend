import { SubPostContext } from '../contexts/sub-post';
import { useContext } from 'react';
import { nthPost } from '../utils/encoder';

export default function StickyHeader({title}){
    const { subPost , setSubPost } = useContext(SubPostContext);

    function handleGoBack() {
        
        if (!subPost.post){
            setSubPost(null);
            return;
        }

        setSubPost(prevSubPost => {
            let copy_sub_post = {...prevSubPost};
            let last_sub_post = nthPost(copy_sub_post,-2);
            last_sub_post.post = undefined;
            return copy_sub_post;
        });
    }

    return (
        <header className="sticky top-0 z-30 bg-black/[0.60] backdrop-blur-sm border-b border-[#2f3336] flex items-center">
            {subPost && (<div className="rounded-full  ml-2 -mr-2 p-1 hover:bg-[#eff3f41a] flex items-center justify-center" onClick={() => handleGoBack()}>
                <svg viewBox="0 0 512 512" className="w-8 h-8" fill="#fff">
                    <polyline points="244 400 100 256 244 112" style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeLinecap: 'square', strokeMiterlimit: 10, strokeWidth: 24 }} />
                    <line x1="120" y1="256" x2="412" y2="256" style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeLinecap: 'square', strokeMiterlimit: 10, strokeWidth: 24 }} />
                </svg>
            </div>
            )}
            <h3 className="px-4 h-[3.13rem] text-xl font-bold flex items-center my-1">
                {title}
            </h3>
            
        </header>
    )
}

