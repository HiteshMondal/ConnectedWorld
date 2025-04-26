import { useState } from "react";
import { Link } from "react-router";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav>
            <div>
                <div>
                    <Link to={"/"}> 
                        connected<span>.world</span>
                    </Link>

                    {/*Desktop Mode*/}
                    <div>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/create"}>Create Post</Link>
                        <Link to={"/communities"}>Communities</Link>
                        <Link to={"/community/create"}>Create Community</Link>
                    </div>

                    {/*Mobile Mode*/}
                    {menuOpen && (
                    <div>
                        <div>
                            <Link to={"/"}>Home</Link>
                            <Link to={"/create"}>Create Post</Link>
                            <Link to={"/communities"}>Communities</Link>
                            <Link to={"/community/create"}>Create Community</Link>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </nav>
    );    
};