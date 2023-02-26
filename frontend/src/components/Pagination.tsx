import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function PaginatedItems({ items, currentItems, setCurrentItems }: { items: Array<any>; currentItems: Array<object>; setCurrentItems: React.Dispatch<React.SetStateAction<Array<any>>> }) {
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        //@ts-ignore
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    const pageNum = 'py-2 px-4 cursor-pointer border-[3px] font-normal hover:bg-[#5AB1BB] hover:text-white';
    const pageContainer = 'mt-10 list-none flex justify-center items-center mb-[5rem] text-[1.2rem] gap-1';
    const pageActive = 'bg-[#5AB1BB]';
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                //@ts-ignore
                renderOnZeroPageCount={null}
                containerClassName={pageContainer}
                pageLinkClassName={pageNum}
                previousLinkClassName={pageNum}
                nextLinkClassName={pageNum}
                activeLinkClassName={pageActive}
            />
        </>
    );
}

export default PaginatedItems;
