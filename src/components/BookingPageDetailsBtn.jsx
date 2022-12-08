import React, {useState} from 'react';

function BookingPageDetailsBtn({clicked,setClicked}) {



    const displayBtnText = () => {
        if(clicked){
            return "Show"
        }
        if(!clicked){
            return "Hide"
        }
    }

    return (
        <div>
            <button onClick={!clicked ? () => setClicked(true) : () => setClicked(false) }>
                {displayBtnText()}
            </button>
        </div>
    );
}

export default BookingPageDetailsBtn;