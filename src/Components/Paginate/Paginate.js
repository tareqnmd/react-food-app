import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate = ({ perPage, total, paginate,currentPage }) => {
    let active = currentPage;
    let items = [];
    for (let number = 1; number <= Math.ceil(total / perPage); number++) {
        items.push(
            <Pagination.Item onClick={()=>paginate(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );
    return (
        <div>
            {paginationBasic}
        </div>
    );
};

export default Paginate;
