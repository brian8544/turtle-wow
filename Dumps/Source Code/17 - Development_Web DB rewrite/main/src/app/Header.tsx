import TextButton from '~/components/styled/TextButton';
import HeaderSearch from '~/components/HeaderSearch';

const Header = () => (
	<header className="flex max-w-screen-xl flex-col justify-between gap-3 p-2 md:flex-row md:items-center md:px-6 md:py-2 xl:mx-auto xl:w-full">
		<div className="flex flex-row gap-3">
			<TextButton type="link" href="/" className="shrink-0 uppercase">
				<span className="tw-color hidden font-fontin text-4xl text-inherit md:inline">
					Turtle Database
				</span>
				<span className="tw-color font-fontin text-4xl text-inherit md:hidden">
					TurtleDB
				</span>
			</TextButton>
		</div>

		<HeaderSearch />
	</header>
);

export default Header;
