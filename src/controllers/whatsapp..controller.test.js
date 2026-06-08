const {
  generateMessage,
  getWhatsAppLink
} = require('../controllers/whatsapp.controller');

jest.mock('../repository/order.repository');

const orderRepo = require('../repository/order.repository');

describe('generateMessage', () => {
  it('should generate WhatsApp message and link', async () => {
    orderRepo.getById.mockResolvedValue({
      id: 1,
      customerName: "Aneesah",
      contactNumber: "123",
      address: "Durban",
      items: [{ productId: 1, quantity: 2 }],
      total: 500,
      status: "pending"
    });

    const result = await generateMessage({ orderId: 1 });

    expect(result.message).toContain("NEW ORDER");
    expect(result.whatsappLink).toContain("wa.me");
  });

  it('should throw error if orderId missing', async () => {
    await expect(generateMessage({}))
      .rejects.toThrow("Missing orderId");
  });
});

describe('getWhatsAppLink', () => {
  it('should return whatsapp link', async () => {
    orderRepo.getById.mockResolvedValue({
      id: 1,
      customerName: "Test",
      items: [],
      total: 100
    });

    const result = await getWhatsAppLink(1);

    expect(result.whatsappLink).toContain("wa.me");
  });
});