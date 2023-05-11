import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import FieldsList from './FieldsList';
import MyAccordionSummary from './MyAccordionSummary';

type OnFieldClick = (name: string) => () => void;
type IsSelected = (name: string) => boolean;

const ViewList: React.FC<{ viewSections: KonectyClient.ViewSection[] }> = ({ viewSections }) => {
	const [selected, setSelected] = useState<string[]>([]);

	const onFieldClick = useCallback<OnFieldClick>(
		name => () => {
			setSelected(selecteds => xor(selecteds, [name]));
		},
		[setSelected],
	);

	const isSelected = useCallback<IsSelected>(name => selected.includes(name), [selected]);

	const selectedFields = useMemo(
		() =>
			viewSections.reduce<KonectyClient.ViewField[]>((acc, { fields }) => {
				const selectedFields = fields.filter(f => isSelected(f.name));
				return selectedFields.length ? acc.concat(selectedFields) : acc;
			}, []),
		[selected],
	);

	return (
		<Fragment>
			<FieldSection icon="star" label="Selecionados" fields={selectedFields} {...{ onFieldClick, isSelected }} />
			{viewSections.map(section => (
				<FieldSection {...section} {...{ onFieldClick, isSelected }} />
			))}
		</Fragment>
	);
};

const FieldSection: React.FC<KonectyClient.ViewSection & { onFieldClick: OnFieldClick; isSelected: IsSelected }> = ({
	icon,
	label,
	fields,
	isSelected,
	onFieldClick,
}) => (
	<Accordion elevation={0} square disableGutters sx={{ paddingBottom: 2 }} key={label}>
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
);

export default ViewList;
