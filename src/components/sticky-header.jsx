export default function StickyHeader({title}){

    return(

        <header className="sticky top-0 z-10 bg-black/[0.50] backdrop-blur-sm border-b border-[#2f3336]">
            <h3 className="px-4 h-[3.13rem] text-xl font-bold flex items-center my-1">
                {title}
            </h3>
            
        </header>
    )
}

