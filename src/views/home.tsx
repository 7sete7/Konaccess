import { IStackItemProps, Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

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

const Home: React.FC = () => {
	return (
		<Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
			<StackSection tokens={{ padding: 10 }}>
				<Text variant="large">Módulo</Text>
			</StackSection>
		</Stack>
	);
};

export default Home;
