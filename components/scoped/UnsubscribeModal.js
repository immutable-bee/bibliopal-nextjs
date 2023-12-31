import { useState } from "react";
import ButtonComponent from "../utility/Button";
import LoadingComponent from '../utility/loading';
import ModalComponent from '../utility/Modal';
const UnsubscribeModal = (props) => {
  return (
    <ModalComponent open={props.isUnsubscribeModalOpen}
      onClose={props.handleSubscriptionModal} title="Confirm cancel subscription"
      footer={
        <div id="unsubscribe-modal-foot">
          {!props.loading && !props.cancelMessage ? (
            <div className="flex justify-center">
              <ButtonComponent
                color="blue" full rounded
                id="confirm-unsubscribe-btn" className="!mx-1"
                onClick={props.cancelbtn}

              >
                Yes I&apos;m sure
              </ButtonComponent>
              <ButtonComponent
                full rounded
                id="close-unsubscribe-modal-btn" className="!mx-1"
                onClick={props.closebtn}

              >
                Go back
              </ButtonComponent>
            </div>
          ) : props.loading && !props.cancelMessage ? (
            <div id="unsubscribe-loading-container">
              <LoadingComponent
                id="unsubscribe-modal-loading"
                color="primary"
                size="md"
              />
            </div>
          ) : (
            <div id="cancel-subscription-message">{props.cancelMessage}</div>
          )}
        </div>
      }
    >
      <>
        <h4 className="text-base">Are you sure you want to cancel your Subscription?</h4>

      </>
    </ModalComponent>
    // <Modal
    //   open={props.isUnsubscribeModalOpen}
    //   onClose={props.handleSubscriptionModal}
    // >
    //   <Modal.Header>
    //     <h4>Are you sure you want to cancel your Subscription?</h4>
    //   </Modal.Header>
    //   <Modal.Footer>
    //     <div id="unsubscribe-modal-foot">
    //       {!props.loading && !props.cancelMessage ? (
    //         <>
    //           <ButtonComponent
    //             color="blue" full rounded
    //             id="confirm-unsubscribe-btn" className="!mx-1"
    //             onClick={props.cancelbtn}

    //           >
    //             Yes I'm sure
    //           </ButtonComponent>
    //           <ButtonComponent
    //             full rounded
    //             id="close-unsubscribe-modal-btn" className="!mx-1"
    //             onClick={props.closebtn}

    //           >
    //             Go back
    //           </ButtonComponent>
    //         </>
    //       ) : props.loading && !props.cancelMessage ? (
    //         <div id="unsubscribe-loading-container">
    //           <LoadingComponent
    //             id="unsubscribe-modal-loading"
    //             color="primary"
    //             size="md"
    //           />
    //         </div>
    //       ) : (
    //         <div id="cancel-subscription-message">{props.cancelMessage}</div>
    //       )}
    //     </div>
    //   </Modal.Footer>
    // </Modal>
  );
};

export default UnsubscribeModal;
