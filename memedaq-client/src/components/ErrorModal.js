import React from 'react';

import {Modal, Button} from 'react-bootstrap';

const ErrorModal = (props) => {

    const close = () => {
        props.setErrorState({...props.errorState, visible: false});
    }

    return (
        <Modal show={props.errorState.visible} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.errorState.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.errorState.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={close}>
                    OK BOOMER
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ErrorModal;