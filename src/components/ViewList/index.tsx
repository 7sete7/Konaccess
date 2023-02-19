import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useState } from 'react';
import { ViewSection } from '../../DAL/Modules';
import FieldsList from './FieldsList';

const ViewList: React.FC<{ viewSections: ViewSection[] }> = ({ viewSections }) => {
	const [selected, setSelected] = useState<string[]>([]);

	const onFieldClick = useCallback(
		(name: string) => () => {
			setSelected(selecteds => xor(selecteds, [name]));
		},
		[setSelected],
	);

	const isSelected = useCallback((name: string) => selected.includes(name), [selected]);

	return (
		<Fragment>
			{viewSections.map(({ label, icon, fields }) => (
				<Accordion>
					<AccordionSummary>
						<Typography>{label}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box pl={5}>
							<FieldsList {...{ fields, onFieldClick, isSelected }} />
						</Box>
					</AccordionDetails>
				</Accordion>
			))}
		</Fragment>
	);
};

export default ViewList;
