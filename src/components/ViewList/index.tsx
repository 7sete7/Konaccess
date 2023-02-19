import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/system/useTheme';
import xor from 'lodash/xor';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ViewSection } from '../../DAL/Modules';
import FieldsList from './FieldsList';
import MyAccordionSummary from './MyAccordionSummary';

const ViewList: React.FC<{ viewSections: ViewSection[] }> = ({ viewSections }) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const drawerRef = useRef<HTMLDivElement>();
	const theme = useTheme();

	const onFieldClick = useCallback(
		(name: string) => () => {
			setSelected(selecteds => xor(selecteds, [name]));
		},
		[setSelected],
	);

	const isSelected = useCallback((name: string) => selected.includes(name), [selected]);

	useEffect(() => {
		if (selected.length > 0) setDrawerOpen(true);
		else setDrawerOpen(false);
	}, [selected]);

	const accordionOffset = useMemo(
		() => (drawerRef && isDrawerOpen ? (drawerRef.current?.clientWidth || 0) * 0.6 : 0),
		[isDrawerOpen, drawerRef],
	);

	return (
		<Fragment>
			{viewSections.map(({ label, icon, fields }) => (
				<Accordion elevation={0} square disableGutters sx={{ paddingBottom: 2, paddingRight: `${accordionOffset}px` }}>
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
			<Drawer open={isDrawerOpen} anchor="right" variant="persistent">
				<Box display="flex" width="30vw" height="100%" ref={drawerRef}>
					<Stack spacing={0} position="relative" width="100%">
						<Box position="absolute" bottom={0} width="100%">
							Hey
						</Box>
					</Stack>
				</Box>
			</Drawer>
		</Fragment>
	);
};

export default ViewList;
