import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getModuleViewFor } from '../../DAL/Modules';
import { AppContext } from '../../context';
import FieldsList from './FieldsList';
import MyAccordionSummary from './MyAccordionSummary';

type OnFieldClick = (name: string) => () => void;
type IsSelected = (name: string) => boolean;

interface ViewListProps {
	selected: string[];
	onSelectedChanged: (newSelecteds: string[]) => void;
}

const ViewList: React.FC<ViewListProps> = ({ selected, onSelectedChanged }) => {
	const [{ module }] = useContext(AppContext);
	const [viewSections, setViewSections] = useState<KonectyClient.ViewSection[]>([]);

	const onFieldClick = useCallback<OnFieldClick>(
		name => () => {
			const newValue = xor(selected, [name]);
			onSelectedChanged(newValue);
		},
		[selected],
	);

	const isSelected = useCallback<IsSelected>(name => selected.includes(name), [selected]);

	useEffect(() => {
		if (module != null) {
			getModuleViewFor(module).then(setViewSections);
		}
	}, [module]);

	const selectedFields = useMemo(() => {
		if (viewSections.length === 0) return [];

		return viewSections.reduce<KonectyClient.ViewField[]>((acc, { fields }) => {
			const selectedFields = fields.filter(f => isSelected(f.name));
			return selectedFields.length ? acc.concat(selectedFields) : acc;
		}, []);
	}, [selected, viewSections]);

	return (
		<Fragment>
			<FieldSection icon="star" label="Selecionados" fields={selectedFields} {...{ onFieldClick, isSelected }} />
			{viewSections.map(section => (
				<FieldSection key={section.label} {...section} {...{ onFieldClick, isSelected }} />
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
