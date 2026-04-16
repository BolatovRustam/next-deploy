"use client";
import { Modal, ModalCloseTrigger } from "@heroui/react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    size?: string;
    title: string;
    children: React.ReactNode;
}

const CustomModal = ({ isOpen, onClose, size = "max-w-sm", title, children }: IProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className={`w-full overflow-hidden ${size}`}>
                        <ModalCloseTrigger/>
                        <Modal.Header>
                            <Modal.Heading className="text-xl font-semibold  text-black" >
                                {title}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="space-y-2 py-4 px-1">
                            {children}
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default CustomModal;