import { SmallButton } from ".";


const Pagination = ({pagination, onPaginationChange}) => {
    const {current, pageSize, total} = pagination;

    // Make pagination like this: 1 2 3 4 5 ... 10
    const totalPages = Math.ceil(total / pageSize);
    const lastPage = totalPages;
    console.log('lastPage', lastPage)
    const pages = [];
    for (let i = current; i < Math.min(current+2, totalPages); i++) {
        pages.push(i);
    }

    const handlePaginationClick = (e)=>{
        const current = e.target.dataset.page;
        onPaginationChange({current, pageSize, total});
    }

    return (
        <div>
            <SmallButton data-page={current-1} onClick={handlePaginationClick} >Prev</SmallButton>
            {pages.map(page => (
                <SmallButton key={page} fill={page === current} data-page={page} onClick={handlePaginationClick}>{page}</SmallButton>
            ))}
            {current + 2 < lastPage && <span>...</span>}
            <SmallButton data-page={lastPage} onClick={handlePaginationClick} >{lastPage}</SmallButton>
            <SmallButton data-page={current+1} onClick={handlePaginationClick} >Next</SmallButton>
        </div>
    )
}

export default Pagination;