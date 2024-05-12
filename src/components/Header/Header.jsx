import ProfilePic from "/logoOrg.png"

function Header () {

    return (
        <div className="w-full h-[10rem] bg bg-[#243e36] text-white flex items-start justify-between pl-8 pt-8 md:h-[30vh]">
            <div className="md:w-[50vw] md:h-[15rem] flex items-end">
                {/* <p className="md:text-3xl">Hello again, <br />Thomas</p> */}
            </div>            
            <div className="w-[3rem] h-[3rem] md:w-[15rem] md:h-[15rem]">
                {/* <img src={ProfilePic} alt="" /> */}
            </div>
            <i className="fa-solid fa-bars text-4xl mr-8"></i>
        </div>
    )
}

export default Header;