import React from 'react';

const AppWrap = (Component) =>
	function () {
		return (
			<div className="mx-0 md:mx-12 lg:mx-48 2xl:mx-96 3xl:mx-128">
				<Component />
			</div>
		);
	};

export default AppWrap;
