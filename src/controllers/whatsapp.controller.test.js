const {
  generateMessage,
  getWhatsAppLink
} = require('../controllers/whatsapp.controller');

jest.mock('../repository/order.repository');

const orderRepo = require('../repository/order.repository');

describe('WhatsApp Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateMessage', () => {

    it('should generate WhatsApp message and link', async () => {
      orderRepo.getById.mockResolvedValue({
        id: 1,
        customerName: "Aneesah",
        contactNumber: "0821234567",
        address: "Johannesburg",
        items: [
          {
            productId: 1,
            productName: "Leather Wallet",
            quantity: 2,
            price: 450
          }
        ],
        total: 900,
        status: "pending"
      });

      const result = await generateMessage({ orderId: 1 });

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('whatsappLink');

      expect(result.message).toContain("NEW LEATHER ORDER RECEIVED");
      expect(result.message).toContain("Aneesah");
      expect(result.whatsappLink).toContain("wa.me");
    });

    it('should throw error if orderId missing', async () => {
      await expect(generateMessage({}))
        .rejects
        .toThrow("Missing orderId");
    });

    it('should throw error if order not found', async () => {
      orderRepo.getById.mockResolvedValue(null);

      await expect(generateMessage({ orderId: 99 }))
        .rejects
        .toThrow("Order not found");
    });

  });


  describe('getWhatsAppLink', () => {

    it('should return whatsapp link', async () => {
      orderRepo.getById.mockResolvedValue({
        id: 1,
        customerName: "Test User",
        contactNumber: "0821234567",
        address: "Durban",
        items: [],
        total: 100
      });

      const result = await getWhatsAppLink(1);

      expect(result).toHaveProperty('whatsappLink');
      expect(result.whatsappLink).toContain("wa.me");
    });

    it('should throw error if order not found', async () => {
      orderRepo.getById.mockResolvedValue(null);

      await expect(getWhatsAppLink(99))
        .rejects
        .toThrow("Order not found");
    });

  });

});