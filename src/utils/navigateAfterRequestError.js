export default function navigateAfterRequestError(error, navigate) {
  // handle different error status codes
  if (error.statusCode === 401) {
    navigate('/login');
  }
  if (error.statusCode === 404) {
    navigate('/404');
  }
}
