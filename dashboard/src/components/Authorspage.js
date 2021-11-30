import React from 'react'

import "./Authorspage.css";
const Authorspage = () => {
    return (
        
        <div className={'authorspage'}>
            <h1 id={'mainh1'}>About the Authors</h1>
            <div id={'authorcontainer'}>
                <section className={'authorbox'}>
                    <h2>Xavier Reed</h2>
                    
                    <p>
                        Descrption about said person
                    </p>
                    <div className={'photoguy'}><img alt="photoguy"></img></div>
                </section>
                <section className={'authorbox'}>
                    <h2>Austin Britton</h2>
                  
                    <p>
                        Computer Science Major with a passion for programming. 
                        Focused on AI/ML in the area of game theory / decision making in games without perfect imformation
                    </p>
                    <div className={'photoguy'}><img alt="photoguy"></img></div>
                </section>
            </div>
        
        
        </div>
        
    )
}

export default Authorspage
