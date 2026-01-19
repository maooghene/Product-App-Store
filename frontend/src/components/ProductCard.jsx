import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/Product.js";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();

  const textColor = useColorModeValue("gray.700", "gray.100");

  // Backgrounds
  const bg = useColorModeValue(
    "orange.100",
    "linear-gradient(180deg, #0f172a 0%, #020617 100%)"
  );

  // Borders
  const borderColor = useColorModeValue(
    "orange.300",
    "linear-gradient(90deg, #f59e0b, #f97316, #facc15)"
  );

  const cardBorder = useColorModeValue("1px solid orange.300", "2px solid transparent");

  // Shadows
  const cardShadow = useColorModeValue("md", "0 10px 30px rgba(0,0,0,0.6)");
  const hoverShadow = useColorModeValue("xl", "0 20px 40px rgba(251,146,60,0.35)");

  // Handlers
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Product updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box
        bg={bg}
        shadow={cardShadow}
        rounded="xl"
        overflow="hidden"
        border={cardBorder}
        borderImage={useColorModeValue(
          "none",
          "linear-gradient(90deg, #f59e0b, #f97316, #facc15) 1"
        )}
        transition="all 0.35s ease"
        _hover={{
          transform: "translateY(-8px) scale(1.02)",
          shadow: hoverShadow,
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
          transition="transform 0.4s ease"
          _hover={{ transform: "scale(1.08)" }}
        />

        <Box p={5}>
          <Heading
            as="h3"
            size="md"
            mb={2}
            fontWeight="semibold"
            letterSpacing="wide"
          >
            {product.name}
          </Heading>

          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>

          <HStack spacing={3}>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              bg="orange.400"
              color="white"
              _hover={{
                bg: "orange.600",
                transform: "scale(1.1)",
              }}
              transition="all 0.2s"
            />

            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              bg="red.400"
              color="white"
              _hover={{
                bg: "red.600",
                transform: "scale(1.1)",
              }}
              transition="all 0.2s"
            />
          </HStack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleUpdateProduct(product._id, updatedProduct)
              }
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
