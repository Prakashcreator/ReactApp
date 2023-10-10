import React from "react"

const Header = ({title}) => {
    return (
        <header>
            <h1>
                {title}
            </h1>
        </header>       
    )
}

//default props
Header.defaultProps = {
    title : "To do List"
}
export default Header