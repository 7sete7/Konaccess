import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

const MyAccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronRight} />} {...props} />
))(({ theme }) => ({
	border: 0,
	borderBottom: `2px solid ${theme.palette.primary.main}`,
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
}));

export default MyAccordionSummary;
