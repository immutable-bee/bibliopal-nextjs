const BarcodeScannedNotification = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-green-400 text-white rounded-lg shadow-lg transition-opacity duration-500">
      <p>{message}</p>
    </div>
  );
};

export default BarcodeScannedNotification;
