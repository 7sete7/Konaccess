export const formatDate = (input: Date | string, dateFormat = 'DD/MM/YYYY'): string => {
	try {
		const date = new Date(input);
		const put0 = (s: number): string => (String(s).length === 1 ? `0${s}` : String(s));

		return dateFormat
			.toUpperCase()
			.replace('DD', put0(date.getDate()))
			.replace('MM', put0(date.getMonth() + 1))
			.replace('YYYY', String(date.getFullYear()))
			.replace('YY', date.getFullYear().toString().substring(2));
	} catch (e) {
		return input.toString();
	}
};
