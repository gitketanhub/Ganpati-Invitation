import { InvitationData } from '../types';

export const invitationData: InvitationData = {
  shlokas: {
    pranam: "ॐ गं गणपतये नमः",
    invocation: "॥ श्री गणेशाय नमः ॥",
    vratKatha: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    morya: "गणपती बाप्पा मोरया • मंगलमूर्ती मोरया",
    greeting: "स्नेह एवं भक्ति के साथ"
  },

  hostName: "शर्मा परिवार",
  familyMembers: "आनंद, सुनीता एवं समस्त परिजन",
  hostSubtext: "सप्रेम निमंत्रक",

  date: "शुक्रवार, १९ सितम्बर २०२६",
  dateDetail: "भाद्रपद शुक्ल चतुर्थी (गणेश चतुर्थी महापर्व)",
  gregorianDate: "2026-09-19T10:00:00+05:30",

  darshanTime: "प्रातः १०:०० बजे से रात्रि १०:०० बजे तक",
  darshanSubtext: "पूरे दिन आप सभी के स्वागत हेतु द्वार खुले हैं",

  aartiMorningTime: "प्रातः ११:३० बजे (प्रातः महाआरती)",
  aartiEveningTime: "संध्या ७:३० बजे (संध्या दीप महाआरती)",
  prasadDetail: "आरती के उपरांत मोदक भोग व पावन महाप्रसाद सहभोज",

  venueName: "शर्मा निवास (गणेश कुटीर)",
  venueAddress: "फ्लैट ४०२, साई स्पर्श रेसिडेंसी, १४वां क्रॉस, ग्रीन ग्लेन लेआउट, बेलंदूर, बेंगलुरु - ५६०१०३",
  landmark: "ग्रीन ग्लेन पार्क एवं शिव मंदिर के समीप",
  city: "बेंगलुरु, कर्नाटक",
  phoneContact: "+91 98765 43210",
  mapsUrl: "https://maps.google.com/?q=Bellandur+Bengaluru",
  whatsappNumber: "919876543210",

  timeline: [
    {
      id: '1',
      title: 'प्रातः आगमन व दर्शन',
      time: 'प्रातः १०:०० बजे से',
      subtext: 'बप्पा के शांत मनोहर दर्शन एवं पधारे हुए प्रियजनों का आत्मीय स्वागत।',
      iconType: 'darshan'
    },
    {
      id: '2',
      title: 'मध्याह्न महाआरती',
      time: 'प्रातः ११:३० बजे',
      subtext: 'धूप, दीप, शंख ध्वनि और सामूहिक मंगल आरती के साथ प्रथम भोग।',
      iconType: 'aarti',
      highlight: true
    },
    {
      id: '3',
      title: 'भोग व महाप्रसाद',
      time: 'दोपहर १:०० बजे से',
      subtext: 'पारंपरिक उकडीचे मोदक, नैवेद्य एवं प्रेमपूर्वक तैयार पावन सहभोज।',
      iconType: 'prasad'
    },
    {
      id: '4',
      title: 'संध्या दीप महाआरती',
      time: 'संध्या ७:३० बजे',
      subtext: 'सैकड़ों दीयों की जगमगाहट, मंजीरे और भक्तिमय सामूहिक संकीर्तन।',
      iconType: 'aarti',
      highlight: true
    },
    {
      id: '5',
      title: 'रात्रिकालीन दर्शन व आशीष',
      time: 'रात्रि १०:०० बजे तक',
      subtext: 'शांत वातावरण में बप्पा के अंतिम दर्शन एवं विदाई आशीष।',
      iconType: 'darshan'
    }
  ],

  darshanGallery: [
    {
      id: '1',
      title: 'श्री गणेश विग्रह व संपूर्ण झांकी',
      tag: 'संपूर्ण गर्भगृह',
      description: 'ताजे गेंदे के पुष्पों, चंपा और पीतल के दीपकों के बीच विराजित हमारे गृह के मंगलमूर्ति बप्पा।',
      url: 'https://images.unsplash.com/photo-1567591370317-5e669e4693b7?auto=format&fit=crop&w=1600&q=85',
      aspect: 'wide'
    },
    {
      id: '2',
      title: 'मनोहर मुखारविंद व मुकुट',
      tag: 'सौम्य दर्शन',
      description: 'बप्पा के शांत नयन, पावन कुमकुम तिलक और सोने की आभा लिए मुकुट का मनमोहक रूप।',
      url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=85',
      aspect: 'portrait'
    },
    {
      id: '3',
      title: 'अभय मुद्रा व मोदक हस्त',
      tag: 'वरदान व कृपा',
      description: 'भक्तों के संकट हरने वाले पावन हस्त और असीम शांति प्रदान करने वाला आशीर्वाद।',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      aspect: 'portrait'
    },
    {
      id: '4',
      title: 'प्रज्वलित दीप व आरती की लौ',
      tag: 'पावन प्रकाश',
      description: 'शुद्ध घी के दीयों की स्निग्ध रोशनी जो पूरे घर को सकारात्मकता और दिव्यता से महकाती है।',
      url: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=1200&q=85',
      aspect: 'wide'
    }
  ],

  sacredMoments: [
    {
      id: 'm1',
      num: 'क्षण ०१',
      title: 'पावन दर्शन',
      desc: 'मन की असीम शांति और बप्पा का सान्निध्य। घर के मंदिर में पहली नज़र में बप्पा का दर्शन हृदय को आनंदित कर देता है।',
      imageUrl: 'https://images.unsplash.com/photo-1567591370504-8b631d87e076?auto=format&fit=crop&w=800&q=80',
      badge: 'शांति व भक्ति'
    },
    {
      id: 'm2',
      num: 'क्षण ०२',
      title: 'महाआरती',
      desc: 'दीयों की पावन लौ, शंख ध्वनि, मंजीरे और पूरा परिवार जब एक स्वर में बप्पा की आरती गाता है।',
      imageUrl: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
      badge: 'सामूहिक प्रार्थना'
    },
    {
      id: 'm3',
      num: 'क्षण ०३',
      title: 'मोदक व महाप्रसाद',
      desc: 'शुद्ध भाव से बना उकडीचे मोदक, पंचामृत और पूरे स्नेह से परोसा गया पावन भोग प्रसाद।',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      badge: 'स्नेह व मिठास'
    }
  ]
};
