'use client';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function SectionWrapper({ children }) {

	const [parent, enableAnimations] = useAutoAnimate();

	return (
		<div ref={parent}>
			{children}
		</div>
	)
}