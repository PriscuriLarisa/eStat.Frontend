export interface IPaginatorProps {
    maxNumberOfPages: number
    updatePageNumber: (currentPage: number) => void
}