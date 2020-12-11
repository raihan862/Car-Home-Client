import React from 'react';

const Pagination = ({handlePage,pageNumbers}) => {
    return (
        <div  className="text-xs-center">
                <ul className='pagination justify-content-center pagination-lg'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item' style={{textAlign:"center",padding:"3px" }}>
                            <a onClick={() => handlePage(number)} href='#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            
        </div>
    );
};

export default Pagination;