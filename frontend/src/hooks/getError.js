const getError = (error) => {
	if (error) {
		// Use optional chaining and nullish coalescing for cleaner code
		return (
			error?.response?.data?.error?.message ||
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			error?.msg ||
			'An unknown error occurred.'
		);
	}

	return 'No error message available.';
};

export function showLocationError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			return 'User denied the request for Geolocation.';
		case error.POSITION_UNAVAILABLE:
			return 'Location information is unavailable.';
		case error.TIMEOUT:
			return 'The request to get user location timed out.';
		case error.UNKNOWN_ERROR:
			return 'An unknown error occurred.';
		default:
			return 'An unspecified error occurred.';
	}
}

export default getError;
