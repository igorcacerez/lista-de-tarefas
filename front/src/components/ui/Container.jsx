import {Footer} from "../footer/Footer";

export function Container({login = false, children}) {
    if(login) {
        return (
            <main className="main-content mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <div className="container-fluid py-4">
                {children}
                <Footer />
            </div>
        </main>
    )
}