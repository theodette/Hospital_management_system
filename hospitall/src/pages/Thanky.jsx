import React from 'react';

function Thanky() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className='bg-[#030A47] h-96  flex justify-around p-14 w-96 rounded-3xl'>
                <h1 className="text-3xl font-bold p-e text-center text-gray-100">
                    Thank you! Your appointment has been booked successfully. we will send you an email of confrimation
                </h1>
                <button>Back</button>
            </div>
            
        </div>
    );
}

export default Thanky;
