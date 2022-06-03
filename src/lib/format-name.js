export const FormatName = (/** @type {{ First: any; Middle: any; Last: any; }} */ name) => {
	let formatted = '';

	if (name) {
		if (name.First) {
			formatted += `${name.First} `;
		}
		if (name.Middle) {
			formatted += `${name.Middle} `;
		}
		if (name.Last) {
			formatted += `${name.Last} `;
		}
	}

	return formatted;
};
