import { Modal } from "@nextui-org/react";

const ResetInventoryModal = ({ visible, closeHandler }) => {
  const handleInventoryReset = async () => {
    const response = await fetch("/api/business/resetInventory");

    if (response.ok) {
      closeHandler();
    }
  };

  return (
    <Modal open={visible} onClose={closeHandler}>
      <Modal.Header>
        <h1>Reset Inventory</h1>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">
          Are you sure you want to reset your inventory?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-center gap-5">
          <button
            onClick={handleInventoryReset}
            className="rounded-lg border border-black px-8 py-3 bg-blbBlue"
          >
            Confirm
          </button>
          <button
            onClick={closeHandler}
            className="rounded-lg border border-black px-8 py-3 bg-[#FFC71F]"
          >
            Cancel
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetInventoryModal;
