import React, {useEffect} from "react";

export const ListOptions = (props) => {
    const {
        lists,
        switchToMainMenu,
        moveTo
    } = props;

    useEffect(() => () => switchToMainMenu(), []);
    return (
        <div className="list-options">
            <header>Lists</header>
            {lists.map(list => (
                <button
                    key={`list-option-${list.id}`}
                    onClick={() => moveTo(list.id)}
                >
                    {list.name}
                </button>
            ))}
        </div>
    )
}