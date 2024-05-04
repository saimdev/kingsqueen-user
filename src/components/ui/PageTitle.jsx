

const PageTitle = ({ children }) => {
    return (
        <div className="customerServiceHeader flex justify-between py-2 pageContent border-b">
            <h1 className="uppercase font-semibold text-lg">{children}</h1>
        </div>
    )
}

export default PageTitle