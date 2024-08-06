'use client';

const ErrorPage = () => (
	<div className="mx-auto flex max-w-screen-sm grow flex-col justify-center gap-4 p-6 text-center">
		<h2 className="text-8xl">500</h2>
		<h3 className="text-4xl">Oops, there was an error</h3>
		<p className="text-blueGray">An unexpected error ocurred.</p>
	</div>
);

export default ErrorPage;
