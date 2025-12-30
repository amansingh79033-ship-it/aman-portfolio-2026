
import React from 'react';
import { motion } from 'framer-motion';

const Mindspace: React.FC = () => {
  return (
    <section id="mindspace" className="py-40 px-6 relative overflow-hidden">
      {/* Background Floating Text */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <div className="text-[20vw] font-display font-bold whitespace-nowrap -rotate-12">SAHIR SIKANDAR AMAN</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-sky-400 font-display uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">Personal Scribbles</span>
          <h2 className="text-5xl font-display font-bold text-white italic">"Sikandar"</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8 text-right font-light"
          >
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed space-y-2">
              <p>एक दुनिया था ख़ुद में, और था ये भी की</p>
              <p>मुट्ठी भर राख के मुक़ाबिल ना था ।</p>
            </div>
            <div className="text-xl md:text-2xl text-slate-300 leading-relaxed space-y-2">
              <p>पूछते हैं उनसे अकेलेपन की इंतहाँ ?</p>
              <p>वो ख़ुद अपने जनाज़े में शामिल ना था ।</p>
            </div>
            <div className="text-xl md:text-2xl text-sky-300 leading-relaxed space-y-2">
              <p>वो टूट के भी मुस्कुरा रहा है अमन से ,</p>
              <p>कुछ भी था, वो रोने के क़ाबिल ना था।</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 border-l border-white/10 pl-12"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-yellow-100 font-bold mb-8">मेरे साहिर.</div>
            <div className="text-lg text-slate-400 leading-relaxed space-y-6">
              <p>तेरे हिस्से का साहिर सबब जो बचा हुआ है <br />हम इसे एक ज़माने तक ज़िंदा रखेंगे।</p>
              <p>मेरे जनाज़े में जो परेशान लग रहे थे <br />कह रहे हैं, पिंजरे में कोई नया परिंदा रखेंगे।</p>
              <p>मर गए पर चिल्ला रही है ख़ामोशी,।२। <br />इतना न पूछ सका, हमें कब विदा करेंगे।</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-40 text-center">
          <div className="glass p-12 rounded-[3rem] border-sky-400/20 inline-block max-w-2xl">
            <h4 className="text-2xl font-display text-white mb-6 uppercase tracking-widest italic">“ क्या हूँ मैं? “</h4>
            <div className="text-slate-400 space-y-4">
              <p>जब लगेगा कुछ फिसल सा रहा है हाथों से… कस के पकड़ूँगा नहीं, छोड़ दूँगा ।</p>
              <p>जब भी धूल दिखेगी रिश्तों पर मेरे .. उसे फूकूँगा एक बार, फिर तोड़ दूँगा ।</p>
              <p>मुझे मारने की ज़ुर्रत तो फ़ज़ूल है, एक गोली हो जो जाँ लेले, मैं दो लूँगा ।</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mindspace;
