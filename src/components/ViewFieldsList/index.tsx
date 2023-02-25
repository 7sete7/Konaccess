import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useState } from 'react';
import { ViewSection } from '../../DAL/Modules';
import FieldsList from './FieldsList';
import MyAccordionSummary from './MyAccordionSummary';

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
				<Accordion elevation={0} square disableGutters sx={{ paddingBottom: 2 }}>
					<MyAccordionSummary>
						<Stack direction="row" spacing={3}>
							<Typography color="primary.main" aria-hidden="true">
								<i className={`icon-${icon}`} />
							</Typography>
							<Typography color="primary.main">{label}</Typography>
						</Stack>
					</MyAccordionSummary>
					<AccordionDetails>
						<Box pl={3}>
							<FieldsList {...{ fields, onFieldClick, isSelected }} />
						</Box>
					</AccordionDetails>
				</Accordion>
			))}
		</Fragment>
	);
};

export default ViewList;
