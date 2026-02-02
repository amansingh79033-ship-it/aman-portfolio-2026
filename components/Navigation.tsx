
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { motion } from 'framer-motion';
import { ViewState } from '../App';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation = ({ currentView, setView }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  
  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = navigator.language || 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setRecognizedText(transcript);
          setIsListening(false);
          
          // Process the recognized command
          processVoiceCommand(transcript.toLowerCase());
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          setRecognizedText('');
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        return recognition;
      }
      return null;
    };
    
    const recognition = initSpeechRecognition();
    
    const startListening = () => {
      if (recognition) {
        recognition.lang = navigator.language || 'en-US';
        recognition.start();
        setIsListening(true);
        setRecognizedText('');
      } else {
        alert('Speech recognition not supported in your browser. Please try Chrome or Edge.');
      }
    };
    
    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
    };
    
    // Expose functions globally so they can be used in the onClick handler
    (window as any).startVoiceRecognition = startListening;
    (window as any).stopVoiceRecognition = stopListening;
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);
  
  // Function to process voice commands
  const processVoiceCommand = (command: string) => {
    // Normalize the command by removing extra spaces and punctuation
    const normalizedCommand = command.replace(/[\p{P}\p{S}]/gu, '').trim();
    
    // Define command mappings in multiple languages
    const commandMappings: Record<string, RegExp[]> = {
      'systems': [
        /systems?/i,
        /system methodology/i,
        /work.*methodology/i,
        /ಸಿಸ್ಟಮ್/i,
        /सिस्टम/i,
        /sistema/i,
        /система/i,
        /système/i,
        /시스템/i,
        /系统/i,
        /sistema/i,
        /σύστημα/i,
        /sistema/i
      ],
      'intelligence': [
        /intel(ligence)?/i,
        /ahi protocol/i,
        /intelligence protocol/i,
        /ಇಂಟೆಲಿಜೆನ್ಸ್/i,
        /इंटेलिजेंस/i,
        /inteligencia/i,
        /интеллект/i,
        /intelligence/i,
        /지능/i,
        /智能/i,
        /intelligenza/i,
        /εξυπνάδα/i,
        / inteligência/i
      ],
      'ventures': [
        /ventures?/i,
        /portfolio/i,
        /30 crore/i,
        /venture/i,
        /ವೆಂಚರ್ಸ್/i,
        /वेंचर/i,
        /empresa/i,
        /венчур/i,
        /entreprise/i,
        /벤처/i,
        /风投/i,
        /impresa/i,
        /επιχείρηση/i,
        /empreendimento/i
      ],
      'analysis': [
        /analysis/i,
        /forensic/i,
        /analy.*sis/i,
        /ಅನಲಿಸಿಸ್/i,
        /एनालिसिस/i,
        /análisis/i,
        /анализ/i,
        /analyse/i,
        /분석/i,
        /分析/i,
        /analisi/i,
        /ανάλυση/i,
        /análise/i
      ],
      'mindspace': [
        /mindspace/i,
        /poetry/i,
        /poem/i,
        /verse/i,
        /ಕವಿತೆ/i,
        /कविता/i,
        /poesía/i,
        /поэзия/i,
        /poésie/i,
        /시/i,
        /诗歌/i,
        /poesia/i,
        /ποίηση/i,
        /poesia/i
      ],
      'feel-alive': [
        /feel alive/i,
        /mind.*conscious/i,
        /consciousness/i,
        /ಮನಸ್ಸು/i,
        /मन/i,
        /mente.*consciencia/i,
        /сознание/i,
        /conscience/i,
        /의식/i,
        /意识/i,
        /coscienza/i,
        /συνείδηση/i,
        /consciência/i
      ],
      'home': [
        /home/i,
        /main/i,
        /start/i,
        /ಮುಖ್ಯ/i,
        /मुख्य/i,
        /inicio/i,
        /главная/i,
        /accueil/i,
        /홈/i,
        /首页/i,
        /casa/i,
        /αρχική/i,
        /início/i
      ]
    };
    
    // Check for matches in command mappings
    for (const [view, patterns] of Object.entries(commandMappings)) {
      for (const pattern of patterns) {
        if (pattern.test(normalizedCommand)) {
          setView(view as ViewState);
          speakResponse(view);
          return;
        }
      }
    }
    
    // If no specific command matched, provide help
    speakResponse('help');
  };
  
  // Function to speak responses in user's language
  const speakResponse = (responseType: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    
    const userLanguage = navigator.language || 'en-US';
    
    // Define responses in multiple languages
    const responses: Record<string, Record<string, string>> = {
      'systems': {
        'kn-IN': "ಸಿಸ್ಟಮ್ಸ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ ನಮ್ಮ ಕೆಲಸದ ವಿಧಾನಗಳನ್ನು ಕಾಣಬಹುದು.",
        'hi-IN': "सिस्टम्स पेज पर जा रहे हैं। यहां आप हमारी काम करने की विधियां देख सकते हैं।",
        'en-US': "Going to Systems page. Here you can see our working methodologies.",
        'es-ES': "Yendo a la página de Sistemas. Aquí puedes ver nuestras metodologías de trabajo.",
        'fr-FR': "Accès à la page des Systèmes. Ici vous pouvez voir nos méthodologies de travail.",
        'de-DE': "Gehe zur Systemseite. Hier können Sie unsere Arbeitsmethoden sehen.",
        'ja-JP': "システムページに移動しています。ここでは私たちの作業方法論を見ることができます。",
        'zh-CN': "正在前往系统页面。在这里您可以查看我们的工作方法论。",
        'ru-RU': "Переход на страницу систем. Здесь вы можете увидеть наши методы работы.",
        'pt-BR': "Indo para a página de Sistemas. Aqui você pode ver nossas metodologias de trabalho.",
        'it-IT': "Vado alla pagina dei Sistemi. Qui puoi vedere le nostre metodologie di lavoro.",
        'ko-KR': "시스템 페이지로 이동 중입니다. 여기에서 작업 방법론을 볼 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة الأنظمة. هنا يمكنك رؤية منهجيات عملنا.",
        'bn-IN': "সিস্টেম পৃষ্ঠায় যাচ্ছি। এখানে আপনি আমাদের কাজের পদ্ধতি দেখতে পারবেন।",
        'te-IN': "సిస్టమ్స్ పేజీకి వెళ్తున్నాము. ఇక్కడ మనం పని చేసే విధానాలు చూడవచ్చు.",
        'ta-IN': "சிஸ்டம்ஸ் பக்கத்திற்கு செல்கிறோம். இங்கு நமது பணி முறைகளைக் காணலாம்.",
        'ml-IN': "സിസ്റ്റംസ് പേജിലേക്ക് പോകുന്നു. ഇവിടെ നമ്മുടെ പ്രവർത്തനരീതികൾ കാണാൻ കഴിയും.",
        'default': "Going to Systems page. Here you can see our working methodologies."
      },
      'intelligence': {
        'kn-IN': "ಇಂಟೆಲಿಜೆನ್ಸ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ AHI ಪ್ರೊಟೊಕಾಲ್ ಕಾಣಬಹುದು.",
        'hi-IN': "इंटेलिजेंस पेज पर जा रहे हैं। यहां आप AHI प्रोटोकॉल देख सकते हैं।",
        'en-US': "Going to Intelligence page. Here you can see the AHI Protocol.",
        'es-ES': "Yendo a la página de Inteligencia. Aquí puedes ver el Protocolo AHI.",
        'fr-FR': "Accès à la page Intelligence. Ici vous pouvez voir le protocole AHI.",
        'de-DE': "Gehe zur Intelligenzseite. Hier können Sie das AHI-Protokoll sehen.",
        'ja-JP': "インテリジェンスページに移動しています。ここではAHIプロトコルを見ることができます。",
        'zh-CN': "正在前往智能页面。在这里您可以查看AHI协议。",
        'ru-RU': "Переход на страницу интеллекта. Здесь вы можете увидеть протокол AHI.",
        'pt-BR': "Indo para a página de Inteligência. Aqui você pode ver o Protocolo AHI.",
        'it-IT': "Vado alla pagina dell'Intelligenza. Qui puoi vedere il Protocollo AHI.",
        'ko-KR': "인텔리전스 페이지로 이동 중입니다. 여기에서 AHI 프로토콜을 볼 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة الذكاء. هنا يمكنك رؤية بروتوكول AHI.",
        'bn-IN': "ইন্টেলিজেন্স পৃষ্ঠায় যাচ্ছি। এখানে আপনি AHI প্রোটোকল দেখতে পারবেন।",
        'te-IN': "ఇంటెలిజెన్స్ పేజీకి వెళ్తున్నాము. ఇక్కడ AHI ప్రొటోకాల్ చూడవచ్చు.",
        'ta-IN': "இன்டெலிஜென்ஸ் பக்கத்திற்கு செல்கிறோம். இங்கு AHI நெறிமுறையைக் காணலாம்.",
        'ml-IN': "ഇന്റലിജൻസ് പേജിലേക്ക് പോകുന്നു. ഇവിടെ AHI പ്രോട്ടോക്കോൾ കാണാൻ കഴിയും.",
        'default': "Going to Intelligence page. Here you can see the AHI Protocol."
      },
      'ventures': {
        'kn-IN': "ವೆಂಚರ್ಸ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ 30 ಕೋಟಿ ರೂಪಾಯಿ ಪೋರ್ಟ್ಫೋಲಿಯೊ ಕಾಣಬಹುದು.",
        'hi-IN': "वेंचर्स पेज पर जा रहे हैं। यहां आप 30 करोड़ रुपये का पोर्टफोलियो देख सकते हैं।",
        'en-US': "Going to Ventures page. Here you can see the 30 Crore portfolio.",
        'es-ES': "Yendo a la página de Empresas. Aquí puedes ver el portafolio de 30 crores.",
        'fr-FR': "Accès à la page des Entreprises. Ici vous pouvez voir le portefeuille de 30 crores.",
        'de-DE': "Gehe zur Unternehmensseite. Hier können Sie das 30-Crore-Portfolio sehen.",
        'ja-JP': "ベンチャーズページに移動しています。ここでは30億ルピーのポートフォリオを見ることができます。",
        'zh-CN': "正在前往风投页面。在这里您可以查看30亿卢比的投资组合。",
        'ru-RU': "Переход на страницу венчурных проектов. Здесь вы можете увидеть портфель в 30 кроров.",
        'pt-BR': "Indo para a página de Empreendimentos. Aqui você pode ver o portfólio de 30 crores.",
        'it-IT': "Vado alla pagina delle Imprese. Qui puoi vedere il portfolio da 30 crore.",
        'ko-KR': "벤처 페이지로 이동 중입니다. 여기에서 30억 루피 투자 포트폴리오를 볼 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة الاستثمارات. هنا يمكنك رؤية محفظة 30 كرور.",
        'bn-IN': "ভেঞ্চার পৃষ্ঠায় যাচ্ছি। এখানে আপনি 30 কোটি টাকার পোর্টফোলিও দেখতে পারবেন।",
        'te-IN': "వెంచర్స్ పేజీకి వెళ్తున్నాము. ఇక్కడ 30 కోట్ల పోర్ట్ఫోలియో చూడవచ్చు.",
        'ta-IN': "வெஞ்சர்ஸ் பக்கத்திற்கு செல்கிறோம். இங்கு 30 கோடி முதலீட்டு கணக்கைக் காணலாம்.",
        'ml-IN': "വെഞ്ചറുകൾ പേജിലേക്ക് പോകുന്നു. ഇവിടെ 30 കോടി രൂപയുടെ പോർട്ട്ഫോളിയോ കാണാൻ കഴിയും.",
        'default': "Going to Ventures page. Here you can see the 30 Crore portfolio."
      },
      'analysis': {
        'kn-IN': "ಅನಲಿಸಿಸ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ ಫಾರೆನ್ಸಿಕ್ಸ್ ಕಾಣಬಹುದು.",
        'hi-IN': "एनालिसिस पेज पर जा रहे हैं। यहां आप फॉरेंसिक्स देख सकते हैं।",
        'en-US': "Going to Analysis page. Here you can see Forensics.",
        'es-ES': "Yendo a la página de Análisis. Aquí puedes ver Ciencias forenses.",
        'fr-FR': "Accès à la page d'Analyse. Ici vous pouvez voir les sciences médico-légales.",
        'de-DE': "Gehe zur Analyseseite. Hier können Sie die Forensik sehen.",
        'ja-JP': "アナリシスページに移動しています。ここでは法科学を見ることができます。",
        'zh-CN': "正在前往分析页面。在这里您可以查看法医学。",
        'ru-RU': "Переход на страницу анализа. Здесь вы можете увидеть судебную экспертизу.",
        'pt-BR': "Indo para a página de Análise. Aqui você pode ver a perícia forense.",
        'it-IT': "Vado alla pagina di Analisi. Qui puoi vedere le scienze forensi.",
        'ko-KR': "분석 페이지로 이동 중입니다. 여기에서 과학수사를 볼 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة التحليل. هنا يمكنك رؤية العلوم الجنائية.",
        'bn-IN': "বিশ্লেষণ পৃষ্ঠায় যাচ্ছি। এখানে আপনি ফরেনসিক্স দেখতে পারবেন।",
        'te-IN': "ఏనలిసిస్ పేజీకి వెళ్తున్నాము. ఇక్కడ ఫోరెన్సిక్స్ చూడవచ్చు.",
        'ta-IN': "ஏனலிஸிஸ் பக்கத்திற்கு செல்கிறோம். இங்கு போரென்சிக்ஸ் காணலாம்.",
        'ml-IN': "അനലിസിസ് പേജിലേക്ക് പോകുന്നു. ഇവിടെ ഫോറൻസിക്സ് കാണാൻ കഴിയും.",
        'default': "Going to Analysis page. Here you can see Forensics."
      },
      'mindspace': {
        'kn-IN': "ಮೈಂಡ್‌ಸ್ಪೇಸ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ ಕವಿತೆಗಳನ್ನು ಕಾಣಬಹುದು.",
        'hi-IN': "माइंडस्पेस पेज पर जा रहे हैं। यहां आप कविताएं देख सकते हैं।",
        'en-US': "Going to Mindspace page. Here you can see Poetry.",
        'es-ES': "Yendo a la página de Espacio Mental. Aquí puedes ver Poesía.",
        'fr-FR': "Accès à la page Espace Mental. Ici vous pouvez voir la Poésie.",
        'de-DE': "Gehe zur Geistesraum-Seite. Hier können Sie die Poesie sehen.",
        'ja-JP': "マインドスペースページに移動しています。ここでは詩を見ることができます。",
        'zh-CN': "正在前往心灵空间页面。在这里您可以查看诗歌。",
        'ru-RU': "Переход на страницу пространства разума. Здесь вы можете увидеть поэзию.",
        'pt-BR': "Indo para a página do Espaço Mental. Aqui você pode ver Poesia.",
        'it-IT': "Vado alla pagina dello Spazio Mentale. Qui puoi vedere la Poesia.",
        'ko-KR': "마인드스페이스 페이지로 이동 중입니다. 여기에서 시를 볼 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة مساحة العقل. هنا يمكنك رؤية الشعر.",
        'bn-IN': "মাইন্ডস্পেস পৃষ্ঠায় যাচ্ছি। এখানে আপনি কবিতা দেখতে পারবেন।",
        'te-IN': "మైండ్‌స్పేస్ పేజీకి వెళ్తున్నాము. ఇక్కడ కవిత్వం చూడవచ్చు.",
        'ta-IN': "மைண்ட்ஸ்பேஸ் பக்கத்திற்கு செல்கிறோம். இங்கு கவிதைகளைக் காணலாம்.",
        'ml-IN': "മൈൻഡ്സ്പെയ്സ് പേജിലേക്ക് പോകുന്നു. ഇവിടെ കവിത കാണാൻ കഴിയും.",
        'default': "Going to Mindspace page. Here you can see Poetry."
      },
      'feel-alive': {
        'kn-IN': "ಫೀಲ್ ಎಲೈವ್ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ. ಇಲ್ಲಿ ಮನಸ್ಸು ಮತ್ತು ಜಾಗೃತದ ಬಗ್ಗೆ ತಿಳಿಯಬಹುದು.",
        'hi-IN': "फील एलाइव पेज पर जा रहे हैं। यहां आप मन और चेतना के बारे में जान सकते हैं।",
        'en-US': "Going to Feel Alive page. Here you can explore Mind and Consciousness.",
        'es-ES': "Yendo a la página de Sentirse Vivo. Aquí puedes explorar Mente y Conciencia.",
        'fr-FR': "Accès à la page Se Sentir Vivant. Ici vous pouvez explorer l'Esprit et la Conscience.",
        'de-DE': "Gehe zur Feel-Alive-Seite. Hier können Sie Geist und Bewusstsein erforschen.",
        'ja-JP': "フィールアライブページに移動しています。ここでは心と意識を探求できます。",
        'zh-CN': "正在前往感受生命页面。在这里您可以探索心灵和意识。",
        'ru-RU': "Переход на страницу чувствовать жизнь. Здесь вы можете исследовать разум и сознание.",
        'pt-BR': "Indo para a página Sinta-se Vivo. Aqui você pode explorar Mente e Consciência.",
        'it-IT': "Vado alla pagina Sentiti Vivo. Qui puoi esplorare Mente e Coscienza.",
        'ko-KR': "필 얼라이브 페이지로 이동 중입니다. 여기에서 마음과 의식을 탐색할 수 있습니다.",
        'ar-SA': "الذهاب إلى صفحة الشعور بالحياة. هنا يمكنك استكشاف العقل والوعي.",
        'bn-IN': "ফীল আলাইভ পৃষ্ঠায় যাচ্ছি। এখানে আপনি মন এবং সচেতনতা সম্পর্কে জানতে পারবেন।",
        'te-IN': "ఫీల్ ఎలైవ్ పేజీకి వెళ్తున్నాము. ఇక్కడ మనస్సు మరియు చైతన్యాన్ని అన్వేషించవచ్చు.",
        'ta-IN': "பீல் அலைவ் பக்கத்திற்கு செல்கிறோம். இங்கு மனம் மற்றும் உணர்வை ஆராயலாம்.",
        'ml-IN': "ഫീൽ അലൈവ് പേജിലേക്ക് പോകുന്നു. ഇവിടെ മനസ്സും ബോധവും പര്യവേക്ഷണം ചെയ്യാം.",
        'default': "Going to Feel Alive page. Here you can explore Mind and Consciousness."
      },
      'home': {
        'kn-IN': "ಮುಖ್ಯ ಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದ್ದೇವೆ.",
        'hi-IN': "मुख्य पृष्ठ पर जा रहे हैं.",
        'en-US': "Going to the home page.",
        'es-ES': "Yendo a la página principal.",
        'fr-FR': "Accès à la page d'accueil.",
        'de-DE': "Gehe zur Startseite.",
        'ja-JP': "ホームページに戻ります。",
        'zh-CN': "返回主页。",
        'ru-RU': "Возвращаемся на главную страницу.",
        'pt-BR': "Indo para a página inicial.",
        'it-IT': "Vado alla pagina principale.",
        'ko-KR': "홈페이지로 돌아갑니다.",
        'ar-SA': "العودة إلى الصفحة الرئيسية.",
        'bn-IN': "প্রধান পৃষ্ঠায় ফিরে যাচ্ছি।",
        'te-IN': "హోమ్ పేజీకి తిరిగి వెళ్తున్నాము.",
        'ta-IN': "முகப்பு பக்கத்திற்கு திரும்புகிறோம்.",
        'ml-IN': "ഹോം പേജിലേക്ക് മടങ്ങുന്നു.",
        'default': "Going to the home page."
      },
      'help': {
        'kn-IN': "ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು 'ಸಿಸ್ಟಮ್ಸ್', 'ಇಂಟೆಲಿಜೆನ್ಸ್', 'ವೆಂಚರ್ಸ್', 'ಅನಲಿಸಿಸ್', 'ಮೈಂಡ್‌ಸ್ಪೇಸ್' ಅಥವಾ 'ಫೀಲ್ ಎಲೈವ್' ಎಂದು ಹೇಳಿ.",
        'hi-IN': "मैं आपकी सहायता करने का प्रयास कर रहा हूं। कृपया 'सिस्टम्स', 'इंटेलिजेंस', 'वेंचर्स', 'एनालिसिस', 'माइंडस्पेस' या 'फील एलाइव' कहें।",
        'en-US': "I'm trying to help you. Please say 'Systems', 'Intelligence', 'Ventures', 'Analysis', 'Mindspace' or 'Feel Alive'.",
        'es-ES': "Estoy tratando de ayudarte. Por favor di 'Sistemas', 'Inteligencia', 'Empresas', 'Análisis', 'Espacio Mental' o 'Sentirse Vivo'.",
        'fr-FR': "J'essaie de vous aider. Veuillez dire 'Systèmes', 'Intelligence', 'Entreprises', 'Analyse', 'Espace Mental' ou 'Se Sentir Vivant'.",
        'de-DE': "Ich versuche, Ihnen zu helfen. Bitte sagen Sie 'Systeme', 'Intelligenz', 'Unternehmen', 'Analyse', 'Geistesraum' oder 'Leben spüren'.",
        'ja-JP': "あなたを助けようとしています。「システム」、「インテリジェンス」、「ベンチャーズ」、「アナリシス」、「マインドスペース」または「フィールアライブ」と言ってください。",
        'zh-CN': "我正在尝试帮助您。请说“系统”、“智能”、“风投”、“分析”、“心灵空间”或“感受生命”。",
        'ru-RU': "Я пытаюсь помочь вам. Пожалуйста, скажите 'Системы', 'Интеллект', 'Венчурные проекты', 'Анализ', 'Пространство разума' или 'Почувствуй жизнь'.",
        'pt-BR': "Estou tentando ajudá-lo. Por favor diga 'Sistemas', 'Inteligência', 'Empreendimentos', 'Análise', 'Espaço Mental' ou 'Sinta-se Vivo'.",
        'it-IT': "Sto cercando di aiutarti. Per favore di 'Sistemi', 'Intelligenza', 'Imprese', 'Analisi', 'Spazio Mentale' o 'Sentiti Vivo'.",
        'ko-KR': "도움을 드리려고 합니다. '시스템', '인텔리전스', '벤처', '분석', '마인드스페이스' 또는 '필 얼라이브'라고 말해주세요.",
        'ar-SA': "أحاول مساعدتك. يرجى قول 'الأنظمة'، 'الذكاء'، 'الاستثمارات'، 'التحليل'، 'مساحة العقل' أو 'الشعور بالحياة'.",
        'bn-IN': "আমি আপনাকে সাহায্য করার চেষ্টা করছি। অনুগ্রহ করে 'সিস্টেম', 'বুদ্ধিমত্তা', 'ভেঞ্চার', 'বিশ্লেষণ', 'মাইন্ডস্পেস' বা 'ফীল আলাইভ' বলুন।",
        'te-IN': "నేను మీకు సహాయం చేయడానికి ప్రయత్నిస్తున్నాను. దయచేసి 'సిస్టమ్స్', 'ఇంటెలిజెన్స్', 'వెంచర్స్', 'ఏనలిసిస్', 'మైండ్‌స్పేస్' లేదా 'ఫీల్ ఎలైవ్' అనండి.",
        'ta-IN': "நான் உங்களுக்கு உதவ முயற்சிக்கிறேன். தயவு செய்து 'சிஸ்டம்ஸ்', 'இண்டெலிஜென்ஸ்', 'வெஞ்சர்ஸ்', 'ஏனலிஸிஸ்', 'மைண்ட்ஸ்பேஸ்' அல்லது 'பீல் அலைவ்' என்று சொல்லுங்கள்.",
        'ml-IN': "ഞാൻ നിങ്ങൾക്ക് സഹായിക്കാൻ ശ്രമിക്കുന്നു. 'സിസ്റ്റംസ്', 'ഇന്റലിജൻസ്', 'വെഞ്ചറുകൾ', 'അനലിസിസ്', 'മൈൻഡ്സ്പെയ്സ്' അല്ലെങ്കിൽ 'ഫീൽ അലൈവ്' എന്ന് പറയുക.",
        'default': "I'm trying to help you. Please say 'Systems', 'Intelligence', 'Ventures', 'Analysis', 'Mindspace' or 'Feel Alive'."
      }
    };
    
    let responseText = responses[responseType]?.[userLanguage] || responses[responseType]?.['default'] || responses['help']['default'];
    
    const utterance = new SpeechSynthesisUtterance(responseText);
    const voices = synth.getVoices();
    const userVoice = voices.find(v => v.lang.includes(userLanguage) || v.lang.includes(userLanguage.split('-')[0]));
    
    if (userVoice) {
      utterance.voice = userVoice;
    } else {
      const englishVoice = voices.find(v => v.lang.includes('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }
    
    utterance.lang = userLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    
    synth.speak(utterance);
  };

  const navItems: { id: ViewState; name: string; desc: string }[] = [
    { id: 'systems', name: 'Systems', desc: 'The Method' },
    { id: 'intelligence', name: 'Intelligence', desc: 'AHI Protocol' },
    { id: 'ventures', name: 'Unchi hai Building', desc: '30Cr Portfolio' },
    { id: 'analysis', name: 'Analysis', desc: 'Forensics' },
    { id: 'mindspace', name: 'Mindspace', desc: 'Poetry' },
    { id: 'feel-alive', name: 'Feel Alive', desc: 'Mind & Consciousness' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 py-4 md:py-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5"
      >
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setView('home')}
        >
          {/* Logo Mark */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-sky-500/10 rounded-xl rotate-0 group-hover:rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            <div className="absolute inset-0 border border-sky-500/20 rounded-xl backdrop-blur-md group-hover:border-sky-400/50 transition-colors duration-500" />

            {/* Custom Icon-Letter Fusion */}
            <svg className="relative w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Abstract 'A' formed by circuit paths */}
              <path d="M12 3V5" strokeLinecap="round" className="text-sky-400" />
              <path d="M12 3L4.5 20H8.5L12 12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3L19.5 20H15.5L12 12" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2" className="fill-sky-400 stroke-none animate-pulse" />
              <path d="M12 8L12 12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text Branding */}
          <div className="flex flex-col justify-center">
            <span className="text-white font-display font-medium text-lg leading-none tracking-tight group-hover:text-sky-300 transition-colors">
              aman<span className="font-bold text-sky-400">.</span>kumar
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-sky-500/50 group-hover:w-8 transition-all duration-500" />
              <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold group-hover:text-sky-200 transition-colors">
                Singh
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="group relative flex flex-col items-center"
            >
              <span className={`text-[8px] uppercase tracking-[0.4em] transition-colors ${currentView === item.id ? 'text-sky-300' : 'text-slate-500 group-hover:text-sky-200'
                }`}>
                {item.desc}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-all ${currentView === item.id ? 'text-white scale-110' : 'text-slate-400'
                }`}>
                {item.name}
              </span>
              {currentView === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -bottom-2 w-full h-[1px] bg-sky-400 shadow-[0_0_10px_#38bdf8]"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (currentView !== 'home') {
              setView('home');
              // Small delay to ensure the component is rendered before scrolling
              setTimeout(() => {
                document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="hidden md:block border border-sky-400/20 hover:border-sky-400/80 hover:bg-sky-400/5 transition-all text-sky-300 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em]"
        >
          Collaborate
        </button>

        {/* Voice Hub Button */}
        <button
          className="lg:hidden text-white p-2 z-50 mr-2"
          onClick={() => {
            // Check if we're already listening
            if (isListening) {
              // Stop listening if currently active
              (window as any).stopVoiceRecognition();
              
              // Speak cancellation message
              const synth = window.speechSynthesis;
              synth.cancel();
              
              const userLanguage = navigator.language || 'en-US';
              
              const cancelMessage: Record<string, string> = {
                'kn-IN': "ನಾನು ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿದ್ದೇನೆ.",
                'hi-IN': "मैं सुनना बंद कर दिया हूं.",
                'en-US': "I have stopped listening.",
                'es-ES': "He dejado de escuchar.",
                'fr-FR': "J'ai arrêté d'écouter.",
                'de-DE': "Ich habe aufgehört zuzuhören.",
                'ja-JP': "聞くのをやめました。",
                'zh-CN': "我已经停止收听。",
                'ru-RU': "Я прекратил слушать.",
                'pt-BR': "Eu parei de escutar.",
                'it-IT': "Ho smesso di ascoltare.",
                'ko-KR': "듣기를 멈췄습니다.",
                'ar-SA': "لقد توقفت عن الاستماع.",
                'bn-IN': "আমি শোনা বন্ধ করেছি।",
                'te-IN': "నేను వినడం ఆపేశాను.",
                'ta-IN': "நான் கேட்பதை நிறுத்திவிட்டேன்.",
                'ml-IN': "ഞാൻ കേൾക്കുന്നത് നിർത്തി.",
                'default': "I have stopped listening."
              };
              
              const message = cancelMessage[userLanguage] || cancelMessage['default'];
              const utterance = new SpeechSynthesisUtterance(message);
              
              const voices = synth.getVoices();
              const userVoice = voices.find(v => v.lang.includes(userLanguage) || v.lang.includes(userLanguage.split('-')[0]));
              
              if (userVoice) {
                utterance.voice = userVoice;
              } else {
                const englishVoice = voices.find(v => v.lang.includes('en'));
                if (englishVoice) {
                  utterance.voice = englishVoice;
                }
              }
              
              utterance.lang = userLanguage;
              utterance.rate = 0.9;
              utterance.pitch = 1.1;
              
              synth.speak(utterance);
              return;
            }
            
            // Detect user's language and speak in their language
            const synth = window.speechSynthesis;
            
            // Cancel any ongoing speech
            synth.cancel();
            
            // Detect user's language from browser
            const userLanguage = navigator.language || 'en-US';
            
            // Store the current view to use in speech
            const currentViewName = currentView.replace('-', ' ');
            
            // Define greetings in multiple languages
            const greetings: Record<string, string> = {
              'kn-IN': "ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನಾವು ಯಾವ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡೋಣ?",
              'hi-IN': "नमस्कार! मैं आपकी मदद कर सकता हूँ। हिंदी में बात करें?",
              'en-US': "Hello! I can help you. Would you like to speak in English?",
              'en-GB': "Hello! I can help you. Would you like to speak in English?",
              'es-ES': "¡Hola! Puedo ayudarte. ¿Te gustaría hablar en español?",
              'fr-FR': "Bonjour! Je peux vous aider. Souhaitez-vous parler en français?",
              'de-DE': "Hallo! Ich kann Ihnen helfen. Möchten Sie auf Deutsch sprechen?",
              'ja-JP': "こんにちは！お手伝いできます。日本語で話しますか？",
              'zh-CN': "你好！我可以帮助您。您想用中文交流吗？",
              'ru-RU': "Привет! Я могу помочь вам. Хотите говорить по-русски?",
              'pt-BR': "Olá! Posso ajudá-lo. Gostaria de falar em português?",
              'it-IT': "Ciao! Posso aiutarti. Vorresti parlare in italiano?",
              'ko-KR': "안녕하세요! 도와드릴 수 있습니다. 한국어로 이야기하시겠습니까?",
              'ar-SA': "مرحبا! يمكنني مساعدتك. هل ترغب في التحدث باللغة العربية؟",
              'bn-IN': "হ্যালো! আমি আপনাকে সাহায্য করতে পারি। আপনি কি বাংলায় কথা বলতে চান?",
              'te-IN': "హలో! నేను మీకు సహాయం చేయగలను. మీరు తెలుగులో మాట్లాడాలనుకుంటున్నారా?",
              'ta-IN': "ஹலோ! நான் உங்களுக்கு உதவ முடியும். தமிழில் பேச விரும்புகிறீர்களா?",
              'ml-IN': "ഹലോ! ഞാൻ നിങ്ങൾക്ക് സഹായിക്കാൻ കഴിയും. മലയാളത്തിൽ സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?",
              'default': "Hello! I can help you. Would you like to speak in English?"
            };
            
            // Get greeting based on user's language
            let greeting = greetings[userLanguage];
            if (!greeting) {
              // Check if we have a greeting for the primary language (without region)
              const primaryLang = userLanguage.split('-')[0];
              greeting = Object.values(greetings).find((_, idx, arr) => 
                Object.keys(greetings)[idx].startsWith(primaryLang)
              ) || greetings.default;
            }
            
            // Create utterance
            const utterance = new SpeechSynthesisUtterance(greeting);
            
            // Try to find a voice in the user's language
            const voices = synth.getVoices();
            const userVoice = voices.find(v => v.lang.includes(userLanguage) || 
                                         v.lang.includes(userLanguage.split('-')[0]));
            
            if (userVoice) {
              utterance.voice = userVoice;
            } else {
              // If no voice found in user's language, try English as fallback
              const englishVoice = voices.find(v => v.lang.includes('en'));
              if (englishVoice) {
                utterance.voice = englishVoice;
              }
            }
            
            utterance.lang = userLanguage;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            
            // After the greeting, provide menu options and start listening
            utterance.onend = () => {
              // Wait a bit and then announce menu options
              setTimeout(() => {
                // Define menu options in multiple languages
                const menuOptionsMap: Record<string, string> = {
                  'kn-IN': `ನೀವು ಈಗ ${currentViewName} ಪುಟದಲ್ಲಿದ್ದೀರಿ. ನಾವು ಕೆಳಗಿನವುಗಳಿಗೆ ಹೋಗಬಹುದು: 1. ಸಿಸ್ಟಮ್ಸ್ - ನಮ್ಮ ಕೆಲಸದ ವಿಧಾನ, 2. ಇಂಟೆಲಿಜೆನ್ಸ್ - AHI ಪ್ರೊಟೊಕಾಲ್, 3. ವೆಂಚರ್ಸ್ - 30 ಕೋಟಿ ರೂಪಾಯಿ ಪೋರ್ಟ್ಫೋಲಿಯೊ, 4. ಅನಲಿಸಿಸ್ - ಫಾರೆನ್ಸಿಕ್ಸ್, 5. ಮೈಂಡ್‌ಸ್ಪೇಸ್ - ಕವಿತೆ, 6. ಫೀಲ್ ಎಲೈವ್ - ಮನಸ್ಸು ಮತ್ತು ಜಾಗೃತ. ನೀವು ಯಾವುದಾದರೂ ಒಂದು ಆಯ್ಕೆಮಾಡಿ.`,
                  'hi-IN': `आप अभी ${currentViewName} पेज पर हैं। हम निम्नलिखित में जा सकते हैं: 1. सिस्टम्स - हमारी काम करने की विधि, 2. इंटेलिजेंस - AHI प्रोटोकॉल, 3. वेंचर्स - 30 करोड़ रुपये का पोर्टफोलियो, 4. एनालिसिस - फॉरेंसिक्स, 5. माइंडस्पेस - कविता, 6. फील एलाइव - मन और चेतना। कृपया कोई एक विकल्प चुनें।`,
                  'en-US': `You are currently on the ${currentViewName} page. We can go to: 1. Systems - Our working methodology, 2. Intelligence - AHI Protocol, 3. Ventures - 30 Crore portfolio, 4. Analysis - Forensics, 5. Mindspace - Poetry, 6. Feel Alive - Mind and Consciousness. Please choose an option.`,
                  'en-GB': `You are currently on the ${currentViewName} page. We can go to: 1. Systems - Our working methodology, 2. Intelligence - AHI Protocol, 3. Ventures - 30 Crore portfolio, 4. Analysis - Forensics, 5. Mindspace - Poetry, 6. Feel Alive - Mind and Consciousness. Please choose an option.`,
                  'es-ES': `Estás actualmente en la página ${currentViewName}. Podemos ir a: 1. Sistemas - Nuestra metodología de trabajo, 2. Inteligencia - Protocolo AHI, 3. Empresas - Portafolio de 30 crores, 4. Análisis - Forense, 5. Espacio Mental - Poesía, 6. Sentirse Vivo - Mente y Conciencia. Por favor elige una opción.`,
                  'fr-FR': `Vous êtes actuellement sur la page ${currentViewName}. Nous pouvons aller à: 1. Systèmes - Notre méthodologie de travail, 2. Intelligence - Protocole AHI, 3. Entreprises - Portefeuille de 30 crores, 4. Analyse - Sciences médico-légales, 5. Espace Mental - Poésie, 6. Se Sentir Vivant - Esprit et Conscience. Veuillez choisir une option.`,
                  'de-DE': `Sie befinden sich derzeit auf der Seite ${currentViewName}. Wir können gehen zu: 1. Systeme - Unsere Arbeitsmethodik, 2. Intelligenz - AHI-Protokoll, 3. Unternehmen - 30-Crore-Portfolio, 4. Analyse - Forensik, 5. Geistesraum - Poesie, 6. Leben spüren - Geist und Bewusstsein. Bitte wählen Sie eine Option.`,
                  'ja-JP': `現在、${currentViewName}ページにいます。次に移動できます：1. システム - 私たちの作業方法論、2. インテリジェンス - AHIプロトコル、3. ベンチャーズ - 30億ルピーのポートフォリオ、4. アナリシス - 法科学、5. マインドスペース - 詩、6. フィールアライブ - 心と意識。オプションを選択してください。`,
                  'zh-CN': `您当前在${currentViewName}页面。我们可以前往：1. 系统 - 我们的工作方法论，2. 智能 - AHI协议，3. 风投 - 30亿卢比投资组合，4. 分析 - 法医学，5. 心灵空间 - 诗歌，6. 感受生命 - 心灵与意识。请选择一个选项。`,
                  'ru-RU': `Вы находитесь на странице ${currentViewName}. Мы можем перейти к: 1. Системы - наша методология работы, 2. Интеллект - протокол AHI, 3. Венчурные проекты - портфель в 30 кроров, 4. Анализ - судебная экспертиза, 5. Пространство разума - поэзия, 6. Почувствуй жизнь - разум и сознание. Пожалуйста, выберите опцию.`,
                  'pt-BR': `Você está atualmente na página ${currentViewName}. Podemos ir para: 1. Sistemas - Nossa metodologia de trabalho, 2. Inteligência - Protocolo AHI, 3. Empreendimentos - Portfólio de 30 crores, 4. Análise - Perícia forense, 5. Espaço Mental - Poesia, 6. Sinta-se Vivo - Mente e Consciência. Por favor, escolha uma opção.`,
                  'it-IT': `Sei attualmente sulla pagina ${currentViewName}. Possiamo andare a: 1. Sistemi - La nostra metodologia di lavoro, 2. Intelligenza - Protocollo AHI, 3. Imprese - Portfolio da 30 crore, 4. Analisi - Scienze forensi, 5. Spazio Mentale - Poesia, 6. Sentiti Vivo - Mente e Coscienza. Si prega di scegliere un'opzione.`,
                  'ko-KR': `현재 ${currentViewName} 페이지에 있습니다. 다음으로 이동할 수 있습니다: 1. 시스템 - 우리의 작업 방법론, 2. 인텔리전스 - AHI 프로토콜, 3. 벤처 - 30억 루피 투자 포트폴리오, 4. 분석 - 과학수사, 5. 마인드스페이스 - 시, 6. 느낌 살아있음 - 마음과 의식. 옵션을 선택해주세요.`,
                  'ar-SA': `أنت الآن في صفحة ${currentViewName}. يمكننا الذهاب إلى: 1. الأنظمة - منهجية العمل لدينا، 2. الذكاء - بروتوكول AHI، 3. الاستثمارات - محفظة بقيمة 30 كرور، 4. التحليل - العلوم الجنائية، 5. مساحة العقل - الشعر، 6. الشعور بالحياة - العقل والوعي. يرجى اختيار خيار.`,
                  'bn-IN': `আপনি বর্তমানে ${currentViewName} পৃষ্ঠায় রয়েছেন। আমরা যেতে পারি: 1. সিস্টেম - আমাদের কাজের পদ্ধতি, 2. বুদ্ধিমত্তা - AHI প্রোটোকল, 3. ভেঞ্চার - 30 কোটি বিনিয়োগ পোর্টফোলিও, 4. বিশ্লেষণ - ফরেনসিক্স, 5. মাইন্ডস্পেস - কবিতা, 6. ফীল আলাইভ - মন এবং সচেতনতা। দয়া করে একটি বিকল্প নির্বাচন করুন।`,
                  'te-IN': `మీరు ప్రస్తుతం ${currentViewName} పేజీలో ఉన్నారు. మనం వెళ్ళగలవి: 1. సిస్టమ్స్ - మా పని చేసే విధానం, 2. ఇంటెలిజెన్స్ - AHI ప్రొటోకాల్, 3. వెంచర్స్ - 30 కోట్ల పోర్ట్ఫోలియో, 4. ఏనలిసిస్ - ఫోరెన్సిక్స్, 5. మైండ్‌స్పేస్ - కవిత్వం, 6. ఫీల్ ఎలైవ్ - మనస్సు మరియు చైతన్యం. దయచేసి ఒక ఐచ్ఛికాన్ని ఎంచుకోండి.`,
                  'ta-IN': `நீங்கள் தற்போது ${currentViewName} பக்கத்தில் உள்ளீர்கள். நாம் செல்ல முடியும்: 1. சிஸ்டம்ஸ் - நமது வேலை செய்யும் முறை, 2. இண்டெலிஜென்ஸ் - AHI நெறிமுறை, 3. வெஞ்சர்ஸ் - 30 கோடி முதலீட்டு கணக்கு, 4. ஏனலிஸிஸ் - போரென்சிக்ஸ், 5. மைண்ட்ஸ்பேஸ் - கவிதை, 6. பீல் அலைவ் - மனம் மற்றும் உணர்வு. தயவு செய்து ஒரு விருப்பத்தைத் தேர்வு செய்க.`,
                  'ml-IN': `നിങ്ങൾ നിലവിൽ ${currentViewName} പേജിലാണ്. നമുക്ക് പോകാം: 1. സിസ്റ്റംസ് - ഞങ്ങളുടെ പ്രവർത്തന രീതി, 2. ഇന്റലിജൻസ് - AHI പ്രോട്ടോക്കോൾ, 3. വെഞ്ചറുകൾ - 30 കോടി രൂപയുടെ പോർട്ട്ഫോളിയോ, 4. അനലിസിസ് - ഫോറൻസിക്സ്, 5. മൈൻഡ്സ്പെയ്സ് - കവിത, 6. ഫീൽ അലൈവ് - മനസ്സും ബോധവും. ദയവായി ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക.`,
                  'default': `You are currently on the ${currentViewName} page. We can go to: 1. Systems - Our working methodology, 2. Intelligence - AHI Protocol, 3. Ventures - 30 Crore portfolio, 4. Analysis - Forensics, 5. Mindspace - Poetry, 6. Feel Alive - Mind and Consciousness. Please choose an option.`
                };
                
                let menuText = menuOptionsMap[userLanguage];
                if (!menuText) {
                  // Check if we have menu options for the primary language (without region)
                  const primaryLang = userLanguage.split('-')[0];
                  menuText = Object.values(menuOptionsMap).find((_, idx, arr) => 
                    Object.keys(menuOptionsMap)[idx].startsWith(primaryLang)
                  ) || menuOptionsMap.default;
                }
                
                const menuUtterance = new SpeechSynthesisUtterance(menuText);
                
                // Try to find a voice in the user's language again
                const voices = synth.getVoices();
                const userVoice = voices.find(v => v.lang.includes(userLanguage) || 
                                             v.lang.includes(userLanguage.split('-')[0]));
                
                if (userVoice) {
                  menuUtterance.voice = userVoice;
                } else {
                  // If no voice found in user's language, try English as fallback
                  const englishVoice = voices.find(v => v.lang.includes('en'));
                  if (englishVoice) {
                    menuUtterance.voice = englishVoice;
                  }
                }
                
                menuUtterance.lang = userLanguage;
                menuUtterance.rate = 0.9;
                menuUtterance.pitch = 1.1;
                
                menuUtterance.onend = () => {
                  // Start listening for user commands after menu is announced
                  setTimeout(() => {
                    (window as any).startVoiceRecognition();
                    
                    // Speak instruction message
                    const instructionMessages: Record<string, string> = {
                      'kn-IN': "ನಿಮ್ಮ ಆದೇಶವನ್ನು ನೀಡಲು ಈಗ ಮಾತನಾಡಿ. 'ಸಿಸ್ಟಮ್ಸ್', 'ಇಂಟೆಲಿಜೆನ್ಸ್', 'ವೆಂಚರ್ಸ್', 'ಅನಲಿಸಿಸ್', 'ಮೈಂಡ್‌ಸ್ಪೇಸ್' ಅಥವಾ 'ಫೀಲ್ ಎಲೈವ್' ಎಂದು ಹೇಳಿ.",
                      'hi-IN': "अब अपना आदेश देने के लिए बोलें। 'सिस्टम्स', 'इंटेलिजेंस', 'वेंचर्स', 'एनालिसिस', 'माइंडस्पेस' या 'फील एलाइव' कहें.",
                      'en-US': "Speak now to give your command. Say 'Systems', 'Intelligence', 'Ventures', 'Analysis', 'Mindspace' or 'Feel Alive'.",
                      'es-ES': "Hable ahora para dar su comando. Dig 'Sistemas', 'Inteligencia', 'Empresas', 'Análisis', 'Espacio Mental' o 'Sentirse Vivo'.",
                      'fr-FR': "Parlez maintenant pour donner votre commande. Dites 'Systèmes', 'Intelligence', 'Entreprises', 'Analyse', 'Espace Mental' ou 'Se Sentir Vivant'.",
                      'de-DE': "Sprechen Sie jetzt, um Ihren Befehl zu geben. Sagen Sie 'Systeme', 'Intelligenz', 'Unternehmen', 'Analyse', 'Geistesraum' oder 'Leben spüren'.",
                      'ja-JP': "今すぐ話してコマンドを入力してください。「システム」、「インテリジェンス」、「ベンチャーズ」、「アナリシス」、「マインドスペース」または「フィールアライブ」と言ってください。",
                      'zh-CN': "现在说话以输入您的指令。请说“系统”、“智能”、“风投”、“分析”、“心灵空间”或“感受生命”。",
                      'ru-RU': "Говорите сейчас, чтобы отдать команду. Скажите 'Системы', 'Интеллект', 'Венчурные проекты', 'Анализ', 'Пространство разума' или 'Почувствуй жизнь'.",
                      'pt-BR': "Fale agora para dar seu comando. Diga 'Sistemas', 'Inteligência', 'Empreendimentos', 'Análise', 'Espaço Mental' ou 'Sinta-se Vivo'.",
                      'it-IT': "Parla ora per dare il tuo comando. Di 'Sistemi', 'Intelligenza', 'Imprese', 'Analisi', 'Spazio Mentale' o 'Sentiti Vivo'.",
                      'ko-KR': "이제 말씀하여 명령을 입력하세요. '시스템', '인텔리전스', '벤처', '분석', '마인드스페이스' 또는 '필 얼라이브'라고 말해주세요.",
                      'ar-SA': "تحدث الآن لإعطاء أمرك. قل 'الأنظمة', 'الذكاء', 'الاستثمارات', 'التحليل', 'مساحة العقل' أو 'الشعور بالحياة'.",
                      'bn-IN': "এখন আপনার নির্দেশ দিতে কথা বলুন। 'সিস্টেম', 'বুদ্ধিমত্তা', 'ভেঞ্চার', 'বিশ্লেষণ', 'মাইন্ডস্পেস' বা 'ফীল আলাইভ' বলুন।",
                      'te-IN': "ఇప్పుడు మీ ఆదేశాన్ని ఇవ్వడానికి మాట్లాడండి. 'సిస్టమ్స్', 'ఇంటెలిజెన్స్', 'వెంచర్స్', 'ఏనలిసిస్', 'మైండ్‌స్పేస్' లేదా 'ఫీల్ ఎలైవ్' అనండి.",
                      'ta-IN': "இப்போது உங்கள் கட்டளையை வழங்க 'சிஸ்டம்ஸ்', 'இண்டெலிஜென்ஸ்', 'வெஞ்சர்ஸ்', 'ஏனலிஸிஸ்', 'மைண்ட்ஸ்பேஸ்' அல்லது 'பீல் அலைவ்' என்று சொல்லுங்கள்.",
                      'ml-IN': "ഇപ്പോൾ നിങ്ങളുടെ നിർദ്ദേശം നൽകാൻ സംസാരിക്കുക. 'സിസ്റ്റംസ്', 'ഇന്റലിജൻസ്', 'വെഞ്ചറുകൾ', 'അനലിസിസ്', 'മൈൻഡ്സ്പെയ്സ്' അല്ലെങ്കിൽ 'ഫീൽ അലൈവ്' എന്ന് പറയുക.",
                      'default': "Speak now to give your command. Say 'Systems', 'Intelligence', 'Ventures', 'Analysis', 'Mindspace' or 'Feel Alive'."
                    };
                    
                    const instruction = instructionMessages[userLanguage] || instructionMessages['default'];
                    const instructionUtterance = new SpeechSynthesisUtterance(instruction);
                    
                    const voices = synth.getVoices();
                    const userVoice = voices.find(v => v.lang.includes(userLanguage) || v.lang.includes(userLanguage.split('-')[0]));
                    
                    if (userVoice) {
                      instructionUtterance.voice = userVoice;
                    } else {
                      const englishVoice = voices.find(v => v.lang.includes('en'));
                      if (englishVoice) {
                        instructionUtterance.voice = englishVoice;
                      }
                    }
                    
                    instructionUtterance.lang = userLanguage;
                    instructionUtterance.rate = 0.9;
                    instructionUtterance.pitch = 1.1;
                    
                    synth.speak(instructionUtterance);
                  }, 500);
                };
                
                synth.speak(menuUtterance);
              }, 1000);
            };
            
            synth.speak(utterance);
          }}
          aria-label="Voice hub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }} className="block w-6 h-0.5 bg-white" />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl pt-24 px-6 lg:hidden overflow-y-auto"
          onClick={(e) => {
            // Close menu when clicking on the overlay background
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <div className="flex flex-col space-y-8 pb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left group py-2"
              >
                <span className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-1">{item.desc}</span>
                <span className={`text-2xl sm:text-3xl font-display font-bold ${currentView === item.id ? 'text-sky-400' : 'text-white'}`}>
                  {item.name}
                </span>
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (currentView !== 'home') {
                  setView('home');
                  setTimeout(() => {
                    document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-8 border border-sky-400/20 text-sky-300 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.3em] w-full"
            >
              Collaborate
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
