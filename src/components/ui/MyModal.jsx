import { withChakraProvider } from '@/HOC/ChakraProviderHOC';
import {Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ModalContent, useDisclosure} from '@chakra-ui/react'

const MyModal = ({isOpen, onClose}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered styleConfig={{
            background: 'white',
            top: '50%'
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati earum laboriosam omnis nulla doloremque sunt sint quisquam tempora. Magni quisquam architecto tenetur! Veniam, illum omnis deserunt laborum sequi excepturi rem.
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default withChakraProvider(MyModal);