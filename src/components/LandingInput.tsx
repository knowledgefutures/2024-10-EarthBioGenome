import { Input } from './ui/input';

const LandingInput = () => {
	return (
		<Input
			className="text-base md:text-xl py-8 bg-white/80"
			placeholder="Search by species, project, or author..."
			onKeyDown={(evt) => {
				if (evt.key === 'Enter') {
					const target = evt.target as HTMLInputElement;
					window.location.href = `/explore?q=${target.value}`;
				}
			}}
		/>
	);
};

export default LandingInput;
