export const isEmailValid = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const isPasswordValid = (password) => {
	const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
	return re.test(String(password));
};

export const isSingleDigitNumber = (text) => {
	const re = /[0-9]/;
	return re.test(String(text));
};

export const humanizeTime = (date) => {
	let options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const currentTime = new Date();
	const diffTime = Math.abs(currentTime.getTime() - date.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffHours = Math.floor(
		(diffTime - diffDays * 1000 * 60 * 60 * 24) / (1000 * 60 * 60)
	);
	const diffMins = Math.floor(
		(diffTime -
			diffDays * 1000 * 60 * 60 * 24 -
			diffHours * 1000 * 60 * 60) /
			(1000 * 60)
	);
	if (diffDays < 2) {
		if (diffDays < 1) {
			if (diffHours >= 1) {
				return `${diffHours.toFixed(0)}hrs ago`;
			}
			if (diffMins >= 1) {
				return `${diffMins.toFixed(0)}Mins ago`;
			}
			return 'Just now';
		}
		return '1d ago';
	}
	if (diffDays >= 2) {
		return date.toLocaleDateString('en-US', options);
	}
};

export const processExpenses = (filters, expenses) => {
	return expenses
		.filter((expense) => {
			if (!filters.title) {
				return true;
			}
			return expense.title
				.toLowerCase()
				.includes(filters.title.toLowerCase());
		})
		.filter((expense) => {
			if (!filters.startDate) {
				return true;
			}
			return expense.time >= new Date(filters.startDate);
		})
		.filter((expense) => {
			if (!filters.endDate) {
				return true;
			}
			return expense.time <= new Date(filters.endDate);
		})
		.filter((expense) => {
			if (filters.minAmount === '') {
				return true;
			}
			return expense.amount >= +filters.minAmount;
		})
		.filter((expense) => {
			if (filters.maxAmount === '') {
				return true;
			}
			return expense.amount <= +filters.maxAmount;
		})
		.filter((expense) => {
			if (!filters.bookmark) {
				return true;
			}
			return expense.isBookmarked === filters.bookmark;
		});
};
