import IconSpinner from '../styled/IconSpinner';

const NewsTab = () => (
	<div className="tw-surface flex min-h-0 flex-grow flex-col gap-3">
		<h4 className="tw-color">News</h4>
		<hr />
		<div className="flex flex-grow flex-col items-center justify-center gap-2">
			<IconSpinner className="text-blueGray" />
			<p className="italic text-blueGray">Loading news...</p>
		</div>
	</div>
);

export default NewsTab;
