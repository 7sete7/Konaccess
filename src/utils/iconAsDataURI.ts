import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

interface ImageDefinitionParams {
	color: string;
	w?: number;
	h?: number;
	size: SizeProp;
	icon: IconDefinition;
}

export default ({ color, size, h = 50, w = 50, icon }: ImageDefinitionParams) => {
	const svg = `
        <svg 
            aria-hidden="true" 
            focusable="false" 
            data-prefix="${icon.prefix}" 
            data-icon="${icon.iconName}" 
            class="svg-inline--fa fa-${icon.iconName} fa-${size} " 
            role="img" xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 384 512" 
            width="${w}" 
            height="${h}" 
            color="${color}">
    
        <path fill='currentcolor' d='${icon.icon[4]}'></path>
    </svg>`;

	return `data:image/svg+xml;base64,${btoa(svg)}`;
};
