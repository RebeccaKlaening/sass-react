import React, { useEffect, useState } from "react"
import Icon from '@mdi/react';
import { mdiClose, mdiCheckboxBlankCircleOutline, mdiRefresh } from '@mdi/js';


function Box() {
    const [moveCount, setMoveCount] = useState(0);
    // Keeps track of how the game looks at any given time.
    const [board, setBoard] = useState({
        boxes: {}
    });
    
    // Runs once when the app gets loaded
    // and prepares everything by setting all the boxes
    // to unchecked.
    useEffect(() => {
        resetBoard();
    }, []);


    const handleClick = id =>  {
        const new_board = { ...board };
        const box = new_board.boxes[id];

        if (box.checked) {
            return;
        }

        box.checked = true;

        if (moveCount % 2 !== 0) {
            box.isCross = true;
        } else {
            box.isCross = false;
        }
    
        setBoard(new_board);

        const count = moveCount + 1;
        setMoveCount(count); 
    }

    const resetBoard = () => {
        let temporary = {};

        for (let i = 0; i < 9; i++) {
            temporary[i] = { id: i, checked: false, isCross: false };
        }

        setBoard({ boxes: temporary })
        setMoveCount(0);
    }

    const boxes = Object.values(board.boxes);
    const elements = boxes.map((box, i) => {
        // Variables here
        let icon = <Icon path={mdiClose} className="close-icon"/>

        if (!box.isCross) {
            icon = <Icon path={mdiCheckboxBlankCircleOutline} className="circle-icon"/>
        }

        return <div className="check-boxes" key={i} onClick={() => handleClick(i)}>
            {box.checked == true &&
                icon
            }
        </div> 
    })

    return (
        <>
            <header>Becca's Game</header>

            <div className="Box">
                <div className="box-container">
                    <div className="check-box-holder">
                        { elements }
                    </div>
                </div>
            </div>

            <div className='button-container'>
                <button onClick={ () => resetBoard() } className='reset-button'>
                    <Icon path={ mdiRefresh }/>
                    Reset
                </button>
            </div>
        </>
    )
}

export default Box