
export function Counter({count, onClick, logo}) {

    //count = Math.floor(count)
    return(
        <div className="ClickArea">
            <img 
                className="ClickButton App-logo" 
                src={logo} alt="ClickButton" 
                onClick={onClick} 
                
            />
            <h2 style={{textAlign :"center"}}>Clicks:</h2>
            <h2 style={{textAlign :"center"}}>{count}</h2>
        </div>
        
    )
}