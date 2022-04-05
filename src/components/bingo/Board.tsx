import { connect } from "react-redux";
import Cell from "./Cell";
import "./Board.css"
import { useEffect, useRef, useState } from "react";
function Board(props: any) {
    const [wonCell, setWonCell] = useState<string[]>([]) // save the sequence that won before (to not duplicate Bingo)
    const [wonBingo, setWonBingo] = useState(0)
    const [animated, setAnimated] = useState(false)
    const initialRender = useRef(true)
    const content = useRef(shuffle(['Let me share my screen with you.', 'I’m going to pull up my presentation.', 'Could you speak more slowly, please', 'Could you repeat that last bit, please?', 'Sorry, would you mind if I asked a question?', 'Just to clarify are you saying that…', 'Can I stop you for just one minute, please?', 'I am having trouble hearing you.', 'The screen is blank.', 'You’re breaking up a little bit.', 'There’s a bit of an echo on the line.', 'Let’s move on to the next item', 'In summary, we’re going to…', 'I think this is a good place to leave things', 'Welcome, everyone. This is our agenda. ', 'Are we good to go?', 'Ok, let’s kick off.', 'Is everybody ready to start?', 'I didn’t get that', 'Let’s pencil in another meeting for next Wednesday.', 'What have we done so far? ', 'What have we covered so far? ', 'Do you want me to make it bigger?', 'Welcome, everyone. Today’s meeting is about…', 'Let’s get the ball rolling', 'Could you repeat that again?', 'The screen is frozen', 'Thank you all for attending', 'Welcome', 'Bye']))
    const size = 5; // e.g. 5 means 5 x 5
    function shuffle(array:any) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
    useEffect(() => {
        checkBingo()
    }, [props.marked])
    useEffect(() => {
        if(!initialRender.current) {
            setAnimated(true)
            const timer = setTimeout(()=>{
                setAnimated(false)
            }, 2000)
            return() => {
                clearTimeout(timer)
            }
        }
    }, [wonBingo])
    function checkBingo() {
        let bingo = true;
        for(let i = 0; i < size; i++) { // check horizontal
            bingo = true
            const nums:number[] = [];
            for(let j = 0; j < size; j++) {
                const num:number = i * size + 1 + j
                nums.push(num)
                if(props.marked.find((element:number) => element === num) === undefined) { // if number not selected
                    bingo = false
                    break
                }
            }
            if(bingo) {
                if(wonCell.find((element:any) => element === nums.join("-")) !== undefined) // check if won in previous bingos
                {
                    bingo = false;
                }
                if(bingo) {
                    setWonCell((preState:any) => {
                        return [...preState, nums.join("-")]
                    })
                    break;
                }
            }
        }
        if(!bingo) {  // check vertical
            for(let i = 0; i < size; i++) {
                bingo = true;
                const nums:number[] = [];
                for(let j = 0; j < size; j++) {
                    const num = j * size + 1 + i
                    nums.push(num)
                    if(props.marked.find((element:number) => element === num) === undefined) {
                        bingo = false
                        break
                    }
                }
                if(bingo) {
                    if(wonCell.find((element:any) => element === nums.join("-")) !== undefined) // check if won in previous bingos
                    {
                        bingo = false;
                    }
                    if(bingo) {
                        setWonCell((preState:any) => {
                            return [...preState, nums.join("-")]
                        })
                        break;
                    }
                }
            }
        }
        if(!bingo) {  // check diagonal
            for(let i = 0; i < 2; i++) {
                bingo = true;
                const nums:number[] = [];
                for(let j = 0; j < size; j++) {
                    let num=0
                    if(i===0) {
                        num = j * size + 1 + j
                    } else {
                        num = (i + j) * size - j
                    }
                    nums.push(num)
                    if(props.marked.find((element:number) => element === num) === undefined) {
                        bingo = false
                        break
                    }
                }
                if(bingo) {
                    if(wonCell.find((element:any) => element === nums.join("-")) !== undefined) // check if won in previous bingos
                    {
                        bingo = false;
                    }
                    if(bingo) {
                        setWonCell((preState:any) => {
                            return [...preState, nums.join("-")]
                        })
                        break;
                    }
                }
            }
        }
        if(bingo) {
            initialRender.current = false;
            setWonBingo(wonBingo+1)
        }
    }
    const div:any[] = [];
    for(let i = 0; i < size; i++) {
        const el = [...Array(5)].map((value, index) => {
            return <Cell key={index+1+i*size} content={content.current[index+1+i*size]} number={index+1+i*size} size={size} />
        })
        div.push(<div key={i * 10} className="main-row">{el}</div>)
    }
    return(
        <>
            <div className="bingo-info" id={(animated?"win":"")}><span>🏆 You Won {wonBingo}</span></div>
            <div id="main">
                {div}
            </div>
        </>
    )
}
function mapStateToProps(state: any) {
    return {marked: state.marked}
}
export default connect(mapStateToProps)(Board)