import MyHeader from "../common/header/header"
import Footer from "../common/my-footer"
interface IPageWrapper {
    hideHeader?: boolean
    hideFooter?: boolean
    children: React.ReactNode
}

export default function PageWrapper({ children, hideHeader = false, hideFooter = false }: IPageWrapper) {
    return (
        <div>
            {!hideHeader && <MyHeader />}
            <div>{children}</div>
            {!hideFooter && <Footer />}
        </div>
    )
}
