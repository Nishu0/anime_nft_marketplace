/* eslint-disable */
const Notification = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = 'bg-success-500 text-grey-800';
  }

  if (status === 'error') {
    statusClasses = 'bg-error-500';
  }

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-2 rounded-t-lg ${statusClasses}`}
    >
      <div className="flex justify-between items-center p-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-grey-100 focus:outline-none">X</button>
      </div>
      <p className="p-2">{message}</p>
    </div>
  );
};

export default Notification;