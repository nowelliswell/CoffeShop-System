import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { menuData } from '../data/menuData';

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderType: 'dine-in',
    items: []
  });

  const [selectedItems, setSelectedItems] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [transferProof, setTransferProof] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemQuantityChange = (itemName, quantity) => {
    const qty = parseInt(quantity) || 0;
    setSelectedItems(prev => ({
      ...prev,
      [itemName]: qty
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    Object.entries(selectedItems).forEach(([itemName, quantity]) => {
      if (quantity > 0) {
        const item = menuData.find(m => m.name === itemName);
        if (item) {
          const price = parseInt(item.price.replace(/\D/g, ''));
          total += price * quantity;
        }
      }
    });
    return total;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('INVOICE PESANAN', 105, 20, { align: 'center' });
    
    // Customer Info
    doc.setFontSize(12);
    doc.text('Informasi Pelanggan:', 20, 40);
    doc.setFontSize(10);
    doc.text(`Nama: ${formData.name}`, 20, 50);
    doc.text(`Telepon: ${formData.phone}`, 20, 57);
    doc.text(`Tipe Pesanan: Dine In`, 20, 64);
    
    // Order Items
    doc.setFontSize(12);
    doc.text('Detail Pesanan:', 20, 80);
    
    let yPos = 90;
    doc.setFontSize(10);
    
    Object.entries(selectedItems).forEach(([itemName, quantity]) => {
      if (quantity > 0) {
        const item = menuData.find(m => m.name === itemName);
        if (item) {
          const price = parseInt(item.price.replace(/\D/g, ''));
          const subtotal = price * quantity;
          doc.text(`${itemName} x${quantity}`, 20, yPos);
          doc.text(`Rp ${subtotal.toLocaleString('id-ID')}`, 150, yPos);
          yPos += 7;
        }
      }
    });
    
    // Total
    yPos += 10;
    doc.setFontSize(12);
    doc.text('TOTAL:', 20, yPos);
    doc.text(`Rp ${calculateTotal().toLocaleString('id-ID')}`, 150, yPos);
    
    // Payment Info
    yPos += 20;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('PEMBAYARAN DI TEMPAT', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Silahkan lakukan pembayaran di kasir saat tiba di tempat.', 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Terima kasih atas pesanan Anda!', 105, 280, { align: 'center' });
    
    // Save PDF
    doc.save(`invoice-${formData.name}-${Date.now()}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone) {
      alert('Mohon lengkapi semua data pelanggan!');
      return;
    }
    
    const hasItems = Object.values(selectedItems).some(qty => qty > 0);
    if (!hasItems) {
      alert('Mohon pilih minimal 1 item!');
      return;
    }
    
    // If takeaway, show receipt first
    if (formData.orderType === 'takeaway') {
      setOrderData({
        name: formData.name,
        phone: formData.phone,
        orderType: formData.orderType,
        items: { ...selectedItems },
        total: calculateTotal(),
        timestamp: Date.now()
      });
      setShowReceipt(true);
    } else {
      // If dine-in, generate PDF directly
      generatePDF();
      
      // Reset form
      setFormData({ name: '', phone: '', orderType: 'dine-in', items: [] });
      setSelectedItems({});
      
      alert('Invoice berhasil didownload!');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTransferProof(file);
    }
  };

  const generateFinalInvoice = () => {
    if (!transferProof) {
      alert('Mohon upload bukti transfer terlebih dahulu!');
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('STRUK PEMBAYARAN', 105, 20, { align: 'center' });
    
    // Customer Info
    doc.setFontSize(12);
    doc.text('Informasi Pelanggan:', 20, 40);
    doc.setFontSize(10);
    doc.text(`Nama: ${orderData.name}`, 20, 50);
    doc.text(`Telepon: ${orderData.phone}`, 20, 57);
    doc.text(`Tipe Pesanan: Take Away`, 20, 64);
    
    // Order Items
    doc.setFontSize(12);
    doc.text('Detail Pesanan:', 20, 80);
    
    let yPos = 90;
    doc.setFontSize(10);
    
    Object.entries(orderData.items).forEach(([itemName, quantity]) => {
      if (quantity > 0) {
        const item = menuData.find(m => m.name === itemName);
        if (item) {
          const price = parseInt(item.price.replace(/\D/g, ''));
          const subtotal = price * quantity;
          doc.text(`${itemName} x${quantity}`, 20, yPos);
          doc.text(`Rp ${subtotal.toLocaleString('id-ID')}`, 150, yPos);
          yPos += 7;
        }
      }
    });
    
    // Total
    yPos += 10;
    doc.setFontSize(12);
    doc.text('TOTAL DIBAYAR:', 20, yPos);
    doc.text(`Rp ${orderData.total.toLocaleString('id-ID')}`, 150, yPos);
    
    // Payment Status
    yPos += 20;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 128, 0);
    doc.text('✓ PEMBAYARAN TERVERIFIKASI', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    doc.text(`Bukti Transfer: ${transferProof.name}`, 20, yPos);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, yPos + 7);
    
    // Footer
    doc.setFontSize(8);
    doc.text('Terima kasih atas pesanan Anda!', 105, 280, { align: 'center' });
    doc.text('Silahkan tunjukkan struk ini saat pengambilan pesanan', 105, 285, { align: 'center' });
    
    // Save PDF
    doc.save(`struk-pembayaran-${orderData.name}-${orderData.timestamp}.pdf`);
    
    // Reset everything
    setShowReceipt(false);
    setOrderData(null);
    setTransferProof(null);
    setFormData({ name: '', phone: '', orderType: 'dine-in', items: [] });
    setSelectedItems({});
    
    alert('Struk pembayaran berhasil didownload!');
  };

  const cancelOrder = () => {
    setShowReceipt(false);
    setOrderData(null);
    setTransferProof(null);
  };

  // Receipt Modal for Takeaway
  if (showReceipt && orderData) {
    return (
      <section id="order" style={{ padding: '80px 20px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: '#c49b63' }}>
            Order Here!
          </h2>
          
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '30px', 
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(196, 155, 99, 0.2)',
            border: '1px solid #2a2a2a'
          }}>
            {/* Customer Info */}
            <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #3a3a3a' }}>
              <h3 style={{ color: '#c49b63', marginBottom: '15px' }}>Informasi Pelanggan</h3>
              <p style={{ color: '#fff', marginBottom: '8px' }}>Nama: {orderData.name}</p>
              <p style={{ color: '#fff', marginBottom: '8px' }}>Telepon: {orderData.phone}</p>
              <p style={{ color: '#fff' }}>Tipe: Take Away</p>
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #3a3a3a' }}>
              <h3 style={{ color: '#c49b63', marginBottom: '15px' }}>Detail Pesanan</h3>
              {Object.entries(orderData.items).map(([itemName, quantity]) => {
                if (quantity > 0) {
                  const item = menuData.find(m => m.name === itemName);
                  if (item) {
                    const price = parseInt(item.price.replace(/\D/g, ''));
                    const subtotal = price * quantity;
                    return (
                      <div key={itemName} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                        color: '#fff'
                      }}>
                        <span>{itemName} x{quantity}</span>
                        <span style={{ color: '#c49b63', fontWeight: 'bold' }}>
                          Rp {subtotal.toLocaleString('id-ID')}
                        </span>
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>

            {/* Total */}
            <div style={{ 
              marginBottom: '25px', 
              padding: '20px',
              backgroundColor: '#c49b63',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#000', fontWeight: 'bold' }}>Total yang Harus Ditransfer</h3>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#000' }}>
                Rp {orderData.total.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Bank Info */}
            <div style={{ 
              marginBottom: '25px',
              padding: '20px',
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
              border: '1px solid #3a3a3a'
            }}>
              <h3 style={{ color: '#c49b63', marginBottom: '15px', textAlign: 'center' }}>Informasi Transfer</h3>
              <p style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
                Silahkan transfer ke nomor rekening:
              </p>
              <p style={{ 
                color: '#c49b63', 
                fontSize: '24px', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                0677789012345
              </p>
              <p style={{ color: '#fff', textAlign: 'center' }}>a.n. Noel</p>
            </div>

            {/* Upload Proof */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold', 
                color: '#c49b63',
                textAlign: 'center'
              }}>
                Upload Bukti Transfer *
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px dashed #c49b63',
                  borderRadius: '8px',
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              />
              {transferProof && (
                <p style={{ 
                  color: '#4ade80', 
                  marginTop: '10px', 
                  textAlign: 'center',
                  fontSize: '14px'
                }}>
                  ✓ File terpilih: {transferProof.name}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={cancelOrder}
                style={{
                  flex: 1,
                  padding: '15px',
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  border: '2px solid #3a3a3a',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3a3a3a';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#2a2a2a';
                }}
              >
                Batal
              </button>
              
              <button
                onClick={generateFinalInvoice}
                disabled={!transferProof}
                style={{
                  flex: 1,
                  padding: '15px',
                  backgroundColor: transferProof ? '#c49b63' : '#4a4a4a',
                  color: transferProof ? '#000' : '#888',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: transferProof ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  boxShadow: transferProof ? '0 4px 15px rgba(196, 155, 99, 0.3)' : 'none'
                }}
                onMouseOver={(e) => {
                  if (transferProof) {
                    e.target.style.backgroundColor = '#d4ab73';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (transferProof) {
                    e.target.style.backgroundColor = '#c49b63';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                Download Struk Pembayaran
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" style={{ padding: '80px 20px', backgroundColor: '#0a0a0a' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: '#c49b63' }}>
          Pesan Sekarang
        </h2>
        
        <form onSubmit={handleSubmit} style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '30px', 
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(196, 155, 99, 0.2)',
          border: '1px solid #2a2a2a'
        }}>
          {/* Customer Info */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#c49b63' }}>
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #3a3a3a',
                borderRadius: '5px',
                fontSize: '16px',
                backgroundColor: '#2a2a2a',
                color: '#fff'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#c49b63' }}>
              Nomor Telepon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #3a3a3a',
                borderRadius: '5px',
                fontSize: '16px',
                backgroundColor: '#2a2a2a',
                color: '#fff'
              }}
              required
            />
          </div>

          {/* Order Type */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold', color: '#c49b63' }}>
              Tipe Pesanan *
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{
                flex: 1,
                padding: '15px',
                backgroundColor: formData.orderType === 'dine-in' ? '#c49b63' : '#2a2a2a',
                color: formData.orderType === 'dine-in' ? '#000' : '#fff',
                border: `2px solid ${formData.orderType === 'dine-in' ? '#c49b63' : '#3a3a3a'}`,
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}>
                <input
                  type="radio"
                  name="orderType"
                  value="dine-in"
                  checked={formData.orderType === 'dine-in'}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                🍽️ Dine In
                <div style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'normal' }}>
                  Bayar di tempat
                </div>
              </label>
              
              <label style={{
                flex: 1,
                padding: '15px',
                backgroundColor: formData.orderType === 'takeaway' ? '#c49b63' : '#2a2a2a',
                color: formData.orderType === 'takeaway' ? '#000' : '#fff',
                border: `2px solid ${formData.orderType === 'takeaway' ? '#c49b63' : '#3a3a3a'}`,
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}>
                <input
                  type="radio"
                  name="orderType"
                  value="takeaway"
                  checked={formData.orderType === 'takeaway'}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                🥡 Take Away
                <div style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'normal' }}>
                  Transfer dulu
                </div>
              </label>
            </div>
          </div>

          {/* Menu Items */}
          <h3 style={{ marginBottom: '20px', color: '#c49b63' }}>Pilih Menu</h3>
          {menuData.map((item) => (
            <div key={item.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: '#2a2a2a',
              borderRadius: '8px',
              border: '1px solid #3a3a3a'
            }}>
              <div>
                <strong style={{ color: '#fff', fontSize: '16px' }}>{item.name}</strong>
                <div style={{ color: '#c49b63', fontSize: '15px', marginTop: '5px', fontWeight: '600' }}>{item.price}</div>
              </div>
              <input
                type="number"
                min="0"
                value={selectedItems[item.name] || 0}
                onChange={(e) => handleItemQuantityChange(item.name, e.target.value)}
                style={{
                  width: '70px',
                  padding: '10px 8px',
                  border: '2px solid #c49b63',
                  borderRadius: '5px',
                  textAlign: 'center',
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              />
            </div>
          ))}

          {/* Total */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#c49b63',
            color: '#000',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Total Pembayaran</h3>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
              Rp {calculateTotal().toLocaleString('id-ID')}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#c49b63',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(196, 155, 99, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#d4ab73';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(196, 155, 99, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#c49b63';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(196, 155, 99, 0.3)';
            }}
          >
            {formData.orderType === 'takeaway' ? 'Lihat Receipt Pesanan' : 'Pesan & Download Invoice'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default OrderForm;
