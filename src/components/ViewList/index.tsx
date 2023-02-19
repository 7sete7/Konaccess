import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useState } from 'react';
import { ViewSection } from '../../DAL/Modules';
import FieldsList from './FieldsList';

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronRight} />} {...props} />
))(({ theme }) => ({
	border: 0,
	borderBottom: `2px solid ${theme.palette.primary.main}`,
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
}));

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
					<AccordionSummary>
						<Stack direction="row" spacing={3}>
							<Typography color="primary.main">{label}</Typography>
						</Stack>
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
