import { Button } from '../../../components/common/Button';

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <Button
                variant="outline"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
            >
                Prev
            </Button>

            <span>Page {currentPage + 1} / {totalPages}</span>

            <Button
                variant="outline"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
            >
                Next
            </Button>
        </div>
    );
}