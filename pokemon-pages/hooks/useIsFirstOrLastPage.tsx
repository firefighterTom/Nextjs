export function useIsFirstOrLastPage(pageNumber: number) {
	const fisrtPage = 1;
	const lastPage = 19;
	const checkingIsItLastPageOrFirstPage = {
		firstPage: false,
		lastPage: false,
	};
	if (fisrtPage === pageNumber) {
		return { ...checkingIsItLastPageOrFirstPage, firstPage: true };
	}
	if (lastPage === pageNumber) {
		return { ...checkingIsItLastPageOrFirstPage, lastPage: true };
	}
	return checkingIsItLastPageOrFirstPage;
}
