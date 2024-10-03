export default function Post(){


    return(
    <div>
    <div className="font-[Vate] text-[20px] text-center w-full">
        Son bir adım!
    </div>
    <div className="w-[500px] border-t-2 border-[#2f3336]">
        <div className="px-4 pt-3 gap-3 border border-[#2f3336] flex rounded-xl my-3 bg-[#0a0a0a] w-full">
            <img src="https://pbs.twimg.com/profile_images/1637771089840422912/LES2dp5X_400x400.jpg" className="w-10 h-10 rounded-full object-cover" alt="" />
            <div>
                <header className="leading-5 flex gap-2 items-center mb-0.5">
                    <a className="hover:underline font-bold cursor-pointer">
                        Aziz
                    </a>
                    <div className="text-[#585858] flex items-center gap-1.5">
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis w-[150px]">
                            @yc98emkdfX7zLEr+KmJ654dj4Fmy5SzKjuPJV06xtgA=
                        </div>
                        <div>‧</div>
                        <div>1231242323</div>
                    </div>
                    
                    
                    
                </header>

                <div className="py-3 w-[400px] h-[200px] mb-3">
        
                    <textarea
                        className="w-full h-full bg-[#0a0a0a] text-white border text-[16px] border-[#2f3336] rounded p-2 focus:outline-none resize-none srollbar-hidden"
                        style={{ scrollbarWidth: 'none' }}
                        placeholder="What's going on..."
                        maxLength={130}
                    />
                    

                </div>
            </div>
      </div>
    </div>
    </div>
    )
}