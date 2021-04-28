export const helperPagination = (currentPage?: number) => {

    let page;
    if (!currentPage) page = 0;
    if (currentPage === 0 || currentPage === 1) page = 0;
    if (currentPage > 1) page = currentPage - 1;
    let offset;
    if (!currentPage) offset = 0;
    if (page === 0) offset = 0;
    if (page === 1) offset = 10
    if (page > 1) offset = (currentPage - 1) * 10
    return {
        page,
        offset
    }
}