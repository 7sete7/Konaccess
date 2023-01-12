import { IStackItemProps, Stack } from '@fluentui/react/lib/Stack';

const StackSection: React.FC<IStackItemProps> = ({ ...props }) => (
	<Stack.Item
		{...props}
		styles={{
			root: {
				boxShadow: '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)',
				borderRadius: 2,
				backgroundColor: '#fff',
				minWidth: 400,
				width: '60%',
			},
		}}
	>
		{props.children}
	</Stack.Item>
);

export default StackSection;
