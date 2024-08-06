import { Clipboard, RefreshCw, ServerCrash } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import log from 'electron-log/renderer';

import PageBackground from './assets/background.png';
import TextButton from './components/styled/TextButton';

type State = {
	didCatch?: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
};

type Props = {
	children: ReactNode;
};

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		log.error('Client crash:', error, errorInfo);
		this.setState({ didCatch: true, error, errorInfo });
	}

	render() {
		if (!this.state.didCatch) return this.props.children;
		const { error, errorInfo } = this.state;
		const title = `Uncaught ${error?.name}: ${
			error?.message ?? 'Unknown error'
		}`;
		const detail = errorInfo?.componentStack.slice(1);
		return (
			<div
				className="relative flex h-screen w-screen grow flex-col overflow-hidden border border-blueGray/10 bg-cover bg-top bg-no-repeat p-3"
				style={{ backgroundImage: `url(${PageBackground})` }}
			>
				<div className="tw-surface flex grow flex-col gap-3">
					<div className="flex items-center gap-2">
						<ServerCrash size={26} className="text-red" />
						<h3 className="text-red">Something went wrong!</h3>
					</div>
					<hr />
					<div className="text-white">{title}</div>
					<pre className="s1 -mt-2 grow overflow-auto text-blueGray">
						{detail}
					</pre>
					<hr />
					<div className="-mx-3 -mb-3 flex justify-end gap-2">
						<TextButton
							icon={Clipboard}
							onClick={() =>
								navigator.clipboard.writeText(
									`\`\`\`\n${title}\n${detail}\n\`\`\``
								)
							}
						>
							Copy error
						</TextButton>
						<TextButton
							icon={RefreshCw}
							onClick={() => window.location.reload()}
							className="text-warmGreen"
						>
							Reload
						</TextButton>
					</div>
				</div>
			</div>
		);
	}
}

export default ErrorBoundary;
