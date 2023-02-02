import { ImageDefinitionParams } from './iconAsDataURI';

export function iconAsSvg({ color, size, h = 50, w = 50, icon }: ImageDefinitionParams) {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix={icon.prefix}
			data-icon={icon.iconName}
			className={`svg-inline--fa fa-${icon.iconName} fa-${size}`}
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 384 512"
			width={w}
			height={h}
			color={color}
		>
			{Array.isArray(icon.icon[4]) ? (
				icon.icon[4].map(path => <path fill="currentcolor" d={path}></path>)
			) : (
				<path fill="currentcolor" d={icon.icon[4]}></path>
			)}
		</svg>
	);
}
