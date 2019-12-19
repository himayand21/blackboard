import React from 'react';

export const MainComponent = (props) => {
	const {boards} = props;
	return (
        <main>
            {boards.map(each => (
                <div>
                    {each.name}
                </div>
            ))}
        </main>
	)
};