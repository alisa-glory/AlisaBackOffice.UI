export interface TableDataParams{
    page: number;
    itemsPerPage: number;
    searchText: string;
    selectedColumns: string[];
    sortByField: string;
    sortByOrder: string;
}