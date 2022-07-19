import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({children}) {
    return (
        <div id={"app"} style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}